from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from usuarios.api.router import router_user
from peliculas.api.router import router_peliculas

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
    path('api/', include(router_peliculas.urls)),
]

# Configura el acceso a las imágenes
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
