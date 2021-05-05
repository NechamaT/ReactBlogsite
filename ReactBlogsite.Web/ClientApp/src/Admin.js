import React, { useState} from "react";
import { produce } from "immer";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Admin = () => {

  const [blogpost, setBlogposts] = useState({title: "", text: ""});
  const history = useHistory();

  const onTextChange = (e) => {
    const copy = {...blogpost};
    copy[e.target.name] = e.target.value;
    setBlogposts(copy);
    };


  const onAddClick = async () => {
    console.log(blogpost)
    await axios.post('/api/blogsite/admin', blogpost);
    history.push("/");
  };

  const { title, text} = blogpost;
  return (
    <div className="container" style={{marginTop:80}}>
      <main className="pb-3">
        <div className="col-md-8 offset-md-2 card card-body bg-light">
          <h3>Add new post</h3>
          <input
            className="form-control"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onTextChange}
          />
          <br />
          <textarea
            name="text"
            placeholder="What's on your mind?"
            className="form-control"
            rows="20"
            value={text}
            onChange={onTextChange}
          ></textarea>
          <br />
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={onAddClick}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
