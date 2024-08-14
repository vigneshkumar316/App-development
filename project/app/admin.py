from django.contrib import admin
from .models import User, Admin, Staff, Shift


# Register your models here

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Staff)
admin.site.register(Shift)
