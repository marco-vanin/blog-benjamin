"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES } from "../../constants/index.constants";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "Connecté avec succès"
          : "Compte créé avec succès",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1>{isSignIn ? "Connectez-vous ! " : "Créer un compte"}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit">
            {isSignIn ? "Se connecter" : "S'inscrire"}
          </Button>
        </form>
      </Form>

      <p>
        {isSignIn
          ? "Vous n'avez pas de compte ?"
          : "Vous avez déjà un compte ?"}

        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
          {isSignIn ? "Créer un compte" : "Connectez-vous"}
        </Link>
      </p>
    </div>
  );
};
export default AuthForm;
