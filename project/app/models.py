from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Admin(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Staff(models.Model):
    name = models.CharField(max_length=100)
    contactnumber = models.CharField(max_length=15)
    position = models.CharField(max_length=100)
    user_email = models.EmailField(unique=True) 

    def __str__(self):
        return self.name


class Shift(models.Model):
    date = models.DateField()
    type = models.CharField(max_length=50)
    staff_needed = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.date} - {self.type}"

