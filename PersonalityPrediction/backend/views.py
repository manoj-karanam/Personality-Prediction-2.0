from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import json
from .models import Registration
from datetime import datetime
from .PersonalityPredictor import PersonalityPredictor
from django.db import IntegrityError
import PyPDF2
import io

@csrf_exempt
@require_http_methods(["POST"])
def user_login(request):
    try:
        data = json.loads(request.body)
        email = data['login']['email']
        password = data['login']['password']

        try:
            user = Registration.objects.get(email=email)
            # Check if the hashed password matches the one provided by the user
            if check_password(password, user.password):
                # Password matches, login successful
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                # Password does not match
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        except Registration.DoesNotExist:
            # User not found
            return JsonResponse({"error": "User does not exist"}, status=400)
    except KeyError:
        return JsonResponse({"error": "Bad request"}, status=400)
    
@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
        registration_data = data['registration']

        first_name = registration_data['studentName']['firstName']
        last_name = registration_data['studentName']['lastName']
        email = registration_data['email']
        
        password = registration_data['password']
        confirm_password = registration_data['confirmPassword']
    

        if password != confirm_password:
            return JsonResponse({"error": "Password and confirm password do not match"}, status=400)
        hashed_password = make_password(password)

        try:
            Registration.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=hashed_password,
            )
        except IntegrityError:
            return JsonResponse({"error": "Email already registered"}, status=400)
        
        return JsonResponse({"message": "User registered successfully"}, status=201)
    except KeyError:
        return JsonResponse({"error": "Bad request"}, status=400)
    


@csrf_exempt
@require_http_methods(["POST"])
def predict_personality_from_resume(request):
    try:
        # Get the resume PDF file from the request
        resume_file = request.FILES.get('resume')
        print(resume_file)
        print(type(resume_file))
        # Check if resume file exists in the request
        if not resume_file:
            return JsonResponse({"error": "Resume file not provided"}, status=400)

        # print(resume_file.read().decode('utf-8'))
        # Create an instance of the PersonalityPredictor class
        predictor = PersonalityPredictor(resume_file)
        # Predict personality
        personality_result = predictor.predict_personality()
        print(f"personality result in API: {personality_result}")
        personality_result_json = {"personality_result": personality_result}
        # Return the predicted personality as JSON response
        return JsonResponse(personality_result_json, status=200)

    except Exception as e:
        # Handle any exceptions
        return JsonResponse({"error": str(e)}, status=500)    