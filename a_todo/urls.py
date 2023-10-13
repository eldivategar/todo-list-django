from django.urls import path
from a_todo import views

urlpatterns = [
    path('', views.home, name='home'),
    path('add/', views.add, name='add'),
    path('update/<int:id>/', views.update, name='update'),
    path('edit/<int:id>/', views.edit, name='edit'),
    path('edit_task/<int:id>/', views.edit_task, name='edit_task'),
    path('delete/<int:id>/', views.delete, name='delete'),
]