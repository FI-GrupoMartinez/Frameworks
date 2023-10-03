from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from usuarios.models import Usuario
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from usuarios.api.serializers import UsuarioSerializer
from django.contrib.auth.hashers import make_password


class UsuarioApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        password = request.data['password']
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['password'] = request.user.password
        return super().update(request, *args, **kwargs)


class UsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serialiazer = UsuarioSerializer(request.user)
        return Response(serialiazer.data)
