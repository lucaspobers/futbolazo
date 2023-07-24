from turtle import xcor
from unittest import result
from django.db.models import F
from matplotlib.font_manager import json_dump
from base.models import Jugadores, Equipos, Jugadores_Rivales
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from base.serializers import SerializadorPlantel, SerializadorEquipos, SerializadorCalendario, SerializadorFecha, SerializadorRivales
import random
from collections import OrderedDict
from django.shortcuts import render
import json


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
    

nombres= ['Juan', 'Santiago', 'Mateo', 'Lucas', 'Joaquín', 'Lautaro', 'Benjamín', 'Bautista', 'Facundo', 'Tomás',
                  'Agustín', 'Thiago', 'Maximiliano', 'Nicolás', 'Emiliano', 'Iván', 'Manuel', 'Alejandro', 'Leonardo',
                  'Gonzalo', 'Bruno', 'Federico', 'Diego', 'Javier', 'Cristian', 'Juan Pablo', 'Hernán', 'Pablo',
                  'Adrián', 'Francisco', 'Enzo', 'Sebastián', 'Ramiro', 'Ezequiel', 'Rodrigo', 'Luciano', 'Mauricio',
                  'Jerónimo', 'Gabriel', 'Lisandro', 'Alan', 'Martín', 'Marcos', 'Mariano', 'Leandro', 'David', 'Lucas',
                  'Luis', 'José', 'Guillermo', 'Roberto', 'Andrés', 'Marcelo', 'Matías', 'Lucio', 'Nicolás', 'Matías',
                  'Pedro', 'Jorge', 'Alejandro', 'Fernando', 'Julián', 'Sergio', 'Iván', 'Nahuel', 'Gastón', 'Mariano',
                  'Bruno', 'Miguel', 'Juan Manuel', 'Lorenzo', 'Tomás', 'Juan José', 'Agustín', 'Juan Ignacio',
                  'Valentín', 'Ariel', 'Julián', 'Emanuel', 'Leandro', 'Gustavo', 'Alberto', 'Cristian', 'Ezequiel',
                  'Alexis', 'Nicolás', 'Joaquín', 'Máximo', 'Braian', 'Carlos', 'Matías', 'José Luis', 'César',
                  'Ignacio', 'Gonzalo', 'Javier', 'Renato', 'Alex', 'Emmanuel', 'Jesús', 'Leonardo', 'Víctor',
                  'Esteban', 'Tomás', 'Emiliano', 'Germán', 'Mauro', 'Julián', 'Juan Cruz', 'Juan Martín', 'Juan Manuel',
                  'Federico', 'Gonzalo', 'Luis', 'Darío', 'Gustavo', 'Roberto', 'Maximiliano', 'Matías', 'Jorge Luis',
                  'Jorge', 'Agustín', 'Pablo', 'Miguel Ángel', 'Marcelo', 'Héctor', 'Franco', 'José María', 'Fabián',
                  'Juan Carlos', 'Walter', 'Lucas', 'Ricardo', 'Fernando', 'Adrián', 'Mauricio', 'Claudio', 'Diego',
                  'Rodrigo', 'Ezequiel', 'Luciano', 'Lisandro', 'Gabriel', 'Eduardo', 'Nicolás', 'Nahuel', 'Damián',
                  'Germán', 'Gustavo', 'Lautaro', 'Santiago', 'Facundo', 'Martín', 'Joaquín', 'Mauro', 'Emmanuel',
                  'Bautista']

apellidos = ['González', 'Rodríguez', 'García', 'Fernández', 'López', 'Martínez', 'Pérez', 'Gómez', 'Sánchez', 'Díaz', 'Romero', 'Torres', 'Flores', 'Alvarez', 'Ortiz', 'Ramirez', 'Acosta', 'Castro', 'Benítez', 'Medina', 'Suárez', 'Cáceres', 'Ríos', 'Vargas', 'Arias', 'Figueroa', 'Velázquez', 'Sosa', 'Aguilar', 'Giménez', 'Morales', 'Romero', 'Navarro', 'Luna', 'Rojas', 'Pereyra', 'Quiroga', 'Maldonado', 'Cabrera', 'Godoy', 'Vega', 'Franco', 'Núñez', 'Toledo', 'Pereira', 'Toledo', 'Barrios', 'Cardozo', 'Peralta', 'Álvarez','Ojeda', 'Correa', 'Rivero', 'Molina', 'Villalba', 'Yañez', 'Vera', 'Aguirre', 'Castillo', 'Maidana','Farías', 'Soria', 'Aguirre', 'Herrera', 'Duarte', 'Oviedo', 'Gutiérrez', 'Córdoba', 'Martínez', 'Giménez', 'Leiva', 'Duarte', 'Miranda', 'Reynoso', 'Barrios', 'Méndez', 'Soria', 'Cortez', 'Alaniz', 'Zárate', 'Giménez', 'Ríos', 'Lescano', 'Barreto', 'Ferreyra', 'Mercado', 'Olivera', 'Gauna', 'Herrera', 'Ferreira', 'Ponce', 'Nieto', 'Gómez', 'Pereyra', 'Aguilar', 'Ávalos', 'Mansilla', 'Páez', 'Zelaya','Bazán']


@api_view(['GET', 'POST'])
def poblar_rivales(request):
    
    nombres_r = []
    apellidos_r = []
    
    
    for i in range (1000):
        nombre = random.choice(nombres)
        apellido = random.choice(apellidos)
        nombres_r.append(nombre)
        apellidos_r.append(apellido)
        
    posiciones = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero']
    paises = ['Argentina'] * 750 + ['Chile'] * 50 + ['Uruguay'] * 50 + ['Colombia'] * 50 + ['Paraguay'] * 50 + ['Ecuador'] * 50
    
    num_registros = Jugadores_Rivales.objects.count()
    
    if num_registros < 1000:
        for i in range(len(nombres_r)):
            persona = Jugadores_Rivales(nombre=nombres_r[i], apellido=apellidos_r[i])
            persona.pais = random.choice(paises)
            persona.valoracion = random.randint(63, 67)
            persona.posicion = random.choice(posiciones)
            persona.save()
    else:
        pass
    
    bbdd_rivales = SerializadorRivales(Jugadores_Rivales.objects.all(), many=True)
    
    return Response(bbdd_rivales.data)    

# Por el momento tengo que entrar manualmente a la url para que se ejecute la función
# Habria que 'dispararla' automaticamente en algun momento



@api_view(['GET'])
def planteles_rivales(request):
    random.seed(1234)
    
    equipos_liga = Equipos.objects.exclude(nombre_equipo='Ramos Mejia').order_by('puntos_equipo')[:20]
    
    diccionario_equipos = {}
    
    for x in equipos_liga:
        arqueros = Jugadores_Rivales.arqueros_objects.all().order_by('?')[:3]
        defensores = Jugadores_Rivales.defensores_objects.all().order_by('?')[:9]
        mediocampistas = Jugadores_Rivales.mediocampistas_objects.all().order_by('?')[:9]
        delanteros = Jugadores_Rivales.delanteros_objects.all().order_by('?')[:6]
    
        equipo = arqueros | defensores | mediocampistas | delanteros
    
        diccionario_equipos[x.nombre_equipo] = SerializadorRivales(equipo, many=True).data
        
    return Response(diccionario_equipos)

# De igual manera que en JS cada vez que actualizo los rivales tienen nuevos planteles
    
    
    
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
 
""" RANDOM.SEED - la selección aleatoria de jugadores se realizará siempre con la misma semilla 
y devolverá los mismos resultados para un mismo conjunto de datos """