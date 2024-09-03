from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, BlogPost, Comment


class UserSerializer(serializers.ModelSerializer): 
    password = serializers.CharField(write_only=True) 
    
    class Meta:
        model = User
        fields = ('username', 'email','password','first_name','last_name') 

    def create(self, data):
        user = User.objects.create_user(
            username=data['username'],
            password=data['password'],
            email=data['email']
        )
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance
    
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('profile_pic','user')  
        
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
        return user_data
    
    
class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)  
    author_pic = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'author', 'thumbnail', 'created_at', 'content','description', 'category', 'author_pic')

    def get_author_pic(self, obj):
        profile = UserProfile.objects.filter(user=obj.author).first()
        if profile and profile.profile_pic:
            return profile.profile_pic.url
        return None

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_pic = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'blog_post', 'author_username', 'author_pic', 'content', 'created_at')

    def get_author_pic(self, obj):
        profile = UserProfile.objects.filter(user=obj.author).first()
        if profile and profile.profile_pic:
            return profile.profile_pic.url
        return None
    
    def create(self, validated_data):
        print(validated_data)
        user = validated_data.pop('author')
        return Comment.objects.create(**validated_data, author=user)
