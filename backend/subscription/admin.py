from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class subscriptionAdmin(admin.ModelAdmin):
    list_display= ['id' , 'is_subscribed' , 'user_id']
