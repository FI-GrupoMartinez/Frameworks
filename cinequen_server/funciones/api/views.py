from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from funciones.models import Funcion
from funciones.api.serializer import FuncionSerializer
from funciones.api.filters import FuncionFilter

from butacas.models import Butaca
from butacasxfuncion.models import ButacaxFuncion

from rest_framework.response import Response
from rest_framework import status


class FuncionApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = FuncionSerializer
    queryset = Funcion.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = FuncionFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Obtener la sala y las fechas de la función creada
        sala = serializer.validated_data['sala']
        fecha = serializer.validated_data['fecha']
        hora_inicio = serializer.validated_data['hora_inicio']
        hora_fin = serializer.validated_data['hora_fin']

        # Verificar si existen funciones en la misma sala y fecha
        funciones_existentes = Funcion.objects.filter(
            sala=sala,
            fecha=fecha
        )

        # Verificar si existen funciones que se superpongan en horario
        funciones_superpuestas = funciones_existentes.filter(
            Q(hora_inicio__range=(hora_inicio, hora_fin)) |
            Q(hora_fin__range=(hora_inicio, hora_fin))
        )

        if funciones_superpuestas.exists():
            return Response(
                {'error': 'La función se superpone con otra existente'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        # Crear un ButacaxFuncion para cada butaca
        butacas = Butaca.objects.filter(sala=sala)
        for butaca in butacas:
            ButacaxFuncion.objects.create(
                butaca=butaca, funcion=serializer.instance
            )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
