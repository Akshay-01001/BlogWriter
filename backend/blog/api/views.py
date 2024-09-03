from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from .serializers import UserSerializer, UserProfileSerializer, BlogPostSerializer, CommentSerializer
from .models import UserProfile, BlogPost, Comment
from rest_framework.parsers import JSONParser

class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            profile_pic = request.data.get('profile_pic')
            if profile_pic: 
                UserProfile.objects.create(user=user, profile_pic=profile_pic)
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'detail': "Registered Successfully"}, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user is not None:
            django_login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'message': "Login Successful"}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        django_logout(request)
        request.auth.delete()  
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class BlogPostCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BlogPostSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save(author=request.user)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogPostListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        blogs = BlogPost.objects.all()
        serializer = BlogPostSerializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BlogPostView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request,pk):
        blog = BlogPost.objects.get(pk=pk)
        serialier = BlogPostSerializer(blog,many = False)
        return Response(serialier.data,status=status.HTTP_200_OK)

class UserBlogPostListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        blogs = BlogPost.objects.filter(author=request.user)
        serializer = BlogPostSerializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogPostDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            blog = BlogPost.objects.get(pk=pk, author=request.user)
            blog.delete()
            return Response({'message': 'Blog post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except BlogPost.DoesNotExist:
            return Response({'error': 'Blog post not found or not authorized to delete'}, status=status.HTTP_404_NOT_FOUND)

class CommentCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
        
    def post(self, request, post_id):
        try:
            blog_post = BlogPost.objects.get(id=post_id)
            print(blog_post)
        except BlogPost.DoesNotExist:
            return Response({'error': 'Blog post not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CommentSerializer(data=request.data)
        print(request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save(author=request.user,blog_post=blog_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, post_id):
        blog_post = BlogPost.objects.get(id=post_id)
        comments = Comment.objects.filter(blog_post=blog_post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CommentDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id, blog_post_id=post_id, author=request.user)
            comment.delete()
            return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found or not authorized to delete'}, status=status.HTTP_404_NOT_FOUND)

class ProfileDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            user_profile.delete()
            request.user.delete()  # Also delete the user account
            request.auth.delete()  # Delete the token
            return Response({'message': 'Profile deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

class ProfileUpdateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]

    def patch(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            print(request.data)
            print(user_profile)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
