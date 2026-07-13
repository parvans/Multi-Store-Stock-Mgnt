import { userLogin } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  })
  const [loading,setLoading] = useState(false);

  const handleChange = (e)=>{
    setLoginData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await userLogin(loginData);
      console.log(res);
      login(res.data.user, res.data.token);
      toast.success("Login Successful");
      navigate("/")
    } catch (error) {
      setLoading(false);
      console.error(error.response.data);
      toast.error(error?.response?.data?.message || "Login Failed");
      
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle,#d1d5db_1px,transparent_1px)] bg-size-[20px_20px] p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Multi Store Stock Management
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
              type="password"
              name="password"
              placeholder="************"
              value={loginData.password}
              onChange={handleChange}
              required
              />
            </div>
            <Button type="submit" className='w-full' disabled={loading}>
              {loading ? <Spinner/> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
