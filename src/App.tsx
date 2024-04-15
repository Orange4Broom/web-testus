import { ToastContainer } from 'react-toastify';
import { Login } from './components/login/Login';
import { Logout } from './components/logout/Logout';
import { useAuthContext } from './hooks/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from './components/table/Table';
import { useState } from 'react';
import { Registration } from './components/registration/Registration';

export const App = () => {
  const { state } = useAuthContext();
  const [login, setLogin] = useState<Boolean>(true);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
      <div>
        <h1>Aplikace</h1>

        {state.user ? (
          <>
            <h2>{state.user.email}</h2>
            <Logout />
            <Table />
          </>
        ) : (
          <>
            {login ? (
              <>
                <button onClick={() => setLogin(!login)}>Registrovat se</button>
                <p>Přihlašovací údaje:</p>
                <p>admin@admin.cz</p>
                <p>admin1234</p>

                <Login />
              </>
            ) : (
              <>
                <button onClick={() => setLogin(!login)}>Login</button>
                <Registration />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
