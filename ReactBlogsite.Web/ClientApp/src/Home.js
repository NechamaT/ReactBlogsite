import React, { useState, useEffect } from "react";
import axios from "axios";
import Blogpost from "./Blogpost";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      const { data } = await axios.get("api/blogsite/getall");
      setBlogposts(data);
    };
    getPeople();
  }, []);

  return(
      <div>
          {blogposts.map(bp => <Blogpost blogpost={bp} key={bp.Id}/>)}
      </div>
  )
};

export default Home;
