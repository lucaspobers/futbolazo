from xmlrpc.client import Boolean
from django.forms import CharField
from rest_framework import serializers
from base.models import Equipos, Jugadores, Calendario, Jugadores_Rivales

class SerializadorPlantel(serializers.ModelSerializer):
	class Meta:
		model = Jugadores
		fields = '__all__'
  
class SerializadorEquipos(serializers.ModelSerializer):
    class Meta:
        model = Equipos
        fields = '__all__'
        
class SerializadorCalendario(serializers.Serializer):   
    
    # id = serializers.IntegerField(read_only=True)
    nombre_equipo = serializers.CharField(max_length=100)
    # en_uso = serializers.BooleanField()
    
    
class SerializadorFecha(serializers.Serializer):

    local = serializers.CharField()
    goles_local = serializers.IntegerField(default=0)
    goles_local = serializers.IntegerField(default=0)
    visitante = serializers.CharField()
    cumplida = serializers.BooleanField(default=False)


class SerializadorRivales(serializers.ModelSerializer):
    class Meta:
        model = Jugadores_Rivales
        fields = '__all__'
    
