"use client";

import { signUp } from "@/actions/auth";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const SignupPage = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      username: "",
      email: "",
      password: "",
    }}
    onSubmit={signUp}
  />
);
export default SignupPage;
