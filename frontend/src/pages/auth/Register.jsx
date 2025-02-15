import { register } from "@/backend/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      await register({
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already have an account? <Link to="/login">Login</Link>
          </CardDescription>
        </CardHeader>

        {error && (
          <Alert>
            Error: {error}
          </Alert>
        )}

        <div>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" required />

            <Label htmlFor="username">Username</Label>
            <Input id="username" type="username" placeholder="Username" required />

            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" required />

            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input id="repeatPassword" type="password" placeholder="Repeat Password" required />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </Card>

    </div>
  );
}
