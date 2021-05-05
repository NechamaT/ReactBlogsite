using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace ReactBlogsite.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Commenter { get; set; }
        public DateTime DateCommented { get; set; }
        public int BlogPostId { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public BlogPost Blogpost { get; set; }
    }
}
