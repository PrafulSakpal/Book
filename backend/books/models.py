from django.db import models

class Books(models.Model):
    def nameFile(instance, filename):
     return '/'.join(['Files', str(instance.name), filename])
 
    name = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    publish_date = models.DateField()
    price = models.IntegerField()
    file=models.FileField(upload_to=nameFile,blank=True)
    
