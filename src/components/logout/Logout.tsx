import { useLogout } from '../../hooks/useLogout';

export const Logout = () => {
  const { logout } = useLogout();
  return (
    <button type="button" onClick={() => logout()}>
      Logout
    </button>
  );
};
