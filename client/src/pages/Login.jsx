import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
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
          <form className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
              type="password"
              name="password"
              placeholder="************"
              required
              />
            </div>
            <Button className='w-full'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
