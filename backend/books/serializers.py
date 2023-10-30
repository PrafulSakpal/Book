from rest_framework import serializers
from .models import Books

class Bookserializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Books
        fields = ['id', 'name', 'author', 'publish_date', 'price', 'file', 'file_url']

    def get_file_url(self, obj):
        if obj.file:
            return obj.file.url
        return None