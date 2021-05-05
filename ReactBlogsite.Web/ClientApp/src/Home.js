import React, { useState, useEffect } from "react";
import axios from "axios";
import Blogpost from "./Blogpost";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';




const Home = () => {
  const [blogposts, setBlogposts] = useState([]);
  const [lastPage, setLastPage]=useState('');
  const params =useParams();
  let {page} = params;
  if(page == undefined){
    page=1
  }

  page =parseInt(page);

  

  useEffect(() => {
  const getPosts = async () => {
   const { data } = await axios.get(`api/blogsite/getall?page=${page}`);   
   setBlogposts(data)

   const last =await axios.get("api/blogsite/getlastpage");  
   setLastPage(last.data);
  }

    getPosts();
  }, []);



  return(
      <div>
          {blogposts.map(bp => <Blogpost blogpost={bp} key={bp.Id}/>)}
          <ul className="pagination justify-content-center mb-4">
                {page < lastPage -1  && <li className="page-item">
                    <Link to={`/Page/${page +1}` }className="page-link" >← Older</Link>
                </li>}
                {page > 1 && <li className="page-item">
                <Link to={`/Page/${page - 1}`} className='nav-link text-light'>
                        <button className='page-link'> Newer → </button>
                    </Link>
                </li>}
            </ul>
   
</div>
  )
};

export default Home;
