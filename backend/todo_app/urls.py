from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Create a router instance
router = DefaultRouter()

# Register the ViewSet with a base name and URL prefix
# This automatically generates all 5 CRUD endpoints:
# /tasks/ (GET, POST)
# /tasks/{id}/ (GET, PUT, PATCH, DELETE)
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = router.urls