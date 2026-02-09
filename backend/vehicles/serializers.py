from rest_framework import serializers
from .models import Vehicle
from users.models import User

class VehicleSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True
    )

    class Meta:
        model = Vehicle
        fields = ['id', 'model', 'year', 'serial_number' 'users']
