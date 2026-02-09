from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Vehicle
from .serializers import VehicleSerializer

class VehicleListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = VehicleSerializer

    def list(self, request):
        grouped = {}
        user = request.user
        vehicles = Vehicle.objects.filter(users=user)

        for v in vehicles:
            key = (v.model, v.year)
            if key not in grouped:
                grouped[key] = []
            grouped[key].append(v.serial_number)

        response_data = [
            {
                'model': model,
                'year': year,
                'serial_numbers': serials
            }
            for (model, year), serials in grouped.items()
        ]
        return Response(response_data)

class VehicleCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = VehicleSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vehicle = serializer.save()

        vehicle.users.add(request.user)
        vehicle.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class VehicleDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()

    def delete(self, request, **kwargs):
        try:
            vehicle = Vehicle.objects.get(pk=kwargs['pk'], users=request.user)
            vehicle.delete()
            return Response({'message': 'Vehicle deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)
