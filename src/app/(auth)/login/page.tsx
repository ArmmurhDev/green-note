
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Notebook } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
      <Card className="max-w-sm mx-auto">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Notebook className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="text-2xl">Login to GreenNotes</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}
