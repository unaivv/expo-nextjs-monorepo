"use client";

import { Button } from "@acme/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@acme/ui/components/card";
import { Input } from "@acme/ui/components/input";
import { Label } from "@acme/ui/components/label";
import { Checkbox } from "@acme/ui/components/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Card style={{ minWidth: '384px' }}>
        <CardHeader>
          <CardTitle style={{ 
            fontSize: '20px',
          }}>Sign In</CardTitle>
          <CardDescription style={{ 
            fontSize: '14px',
          }}>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gap: '8px' }}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  style={{
                    marginLeft: 'auto',
                    display: 'inline-block',
                    fontSize: '14px',
                    textDecoration: 'underline',
                  }}
                >
                  Forgot your password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                id="remember"
                onClick={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button
              type="submit"
              style={{ width: '100%' }}
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.email(
                  {
                    email,
                    password,
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              }}
            >
              {loading ? (
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <p> Login </p>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
