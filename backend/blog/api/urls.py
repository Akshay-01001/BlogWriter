from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path,include
from .views import RegisterView,LoginView,LogoutView,BlogPostCreateView,BlogPostListView,UserBlogPostListView,BlogPostView,BlogPostDeleteView,CommentCreateView,CommentListView,ProfileDeleteView,ProfileUpdateView,UserProfileView,CommentDeleteView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('blogs/', BlogPostListView.as_view(), name='blog-list'), 
    path('blogs/<int:pk>', BlogPostView.as_view(), name='blog-list'), 
    path('myblogs/', UserBlogPostListView.as_view(), name='user-blog-list'),  
    path('blogs/<int:pk>/delete/', BlogPostDeleteView.as_view(), name='blog-delete'), 
    path('blogs/create/', BlogPostCreateView.as_view(), name='blog-create'),  
    path('blogs/<int:post_id>/comments/', CommentListView.as_view(), name='comment-list'), 
    path('blogs/<int:post_id>/comments/<int:comment_id>/delete/', CommentDeleteView.as_view(), name='comment-delete'),  
    path('blogs/<int:post_id>/comments/create/', CommentCreateView.as_view(), name='comment-create'),  
    path('profile/delete/', ProfileDeleteView.as_view(), name='profile-delete'),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'), 
    path('profile/',UserProfileView.as_view(),name='user-profile'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)