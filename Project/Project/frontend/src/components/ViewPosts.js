// ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace 'userId' with the actual ID of the logged-in user
        const response = await axios.get(`http://localhost:4000/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleBack = () => {
    // Navigate to the /profile route
    navigate('/profile');
  };

  return (
    <div>
      <h2>Your Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.headline}</h3>
          <p>{post.description}</p>
          {/* Additional post details can be displayed here */}
          <hr />
        </div>
      ))}

      {/* Back button */}
      <button onClick={handleBack} style={{ marginTop: '10px' }}>
        Back
      </button>
    </div>
  );
}

export default ViewPosts;
