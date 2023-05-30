import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Post from "./Post"

function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/posts')
            .then((response)=>{
                setPosts(response.data.data.docs)
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [])

    return (
        <div>
            {posts.map((post)=><Post key={post.id} id={post.id} />)}
        </div>
    )
}

export default Feed