import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export const Login = () => {
  const { login } = useLogin();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password });
          setEmail('');
          setPassword('');
        }}
      >
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
