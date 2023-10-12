from django.shortcuts import render, redirect
from .models import Todo

def home(request):
    todos = Todo.objects.all().order_by('-id')
    return render(request, 'index.html', {'todos': todos})

def add(request):
    title = request.POST['title']
    todo = Todo.objects.create(title=title)
    todo.save()
    todos = Todo.objects.all().order_by('-id')
    return redirect('home')

def update(request, id):
    todo = Todo.objects.get(id=id)
    todo.status = 'Done'
    todo.save()
    return redirect('home')

def delete(request, id):
    todo = Todo.objects.get(id=id)
    todo.delete()
    return redirect('home')