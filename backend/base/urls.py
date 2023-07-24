from django.urls import path
from base.api.views import user_api_view, user_detail_api_view
from base.views import plantel_equipo, poblar_rivales ,armado_liga, calendario, planteles_rivales
from django.views.generic import TemplateView

urlpatterns = [
    path('api/', user_api_view, name = 'usuario_api'),
    path('api/<int:pk>/', user_detail_api_view, name = 'usuario_detail_api_view'),
    path('equipo/', plantel_equipo, name = 'Plantel Equipo'),
    path('liga-data/', armado_liga, name = 'Armado Liga'),
    path('calendario-data/', calendario, name = 'Armado Liga'),
    path('rivales_data/', poblar_rivales, name = 'Poblar Rivales'),
    path('planteles_rivales/', planteles_rivales, name = 'Planteles Rivales'),
    
    path('', TemplateView.as_view(template_name='index.html')),
    path('menu/', TemplateView.as_view(template_name='index.html')),
    path('formacion/', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('calendario/', TemplateView.as_view(template_name='index.html')),
    
]