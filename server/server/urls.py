from django.contrib import admin
from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from usuarios.api.router import router_user

schema_view = get_schema_view(
    openapi.Info(
        title="FI Martínez API",
        default_version='v1',
        description="Documentación API del Grupo Martínez",
        terms_of_service=".",
        contact=openapi.Contact(email="."),
        license=openapi.License(name="."),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),  # Panel Administración Django
    path('docs/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),  # Documentación minimalista
    path('api/', include('usuarios.api.router')),
    path('api/', include(router_user.urls)),
]
