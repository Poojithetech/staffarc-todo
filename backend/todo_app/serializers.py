from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields must match the model
        fields = ('id', 'title', 'description', 'completed', 'date_created') # <-- CORRECTED FIELD NAME
        read_only_fields = ('date_created',) # <-- CORRECTED FIELD NAME