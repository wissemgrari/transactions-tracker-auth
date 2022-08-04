import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth() {
  const { user } = useSelector((state) => state.auth);
  return user?.token ? <Outlet /> : <Navigate to='/signin' />;
}
export default RequireAuth;
