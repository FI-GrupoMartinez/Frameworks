# Generated by Django 4.2.4 on 2023-10-20 00:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_administrador_cliente_user_rol'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Administrador',
        ),
    ]