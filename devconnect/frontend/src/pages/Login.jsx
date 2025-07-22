import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
