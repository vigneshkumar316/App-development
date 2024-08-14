from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AdminViewSet, StaffViewSet, ShiftViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'staff', StaffViewSet)
router.register(r'shift', ShiftViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
