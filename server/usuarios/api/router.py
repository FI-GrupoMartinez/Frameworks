from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView
from usuarios.api.views import UsuarioApiViewSet, UsuarioView

router_user = DefaultRouter()

router_user.register(
    prefix='usuarios', basename='usuarios', viewset=UsuarioApiViewSet
)

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/me/', UsuarioView.as_view())
]
