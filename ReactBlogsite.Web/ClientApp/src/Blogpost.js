import React from "react";
import { Link } from "react-router-dom";
import {format} from 'date-fns'

const Blogpost = ({ blogpost }) => {
  const { id, title, text, datePosted, comments } = blogpost;
  return (
      <div className="card mb-4">
    <div className="card-body">
      <h2 className="card-title">
        <Link to={`/viewblog/${id}`}>{title}</Link>
      </h2>
      <p className="card-text">{text.substring(0, 200)}</p>
      <div className="mb-3">
        <small>{comments.length} comment(s)</small>
      </div>
     <Link to ={`/viewblog/${id}`}>
        <button className="btn btn-primary" >Read More →</button>
        </Link> 
        </div>
        <div className="card-footer text-muted">Posted on {format(new Date(datePosted), 'cccc, MMMM Lo, yyyy')}</div>
    </div>
    
  );
};

export default Blogpost;
