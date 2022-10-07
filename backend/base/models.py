from django.db import models

class ArquerosManager(models.Manager):
	def get_queryset(self):
		return super().get_queryset().filter(posicion='Arquero')

class DefensorManager(models.Manager):
	def get_queryset(self):
		return super().get_queryset().filter(posicion='Defensor')

class MediocampistaManager(models.Manager):
	def get_queryset(self):
		return super().get_queryset().filter(posicion='Mediocampista')

class DelanteroManager(models.Manager):
	def get_queryset(self):
		return super().get_queryset().filter(posicion='Delantero')


class Jugadores(models.Model):
	def __str__(self):
		return f"{self.nombre} {self.apellido} {self.posicion} {self.pais} Valoracion: {self.valoracion}"

	paises = (
		('AR', 'Argentina'),
		('BR', 'Brasil'),
		('UR', 'Uruguay'),
		('PE', 'Peru'),
		('CO', 'Colombia'),
		('PA', 'Paraguay'),
		('CH', 'Chile'),
		('EC', 'Ecuador'),
		('BO', 'Bolivia'),
		('VE', 'Venezuela'),
	)

	posiciones = (
		('Arquero', 'Arquero'),
		('Defensor', 'Defensor'),
		('Mediocampista', 'Mediocampista'),
		('Delantero', 'Delantero'),
	)

	nombre=models.CharField(max_length=15, verbose_name="Nombre")
	apellido=models.CharField(max_length=25, verbose_name="Apellido")
	pais=models.CharField(max_length=15, choices=paises, verbose_name="Pais")
	valoracion=models.IntegerField(verbose_name="Valoracion", blank=True, null=True)
	posicion=models.CharField(max_length=15, choices=posiciones, verbose_name='Posicion', blank=True, null=True)
	goles=models.IntegerField(verbose_name="Goles", default=0)
	velocidad=models.IntegerField(verbose_name="Velocidad", blank=True, null=True)
	regate=models.IntegerField(verbose_name="Regate", blank=True, null=True)
	pase=models.IntegerField(verbose_name="Pase", blank=True, null=True)
	tiro=models.IntegerField(verbose_name="Tiro", blank=True, null=True)
	defensa=models.IntegerField(verbose_name="Defensa", blank=True, null=True)
	fisico=models.IntegerField(verbose_name="Fisico", blank=True, null=True)
	goles=models.IntegerField(verbose_name="Goles", default=0)
	titular=models.BooleanField(verbose_name='Titular', blank=True, null=True)
 
	objects = models.Manager()
	
	arqueros_objects = ArquerosManager()
	defensores_objects = DefensorManager()
	mediocampistas_objects = MediocampistaManager()
	delanteros_objects = DelanteroManager()

class Equipos(models.Model):
	def __str__(self):
		return f"{self.nombre_equipo}"

	nombre_equipo=models.CharField(max_length=15, verbose_name="Nombre Equipo")
	puntos_equipo=models.IntegerField(default=0, verbose_name="Puntos")
	goles_favor=models.IntegerField(default=0, verbose_name="Goles a Favor")
	goles_contra=models.IntegerField(default=0, verbose_name="Goles en Contra")
	en_uso=models.BooleanField(verbose_name='En Uso', blank=True, null=True)
 
class Calendario(models.Model):

	id=models.AutoField(verbose_name="Posicion Tabla", primary_key=True)
	fecha=models.IntegerField(verbose_name="Fecha", blank=True, null=True)
	equipo_local=models.CharField(max_length=25, verbose_name="Equipo Local")
	goles_local=models.IntegerField(default=0, verbose_name="Goles Local", blank=True, null=True)
	goles_visitante=models.IntegerField(default=0, verbose_name="Goles Visitante", blank=True, null=True)
	equipo_visitante=models.CharField(max_length=25, verbose_name="Equipo Visitante")
 