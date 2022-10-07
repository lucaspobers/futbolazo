from turtle import xcor
from unittest import result
from django.db.models import F
from matplotlib.font_manager import json_dump
from base.models import Jugadores, Equipos, Calendario
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from base.serializers import SerializadorPlantel, SerializadorEquipos, SerializadorCalendario, SerializadorFecha
import random
from collections import OrderedDict


@api_view(['GET'])
def plantel_equipo(request):
    
    if request.method == 'GET':
        try:
            if abc=="123":
                pass
        except:		
            asignar_jugadores(3,9,9,6)
            
            arqueros = Jugadores.arqueros_objects.all()[var1:var2]
            defensores = Jugadores.defensores_objects.all()[var3:var4]
            mediocampistas = Jugadores.mediocampistas_objects.all()[var5:var6]
            delanteros = Jugadores.delanteros_objects.all()[var7:var8]       
            
            equipo = arqueros | defensores | mediocampistas | delanteros
            equipo.order_by('posicion')
            
            abc='123'
            
            equipo_armado = SerializadorPlantel(equipo, many=True)

        
        return Response(equipo_armado.data)
    
@api_view(['GET'])
def calendario(request):
    
    if request.method == 'GET':

        fecha = {}
        numero_fecha = ['fecha_1', 'fecha_2', 'fecha_3', 'fecha_4', 'fecha_5', 'fecha_6', 'fecha_7', 'fecha_8', 'fecha_9', 'fecha_10', 'fecha_11', 'fecha_12', 'fecha_13', 'fecha_14', 'fecha_15', 'fecha_16', 'fecha_17', 'fecha_18', 'fecha_19']
        superior ={}
        ida = True
        
        """ Serializamos todos los equipos que forman parte de la liga """
        equipos_liga = Equipos.objects.all().order_by('puntos_equipo')[:20]    
        
        """ De la query anterior, determinamos los locales y visitantes """
        equipos_locales = equipos_liga[:10]
        equipos_visitantes = equipos_liga[10:]
        
        """ Serializamos los equipos locales y visitantes """
        lista_locales = SerializadorCalendario(equipos_locales, many=True)
        lista_visitantes = SerializadorCalendario(equipos_visitantes, many=True)
        
        """ Lo convierto en una lista y elimino los brackets para que el json quede prolijo"""
        lista_locales =[*lista_locales.data]
        final_locales = []
        
        for i in lista_locales:
            x = i.get('nombre_equipo')
            final_locales.append(x)
        
        lista_visitantes = [*lista_visitantes.data]
        final_visitantes = []
        
        for i in lista_visitantes:
            x = i.get('nombre_equipo')
            final_visitantes.append(x)
        
        """ Arma cada fecha"""
        def armado_calendario(var):
            for a in range(1,11):
                fecha['partido_' + str(var)] = {
                    'local' : final_locales[var],
                    'goles_local' : '',
                    'goles_visitante' : '',
                    'visitante' : final_visitantes[var]
                }
                var = var + 1
        
        """ Bucle para armar el calendario con todas las fechas """
        for x in numero_fecha:
            
            if ida == True:
                armado_calendario(0)
                
                copia_fecha = fecha.copy()     
                superior[x] = copia_fecha
                
                comodin = final_locales[0:9]
                comodin2 = final_visitantes[0:1]
                siguiente_visitante = comodin[0:1] + comodin2 + comodin[1:]
                
                comodin3 = final_visitantes[1:]
                comodin4 = final_locales[9:]
                siguiente_local = comodin3 + comodin4
                
                final_locales = siguiente_local
                final_visitantes = siguiente_visitante
                
                ida = False
            
            else:
                armado_calendario(0)
                
                copia_fecha = fecha.copy()     
                superior[x] = copia_fecha  
                
                comodin = final_visitantes[0:9]
                comodin2 = final_locales[0:1]
                siguiente_local = comodin[0:1] + comodin2 + comodin[1:]
                
                comodin3 = final_locales[1:]
                comodin4 = final_visitantes[9:]
                siguiente_visitante = comodin3 + comodin4
                
                final_locales = siguiente_local
                final_visitantes = siguiente_visitante
                
                ida = True              
    
                                       
    return Response(superior)

@api_view(['GET'])
def armado_liga(request):
    if request.method == 'GET':
        
        equipos_liga = Equipos.objects.all().order_by('puntos_equipo')[:20]  
        liga = SerializadorEquipos(equipos_liga, many=True)
        
        return Response(liga.data)

"""    
    CAMBIAR EL NOMBRE DE LA KEY
        equipos_locales = equipos_locales.values(locales=F('nombre_equipo'))
        
    fromkeys() - Me puede servir para asignar el numero de fecha       

    Borrador for -
        for a in range(1,11):
            fecha['partido N°' + str(var)] = {
                'local' : SerializadorCalendario(equipos_locales, many=True).data[var],
                # 'goles_local' : '',
                # 'goles_visitante' : '',
                'visitante' : SerializadorCalendario(equipos_visitantes, many=True).data[var]
            }
            var = var + 1

"""


# ------------------------ EJECUTAR UNA SOLA VEZ ------------------------

def ejecucion_unica(funcion_parametro):
    
    def funcion_interior(*args):
        if not funcion_interior.has_run:
            funcion_interior.has_run = True
            return funcion_parametro(*args)
    
    funcion_interior.has_run = False
    return funcion_interior

@ejecucion_unica
def asignar_jugadores(gk_var, df_var, mc_var, dc_var):
	global var1
	global var2
	global var3
	global var4
	global var5
	global var6
	global var7
	global var8

	var1=random.randrange(1,6)
	var2=var1 + gk_var

	var3=random.randrange(1,6)
	var4=var3 + df_var

	var5=random.randrange(1,6)
	var6=var5 + mc_var

	var7=random.randrange(1,6)
	var8=var7 + dc_var