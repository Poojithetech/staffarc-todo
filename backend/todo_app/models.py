# backend/todo/models.py

from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    # NEW FIELD ADDED BELOW:
    estimated_hours = models.DecimalField(
        max_digits=5,  # Allows up to 999.99 hours
        decimal_places=2,  # Stores hours with 2 decimal places (e.g., 2.50)
        default=0,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.title