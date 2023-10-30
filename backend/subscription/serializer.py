from rest_framework import serializers
from .models import Subscription

class subscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields =['is_subscribed','user_id']