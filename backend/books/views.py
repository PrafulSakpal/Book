from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Books
from .serializers import Bookserializer
from rest_framework.permissions import IsAuthenticated

class BookList(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        books =Books.objects.all()
        serializer = Bookserializer(books, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if request.user.role == 'Admin':
            serializer = Bookserializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'You do not have permission to create a book.'}, status=status.HTTP_403_FORBIDDEN)
        
class BookDetails(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        
        if request.user.role == 'Admin':
            try:
                book = Books.objects.get(pk=id)
            except Books.DoesNotExist:
                return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = Bookserializer(book)
            return Response(serializer.data)
        else:
            return Response({'error': 'You do not have permission to access this resource.'}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, id):
        
        if request.user.role == 'Admin':
            try:
                book = Books.objects.get(pk=id)
            except Books.DoesNotExist:
                return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = Bookserializer(book, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'You do not have permission to update this book.'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, id):

        if request.user.role == 'Admin':
            try:
                book = Books.objects.get(pk=id)
            except Books.DoesNotExist:
                return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
            book.delete()
            return Response({'msg': 'book deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You do not have permission to delete this book.'}, status=status.HTTP_403_FORBIDDEN)
        
        
    


