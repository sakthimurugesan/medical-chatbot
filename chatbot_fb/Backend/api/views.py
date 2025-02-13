from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .filters import *
from .models import *
from .serializers import *




class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = DoctorFilter


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PatientFilter


class AdminsViewSet(viewsets.ModelViewSet):
    queryset = Admins.objects.all()
    serializer_class = AdminSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AdminFilter

class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AvailabilityFilter

    @action(detail=False, methods=['get'], url_path='available-doctors')
    def available_doctors(self, request):
        # Get the date and department parameters from the request
        date_str = request.query_params.get('date')
        dept = request.query_params.get('dept')

        # Convert the date string to a date object if provided
        if date_str:
            try:
                date = datetime.strptime(date_str, '%Y-%m-%d').date()  # Adjust format as needed
            except ValueError:
                return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
        else:
            date = None

        # Filter Availability where available=True and count > 0
        available_records = self.queryset.filter(available=True, count__gt=0)

        # If a date is provided, filter by that date
        if date:
            available_records = available_records.filter(date=date)  # Filter by the date field

        # Get the unique doctors from the filtered availability records
        doctor_ids = available_records.values_list('doctorId', flat=True).distinct()
        doctors = Doctor.objects.filter(id__in=doctor_ids)

        # If a department is provided, filter the doctors by that department
        if dept:
            doctors = doctors.filter(dept=dept)  # Adjust the field name as per your model

        # Serialize the doctor details
        doctor_serializer = DoctorSerializer(doctors, many=True)

        # Return the serialized data as a JSON response
        return Response(doctor_serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReviewFilter

    def perform_create(self, serializer):
        user = self.request.user
        userId = serializer.validated_data.get('userId')
        doctorId = serializer.validated_data.get('doctorId')
        rating= serializer.validated_data.get('rating')
        review= serializer.validated_data.get('review')
        # Check if the user has registered for the event
        print(Appointment.objects.filter(patientId=userId, doctorId=doctorId).exists())
        if Appointment.objects.filter(patientId=userId, doctorId=doctorId).exists():
            Review.objects.create(doctorId=doctorId,userId=userId,rating=rating,review=review)
        else:
            # Raise a ValidationError to inform the client that the review cannot be created
            raise serializers.ValidationError({'detail': 'Patient do not have any appointment.'})

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filterset_class = AppointmentFilter  # Apply the filter class

    @action(detail=False, methods=['get'], url_path='appointments')
    def appointments(self, request, *args, **kwargs):
        appointments = self.filter_queryset(self.get_queryset())
        appointment_list = [
            {
                'patient_email': appointment.patientId.email,
                'patient_name': appointment.patientId.name,
                'transaction_id': appointment.transactionId,
                'status': appointment.status,
                'date': appointment.date,
                'appointment_id': appointment.id,
                'doctor_name': appointment.doctorId.name,
                'doctor_email': appointment.doctorId.email,
                'doctor_dept': appointment.doctorId.dept,
            }
            for appointment in appointments
        ]
        return Response(appointment_list)

    @action(detail=False, methods=['get'], url_path='my-appointments')
    def myappointments(self, request):
        queryset = self.queryset.select_related('doctorId', 'patientId')

        # Filter by patientId if provided in query parameters
        patient_id = request.query_params.get('patientId')
        doctor_id = request.query_params.get('doctorId')
        print(doctor_id)
        print(patient_id)
        if patient_id!=None:
            queryset = queryset.filter(patientId=patient_id)
        else:
            queryset = queryset.filter(doctorId=doctor_id)
        appointment_list = [
            {
                'appointment_id': appointment.id,
                'patient_name': appointment.patientId.name,
                'patient_email': appointment.patientId.email,
                'transaction_id': appointment.transactionId,
                'status': appointment.status,
                'date': appointment.date,
                'doctor_name': appointment.doctorId.name,
                'doctor_email': appointment.doctorId.email,
                'dept': appointment.doctorId.dept,
            }
            for appointment in queryset
        ]

        return Response(appointment_list)

    @action(detail=False, methods=['post'], url_path='create-appointment')
    def create_appointment(self, request):
        print("Received Data:", request.data)

        user_id = request.data.get('patientId')
        doctor_id = request.data.get('doctorId')
        selected_date = request.data.get('date')
        status1 = request.data.get('status')
        transactionId = request.data.get('transactionId')

        if not user_id or not doctor_id or not selected_date:
            return Response({'error': 'Missing patientId, doctorId, or date'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doctor = get_object_or_404(Doctor, id=doctor_id)
            patient = get_object_or_404(Patient, id=user_id)

            try:
                selected_date = datetime.strptime(selected_date, "%Y-%m-%d").date()
            except ValueError as ve:
                print("Date parsing error:", ve)
                return Response({'error': 'Invalid date format. Please use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

            existing_appointment = Appointment.objects.filter(
                patientId=patient,
                doctorId=doctor,
                date=selected_date
            ).exists()

            if existing_appointment:
                return Response(
                    {'error': 'You already have an appointment with this doctor on the selected date.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            availability = get_object_or_404(Availability, doctorId=doctor, date=selected_date)
            if availability.count > 0:
                appointment = Appointment.objects.create(
                    patientId=patient,
                    doctorId=doctor,
                    date=selected_date,
                    transactionId=transactionId,
                    status=status1
                )

                availability.count -= 1
                availability.save()

                # Send confirmation email
                subject = 'Appointment Confirmation'
                message = f"Dear {patient.name},\n\nYour appointment with Dr. {doctor.name} " \
                          f"on {selected_date} has been confirmed.\n\n" \
                          f"Appointment Details:\n" \
                          f"Doctor: {doctor.name}\n" \
                          f"Department: {doctor.dept}\n" \
                          f"Date: {selected_date}\n" \
                          f"Transaction ID: {transactionId}\n\n" \
                          "Thank you for choosing our service!"
                recipient_list = [patient.email]

                send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list, fail_silently=False)

                return Response({'message': 'Appointment created successfully!'}, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {'error': 'No availability for this doctor on the selected date.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            print("Error during appointment creation:", str(e))
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContactFilter


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Patient.objects.get(email=email)
            serializer = PatientSerializer()
            token = serializer.generate_jwt_token(user)  # Generate the token
            serializer.send_password_reset_email(user)
            return Response({
                "status": "Password reset email sent",
                "token": token  # Include the token in the response
            }, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        print(new_password)
        print(token)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
            user = Patient.objects.get(id=user_id)
            print(user_id)
            user.password = new_password
            user.save()
            return Response({"status": "Password has been reset successfully"}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Patient.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
@action(detail=False, methods=['get'], url_path='available-doctors')
def available_doctors( request):
    # Get the date parameter from the request
    date_str = request.query_params.get('date')

    # Convert the date string to a date object if provided
    if date_str:
        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()  # Adjust format as needed
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
    else:
        date = None

    # Filter Availability where available=True and count > 0
    available_records = AvailabilityViewSet.queryset.filter(available=True, count__gt=0)

    # If a date is provided, filter by that date
    if date:
        available_records = available_records.filter(date=date)

    # Get the unique doctors from the filtered availability records
    doctor_ids = available_records.values_list('doctorId', flat=True).distinct()
    doctors = Doctor.objects.filter(id__in=doctor_ids)

    # Serialize the doctor details
    doctor_serializer = DoctorSerializer(doctors, many=True)
    print('-'*100)
    # Return the serialized data as a JSON response
    return Response(doctor_serializer.data)

@api_view(['GET'])
def appointments_by_date(request):
    doctor_id = request.query_params.get('doctorId')
    date = request.query_params.get('date')

    if not doctor_id or not date:
        return Response({"error": "doctorId and date are required"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch appointments for the specified doctor and date
    appointments = Appointment.objects.filter(doctorId=doctor_id, date=date).select_related('patientId')

    # Prepare the response data
    response_data = []
    for appointment in appointments:
        response_data.append({
            'patient_name': appointment.patientId.name,
            'patient_email': appointment.patientId.email,
            'patient_gender': appointment.patientId.gender,
            'id':appointment.id
        })

    return Response(response_data, status=status.HTTP_200_OK)