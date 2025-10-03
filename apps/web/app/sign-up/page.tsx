"use client";

import { Button } from "@hastee-xplat/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hastee-xplat/ui/components/card";
import { Input } from "@hastee-xplat/ui/components/input";
import { Label } from "@hastee-xplat/ui/components/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Card style={{ 
        zIndex: 50,
        borderRadius: '6px',
        minWidth: '384px',
      }}>
        <CardHeader>
          <CardTitle style={{
            fontSize: '20px',
          }}>Sign Up</CardTitle>

          <CardDescription style={{
            fontSize: '14px',
          }}>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="first-name">First name</Label>

                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </div>

              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="last-name">Last name</Label>

                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </div>
            </div>

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
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              <Label htmlFor="password">Confirm Password</Label>

              <Input
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              <Label htmlFor="image">Profile Image (optional)</Label>

              <div style={{ display: 'flex', alignItems: 'end', gap: '16px' }}>
                {imagePreview && (
                  <div style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ width: '100%' }}
                  />

                  {imagePreview && (
                    <X
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setImage(null);

                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              style={{ width: '100%' }}
              disabled={loading}
              onClick={async () => {
                await authClient.signUp.email({
                  email,

                  password,

                  name: `${firstName} ${lastName}`,

                  image: image ? await convertImageToBase64(image) : "",

                  callbackURL: "/dashboard",

                  fetchOptions: {
                    onResponse: () => {
                      setLoading(false);
                    },

                    onRequest: () => {
                      setLoading(true);
                    },

                    onError: (ctx) => {
                      console.error(ctx.error.message);
                    },

                    onSuccess: async () => {
                      router.push("/dashboard");
                    },
                  },
                });
              }}
            >
              {loading ? (
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            borderTop: '1px solid var(--border)',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}>
            <p style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#737373',
            }}>
              Secured by <span style={{ color: '#fb923c' }}>better-auth.</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
