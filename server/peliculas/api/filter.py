from django_filters import rest_framework as filters
from peliculas.models import Pelicula


class PeliculaFilter(filters.FilterSet):

    class Meta:
        model = Pelicula
        fields = [
            'nombre',
            'duracion',
            'video_trailer',
            'clasificacion',
            'actores',
            'director',
            'genero',
            'origen',
            'distribuidor',
            'descripcion_corta',
            'descripcion_larga',
            'tipo'
        ]
