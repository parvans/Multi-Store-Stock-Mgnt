import AuthContext from "@/context/Authcontext"
import { useContext } from "react"


const useAuth = ()=>{
    return useContext(AuthContext);
}

export default useAuth;