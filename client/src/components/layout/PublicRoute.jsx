import useAuth from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom';

export default function PublicRoute({children}) {
    const {user} = useAuth();
    if(user){
        return <Navigate to="/" replace/>
    }
  return children
}
