from django.contrib import admin
from usuarios.models import Usuario
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(Usuario)
class UserAdmin(BaseUserAdmin):
    pass
