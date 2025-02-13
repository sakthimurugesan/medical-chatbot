from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
urlpatterns = [
    path('donotlogin/', admin.site.urls),
    path('',include("api.urls")),
    path('summernote/', include('django_summernote.urls')),
]
