from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, BlogPost, Comment


class UserSerializer(serializers.ModelSerializer): 
    password = serializers.CharField(write_only=True,required = False) 
    class Meta:
        model = User
        fields = ('username', 'email','password','first_name','last_name') 

    def create(self, validated_data):
        password = validated_data.pop('password',None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        validated_data.pop('username', None)
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ('profile_pic', 'user')

    # def update(self,instance,validated_data):
    #     print(validated_data,"validated data")
    #     print(instance,"instance")
    #     user_data = {
    #         'email'  : "",
    #         'first_name':"",
    #         'last_name':""
            
    #     }
    #     if 'email' in validated_data:
    #         user_data['email'] = validated_data.pop('email')
    #     if 'first_name' in validated_data:
    #         user_data['first_name'] = validated_data.pop('first_name')
    #     if 'last_name' in validated_data:
    #         user_data['last_name'] = validated_data.pop('last_name')
        
    #     print(user_data,"serializer")
    #     if user_data:
    #         user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
    #         if user_serializer.is_valid():
    #             user_serializer.save()
    #         else:
    #             raise serializers.ValidationError(user_serializer.errors)
    
    #     profile_pic = validated_data.get('profile_pic', None)
    #     if profile_pic:
    #         instance.profile_pic = profile_pic
    #     instance.save()
        
    #     return instance
    
    
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
