import { useState } from 'react';
import { useRegistration } from '../../hooks/useRegistration';

export const Registration = () => {
  const { registration } = useRegistration();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Registrace</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registration({ displayName, email, password });
          setDisplayName('');
          setEmail('');
          setPassword('');
        }}
      >
        <input
          type="text"
          placeholder="Uživatelské jméno"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Registrovat</button>
      </form>
    </div>
  );
};
