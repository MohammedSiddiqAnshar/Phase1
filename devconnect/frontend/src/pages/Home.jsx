import { useEffect, useState } from 'react';
import axios from 'axios';
import '/src/App.css'
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Feed</h1>
      {posts.map(post => (
        <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{post.userId.name}</h2>
          <p className="text-gray-700">{post.content}</p>
          {post.image && <img src={`http://localhost:5000/${post.image}`} alt="post" className="mt-2 rounded" />}
        </div>
      ))}
    </div>
  );
}

export default Home;
