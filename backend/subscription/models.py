from django.db import models
from account.models import User

class Subscription(models.Model):
    user=models.ForeignKey(User , on_delete=models.CASCADE)
    is_subscribed = models.BooleanField(default=False)
