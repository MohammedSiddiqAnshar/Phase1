import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="input" placeholder="Name" onChange={e => setName(e.target.value)} />
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button className="btn" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;