import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => setUser(res.data));
  }, [id]);

  return (
    <div className="p-4">
      {user && (
        <div className="bg-white p-6 rounded shadow">
          <img src={`http://localhost:5000/${user.avatar}`} alt="avatar" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>{user.bio}</p>
          <div className="mt-2">
            <strong>Skills:</strong> {user.skills.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;