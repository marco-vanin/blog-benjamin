"use client";

import { signInWithCredentials } from "@/actions/auth";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

const SigninPage = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentials}
  />
);
export default SigninPage;
