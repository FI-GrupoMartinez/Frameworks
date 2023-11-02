# Generated by Django 4.2.4 on 2023-10-12 02:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('salas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Butaca',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fila', models.CharField(max_length=1)),
                ('numero', models.IntegerField()),
                ('sala', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='salas.sala')),
            ],
        ),
    ]
