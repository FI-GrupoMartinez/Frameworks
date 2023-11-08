from django.urls import path
from zeep_api.api.views import SoapAPIView

urlpatterns = [
    path('soap/', SoapAPIView.as_view(), name='soap_api'),
]
