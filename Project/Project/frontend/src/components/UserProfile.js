//UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const name=props.obj.name;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post('http://localhost:4000/user/allUsers', {
          name: user && user.name,
          email: user && user.email,
        });

        // Log the entire response to check the structure
        console.log('User Info Response:', response);

        // Check if the response has data and a name property
        if (response.data && response.data.name) {
          setUser(response.data);

          // Log user name to console after setting the user data
          console.log('User Name:', response.data.name);
        } else {
          console.error('Invalid user information response:', response);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    // Fetch user info only if the user is not already set
    if (!user) {
      fetchUserInfo();
    }
  }, [user]);

  const submitNewsArticle = () => {
    // Logic to submit the news article
    // ...

    alert('News article submitted successfully!');
  };

  const handleLogout = () => {
    // Logout logic
    navigate('/');
  };

  const handleViewPosts = () => {
    // Navigate to the ViewPosts component
    navigate('/view-posts');
  };

  return (
    <div>
      <h2>Welcome {name}!</h2>

      {/* ViewPosts button */}
      <button
        onClick={handleViewPosts}
        style={{ height: '30px', width: '120px', backgroundColor: 'lightgreen', color: 'red' }}
      >
        <b>View Posts</b>
      </button>

      {/* Logout button */}
      <button
        style={{ marginLeft: '10px', height: '30px', width: '100px', backgroundColor: 'red', color: 'yellow' }}
        onClick={handleLogout}
      >
        <b>Logout</b>
      </button>

      {/* News article submission form */}
      <div style={{ border: '2px solid green', padding: '10px', marginTop: '20px' }}>
        <h2>Submit News Article</h2>
        <label>Headline:</label>
        <input
          type="text"
          style={{ width: '90%' }}
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Description:</label>
        <textarea
          value={description}
          style={{ width: '90%' }}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Upload Image:</label>
        <input type="file" accept="image/*" style={{ width: '90%' }} />
        <br />
        <br />
        <button
          onClick={submitNewsArticle}
          style={{ height: '30px', width: '120px', backgroundColor: 'blue', color: 'white' }}
        >
          <b>Submit Article</b>
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
