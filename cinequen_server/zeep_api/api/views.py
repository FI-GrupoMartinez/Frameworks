from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from zeep.wsdl.definitions import PortType

from zeep import Client

from zeep_api.api.serializers import SoapAPISerializer, ResponseSOAP


class SoapAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SoapAPISerializer

    @swagger_auto_schema(
        request_body=SoapAPISerializer,
        operation_description="Realiza una consulta a la API SOAP",
        responses={200: openapi.Response(
            description="Resultado de la consulta")}
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not serializer.is_valid():
            print(serializer.errors)

        metodo = serializer.validated_data.get('metodo')
        num1 = serializer.validated_data.get('num1')
        num2 = serializer.validated_data.get('num2')

        client = Client('http://www.dneonline.com/calculator.asmx?wsdl')
        result = getattr(client.service, metodo)(num1, num2)

        return Response({'response': result})

    def get(self, request):
        client = Client('http://www.dneonline.com/calculator.asmx?wsdl')
        methods = []
        for operation in client.service._operations.values():
            methods.append(operation._op_name)
        return Response({'response': methods})
