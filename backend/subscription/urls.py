from django.urls import path
from .views import subscribedAPI, subscribeduser

urlpatterns = [
    path('subscribe/', subscribedAPI.as_view(), name='subscribe'),
    path('subscribeduser/<int:id>/', subscribeduser.as_view(), name='subscribedUser'),
    
]