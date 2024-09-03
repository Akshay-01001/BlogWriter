from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to='profile_pics',null=True,blank=True)
    
    def __str__(self):
        return self.user.username
    

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to="thumbnail/")
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    description = models.TextField()
    category = models.CharField(max_length=100,blank=True,null=True)
    
    
    def __str__(self):
        return self.title
    
class Comment(models.Model):
    blog_post = models.ForeignKey(BlogPost,related_name='comment',on_delete=models.CASCADE)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'comment by {self.author.username} on {self.blog_post.title}'