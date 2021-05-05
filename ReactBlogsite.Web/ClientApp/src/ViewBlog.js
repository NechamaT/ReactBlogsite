import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Blogpost from "./Blogpost";
import { da } from "date-fns/locale";
import { param } from "jquery";
import {Image, StyleSheet} from 'react-native'

const ViewBlog = () => {
  const [blogPost, setBlogposts] = useState({
    id: "",
    title: "",
    text: "",
    datePosted: "",
    author: "",
    comments: [],
  });

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 60,
      height: 50,
    },
  });

  const [comment, setComment] = useState({
    text: "",
    commenter: "",
    blogPostId: "",
  });

  const {id} = useParams();

  useEffect(() => {
    const getBlogPostById = async () => {
      //const { id } = params;
      console.log({id});
      const { data } = await axios.get(`api/blogsite/viewBlog?id=${id}`);
      setBlogposts(data);
    };
    getBlogPostById();
  }, []);

const {title, text, author, datePosted, comments} = blogPost;

  const onTextChange= e=>{
    const copy = { ...comment };
    copy[e.target.name] = e.target.value;
    setComment(copy);
  }

  const onSubmit = async ()=>{
      let copy ={...comment}
      copy.blogPostId = id;
    await axios.post("api/blogsite/addcomment", copy)
    console.log(copy)
    setComment({
        id: "",
        text: "",
        commenter: "",
        dateCommented: "",
        blogPostId: "",
      })
      const {data} =await axios.get(`api/blogsite/viewBlog?id=${id}`)
      setBlogposts(data);
      setComment({blogPostId: id})
  }

  const getComment = (comment) => {
    return (
      <div className="media mb-4">
    <Image className="d-flex mr-3 rounded-circle" style={styles.logo} source ={{uri:'https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png'}} />

        <div className="media-body">
          <h5 className="mt-0">
            {comment.commenter}
            <small className="ml-1">
            {datePosted && <p>Posted on {format(new Date(datePosted), 'cccc MMMM do, yyyy')}</p>}            </small>
          </h5>
          {comment.text}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mt-4">{title}</h1>
          <p className="lead">by {author}</p>
          {datePosted && <p>Posted on {format(new Date(datePosted), 'cccc MMMM do, yyyy')}</p>}   
          <p>{text}</p>
          <div className="card my-4">
            <h5 className="card-header">Leave a Comment:</h5>
            <div className="card-body">
              <input type="hidden" name="blogPostId" value={id} />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Please enter your name"
                  className="form-control"
                  name="commenter"
                  value={comment.name}
                  onChange={onTextChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Type your comment here but remember to be be nice..."
                  name="text"
                  className="form-control"
                  rows="3"
                  value={comment.text}
                  onChange={onTextChange}
                ></textarea>
              </div>
              <button  className="btn btn-primary"
              onClick={onSubmit}>
                Submit
              </button>
            </div>
          </div>
          {comments.map((c) => getComment(c))}
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
