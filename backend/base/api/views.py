from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from base.api.serializers import JugadoresSerializer
from base.models import Jugadores

@api_view(['GET', 'POST'])
def user_api_view(request):

	if request.method == 'GET':
		futbolistas = Jugadores.objects.all()
		j_serializer = JugadoresSerializer(futbolistas, many=True) 
		return Response(j_serializer.data)

	elif request.method == 'POST':
		j_serializer = JugadoresSerializer(data = request.data)
		if j_serializer.is_valid():
			j_serializer.save()
			return Response(j_serializer.data) 
		return Response(j_serializer.errors)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail_api_view(request, pk=None):
	
	# queryset
	futbolistas = Jugadores.objects.filter(id = pk).first()
	
	# validation
	if futbolistas:

		# Retrieve 
		if request.method == 'GET':
			j_serializer = JugadoresSerializer(futbolistas)
			return Response(j_serializer.data, status=status.HTTP_200_OK)

		# Update 
		elif request.method == 'PUT':
			j_serializer = JugadoresSerializer(futbolistas, data = request.data)
			if j_serializer.is_valid():
				j_serializer.save()
				return Response(j_serializer.data, status=status.HTTP_200_OK)
			return Response(j_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		# Delete 
		elif request.method == 'DELETE':
			futbolistas.delete()
			return Response({'message': 'Usuario eliminado correctamente'}, status=status.HTTP_200_OK)
			# Le pasamos un 'message' porque esa es la variable que va a tomar el front end cuando lo trabajemos

	return Response({'message': 'No se ha encontrado un usuario con estos datos'}, status=status.HTTP_400_BAD_REQUEST)