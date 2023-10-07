from django.db import models


class Pelicula(models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.IntegerField()
    poster = models.ImageField(upload_to='poster_peliculas')
    clasificacion = models.CharField(max_length=100)
    genero = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=500)

    def __str__(self):
        duracion_minutos = self.duracion
        horas, minutos = divmod(duracion_minutos, 60)
        duracion_str = f"{horas}:{minutos:02d}"
        return f"{self.nombre} - Género: {self.genero} | Duración: {duracion_str}hs"
