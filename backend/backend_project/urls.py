from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Include Django Admin for management
    path('admin/', admin.site.urls),

    # Include the todo_app API URLs under the /api/ prefix
    path('api/', include('todo_app.urls')),
]