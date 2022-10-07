from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from user_login.serializers import UserTokenSerializer

class Login(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        
        login_serializer = self.serializer_class(data = request.data, context={'request':request})
        
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_serializer = UserTokenSerializer(user)
                
                if created: 
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'message': 'Inicio de sesion exitoso'
                        }, status=status.HTTP_201_CREATED)
                else:
                    token.delete()
                    token = Token.objects.create(user=user)
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'message': 'Inicio de sesion exitoso'
                        }, status=status.HTTP_201_CREATED)
            
            else:
                return Response({'error': 'El usuario no esta activo'}, status=status.HTTP_401_UNAUTHORIZED)
        
        else:
            return Response({'error': 'Nombre de usuario o contraseña incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'mensaje': 'Hola desde response'}, status= status.HTTP_200_OK)
    

# Como ObtainAuthToken ya tiene un serializador incorporado, lo uso para serializar el user y la pass.

