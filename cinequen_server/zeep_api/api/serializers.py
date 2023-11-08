from rest_framework import serializers


class SoapAPISerializer(serializers.Serializer):
    metodo = serializers.CharField()
    num1 = serializers.IntegerField()
    num2 = serializers.IntegerField()


class ResponseSOAP(serializers.Serializer):
    response = serializers.CharField()
