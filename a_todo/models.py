from django.db import models

class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    member = models.CharField(max_length=100, default='Unknown')
    title = models.CharField(max_length=100)
    priority = models.CharField(max_length=10, default='Low')
    status = models.CharField(max_length=10, default='Not Done')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.member, self.title, self.priority