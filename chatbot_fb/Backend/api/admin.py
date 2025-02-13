from django.contrib import admin
from django.utils.safestring import mark_safe
from django_summernote.admin import SummernoteModelAdmin
from .views import *
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Availability)
admin.site.register(Contact)
admin.site.register(Review)
admin.site.register(Admins)