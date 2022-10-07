from rest_framework import serializers
from base.models import Jugadores

class JugadoresSerializer(serializers.ModelSerializer):
	class Meta:
		model = Jugadores
		fields = '__all__'
