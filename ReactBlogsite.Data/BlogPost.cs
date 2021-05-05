using System;
using System.Collections.Generic;
using System.Text;

namespace ReactBlogsite.Data
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime DatePosted { get; set; }
        public string Author { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
