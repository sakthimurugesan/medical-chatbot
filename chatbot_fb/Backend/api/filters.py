from django_filters import rest_framework as filters
from .models import *


class PatientFilter(filters.FilterSet):
    email = filters.CharFilter(field_name="email", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')

    class Meta:
        model = Patient
        fields = ['email', 'id']

class AdminFilter(filters.FilterSet):
    email = filters.CharFilter(field_name="email", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')

    class Meta:
        model = Admins
        fields = ['email', 'id']

class ReviewFilter(filters.FilterSet):
    doctorId = filters.NumberFilter(field_name="doctorId", lookup_expr='exact')

    class Meta:
        model = Review
        fields = ['doctorId']
class ContactFilter(filters.FilterSet):
    email = filters.CharFilter(field_name="email", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')
    name = filters.CharFilter(field_name="name", lookup_expr='icontains')
    class Meta:
        model = Contact
        fields = ['email', 'id','name']


class AppointmentFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id", lookup_expr='exact')
    patientId = filters.NumberFilter(field_name="patientId", lookup_expr='exact')
    doctorId = filters.NumberFilter(field_name="doctorId", lookup_expr='exact')
    date = filters.DateFilter(field_name="date", lookup_expr='exact')

    class Meta:
        model = Appointment
        fields = ['id', 'patientId', 'doctorId', 'date']


class DoctorFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id", lookup_expr='icontains')
    trend1 = filters.NumberFilter(field_name="trend1", lookup_expr='icontains')
    dept = filters.CharFilter(field_name="dept", lookup_expr='icontains')
    class Meta:
        model = Doctor
        fields = ['id','dept','email','trend1']
class AvailabilityFilter(filters.FilterSet):
    doctorId = filters.NumberFilter(field_name="doctorId__id", lookup_expr='exact')
    date = filters.DateFilter(field_name="date", lookup_expr='exact')
    available = filters.BooleanFilter(field_name="available", lookup_expr='exact')

    class Meta:
        model = Availability
        fields = ['doctorId', 'date', 'available']