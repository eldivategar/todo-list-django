from django.urls import path
from a_todo import views

urlpatterns = [
    path('', views.home, name='home'),
    path('add/', views.add, name='add'),
    path('update/<int:id>/', views.update, name='update'),
    path('edit/<int:id>/', views.edit, name='edit'),
    path('get_task_by_id/<int:id>/', views.get_task_by_id, name='get_task_by_id'),
    path('delete/<int:id>/', views.delete, name='delete'),
]