from django.db import models

class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    status = models.CharField(max_length=15, default='On progress')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title