from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Subscription
from .serializer import subscriptionSerializer

class subscribedAPI(APIView):
    def post(self, request):
        user =request.user
        subscription = Subscription.objects.create(user=user)
        subscription.is_subscribed = True
        subscription.save()

        serializer = subscriptionSerializer(subscription)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class subscribeduser(APIView):
       
    def get(self,request , id):
        try:
            user = Subscription.objects.get(user_id=id)
        except Subscription.DoesNotExist:
            return Response({"error": "Subscription does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = subscriptionSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
