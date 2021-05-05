using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactBlogsite.Data;
using Microsoft.Extensions.Configuration;
using ReactBlogsite.Web.Models;

namespace ReactBlogsite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsiteController : ControllerBase
    {
        private readonly string _connectionString;

        public BlogsiteController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("admin")]
        public void admin(BlogPost blogPost)
        {
            blogPost.DatePosted = DateTime.Now;
            blogPost.Author = "Nechama Turin";
            var repo = new BlogsiteRepository(_connectionString);
            repo.AddBlogpost(blogPost);
        }

        [HttpPost]
        [Route("addComment")]
        public void addComment(Comment comment)
        {
            comment.DateCommented = DateTime.Now;
            var repo = new BlogsiteRepository(_connectionString);
            repo.AddComment(comment);
        }

        [HttpGet]
        [Route("getMostRecentBlogPost")]
        public int getMostRecentBlogPost()
        {
            var repo = new BlogsiteRepository(_connectionString);
            return repo.GetMostRecentBlogPost();
        }

        [HttpGet]
        [Route("getAll")]
        public List<BlogPost> getAll()
        {
            var repo = new BlogsiteRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpGet]
        [Route("viewBlog")]
        public BlogPost viewBlog(int id)
        {
           var repo = new BlogsiteRepository(_connectionString);
           return repo.GetById(id);
        }

    }
}
