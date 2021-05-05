using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBlogsite.Data
{
    public class BlogsiteRepository
    {
        private readonly string _connectionString;
        public BlogsiteRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBlogpost(BlogPost blogpost)
        {
            using var ctx = new BlogsiteDbContext(_connectionString);
            ctx.BlogPosts.Add(blogpost);
            ctx.SaveChanges();
        }

        public void AddComment(Comment comment)
        {
            using var ctx = new BlogsiteDbContext(_connectionString);
            ctx.Comments.Add(comment);
            ctx.SaveChanges();
        }

        public int GetMostRecentBlogPost()
        {
            using var ctx = new BlogsiteDbContext(_connectionString);
            BlogPost post = ctx.BlogPosts.Include(p => p.Comments).OrderByDescending(p => p.DatePosted).FirstOrDefault();
            return post.Id;
        }

        public int GetPostsCount()
        {
            using var ctx = new BlogsiteDbContext(_connectionString);
            return ctx.BlogPosts.Count();
        }

        public List<BlogPost> GetAll(int page)
        {
            using var ctx = new BlogsiteDbContext(_connectionString);
            return ctx.BlogPosts.Include(p => p.Comments).OrderByDescending(p => p.DatePosted).Skip((page-1)*3).Take(3).ToList();
        }
        public BlogPost GetById(int id)
        {
            using var ctx = new BlogsiteDbContext(_connectionString);
            return ctx.BlogPosts.Include(p => p.Comments).FirstOrDefault(p => p.Id ==id);
        }

        public int GetLastPage()
        {
            var ctx = new BlogsiteDbContext(_connectionString);
            var total = ctx.BlogPosts.Count();
            if(total % 3 == 0)
            {
                return total / 3;
            }

            return (total / 3) + 1;
        }


    }
}
