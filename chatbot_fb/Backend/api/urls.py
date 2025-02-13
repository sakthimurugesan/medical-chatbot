from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'contactus', ContactViewSet)
router.register(r'review', ReviewViewSet)
router.register(r'admins', AdminsViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'available', AvailabilityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('appointments-by-date/', appointments_by_date, name='appointments-by-date'),

]
