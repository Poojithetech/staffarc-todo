from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    # order_by must match the model
    queryset = Task.objects.all().order_by('-date_created') # <-- CORRECTED FIELD NAME
    serializer_class = TaskSerializer