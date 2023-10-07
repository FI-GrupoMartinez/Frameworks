from django_filters import rest_framework as filters
from peliculas.models import Pelicula


class PeliculaFilter(filters.FilterSet):

    class Meta:
        model = Pelicula
        fields = [
            'nombre',
            'duracion',
            'clasificacion',
            'genero',
            'descripcion',
        ]
