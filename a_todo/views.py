from django.shortcuts import render, redirect
from .models import Todo
from django.http import JsonResponse
import json

def home(request):
    todos = Todo.objects.filter(status='Not Done').order_by('-id')
    todos_done = Todo.objects.filter(status='Done').order_by('-id')
    return render(request, 'index.html', {'todos': todos, 'todos_done': todos_done})

def add(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        member = data.get('member')
        title = data.get('title')
        priority = data.get('priority')

        if not member or not title or not priority:
            return JsonResponse({"error": "Please enter valid data."}, status=400)
        todo = Todo.objects.create(title=title, member=member, priority=priority)
        todo.save()
        return JsonResponse({"message": "Task Saved."}, status=200)
    else:
        return JsonResponse({"error": "Invalid method."}, status=405)

def update(request, id):
    todo = Todo.objects.get(id=id)
    todo.status = 'Done'
    todo.save()
    return JsonResponse({"success": "Task Updated."}, status=200)

def delete(request, id):
    todo = Todo.objects.get(id=id)
    todo.delete()
    return JsonResponse({"message": "Task Deleted."}, status=200)