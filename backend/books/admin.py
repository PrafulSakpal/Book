from django.contrib import admin
from .models import Books

@admin.register(Books)
class BookAdmin(admin.ModelAdmin):
    list_display= ['id' , 'name' , 'author' , 'publish_date', 'price','file']