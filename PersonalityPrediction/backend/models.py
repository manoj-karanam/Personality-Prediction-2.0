from django.db import models






class Registration(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Assuming passwords are stored as hashed strings

    def __str__(self):
        return self.email
