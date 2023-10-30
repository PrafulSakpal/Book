from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookList.as_view(), name='book-list'),
    path('book/<int:id>/', views.BookDetails.as_view(), name='book-details'),
]