from djongo import models
from users.models import User
import uuid

class Vehicle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    serial_number = models.CharField(max_length=100, unique=True)
    users = models.ManyToManyField(User, related_name='vehicles')

    def __str__(self):
        return f"{self.model} ({self.year}) ({self.serial_number})"
