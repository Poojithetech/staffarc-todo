from rest_framework import serializers
from .models import Task # Ensure this import is here

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # CORRECT: Remove 'date_created' and ADD 'estimated_hours'
        fields = ('id', 'title', 'description', 'completed', 'estimated_hours')