

from django.urls import path
from .views import user_login, register_user, predict_personality_from_resume

urlpatterns = [
    path('login/', user_login, name='login'),
    path('register/', register_user, name='register'),
    path('predict-personality/', predict_personality_from_resume, name='predict_personality')
]
