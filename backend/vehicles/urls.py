from django.urls import path
from .views import VehicleListView, VehicleCreateView, VehicleDeleteView

urlpatterns = [
    path('', VehicleListView.as_view(), name='vehicle-list'),
    path('add/', VehicleCreateView.as_view(), name='vehicle-add'),
    path('delete/<uuid:pk>/', VehicleDeleteView.as_view(), name='vehicle-delete'),
]
