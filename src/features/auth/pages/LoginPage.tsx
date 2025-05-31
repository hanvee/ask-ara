import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { type RegisterFormSchema, registerFormSchema } from "../forms/register";
import { RegisterFormInnner } from "../components/RegisterFormInner";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from "~/lib/supabase/client";
import { SupabaseAuthErrorCode } from "~/lib/supabase/authErrorCode";
import type { AuthError } from "@supabase/supabase-js";

const LoginPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  const handleSubmit = async (values: RegisterFormSchema) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      await router.replace("/");
    } catch (error) {
      switch ((error as AuthError).code) {
        case SupabaseAuthErrorCode.invalid_credentials:
          form.setError("email", { message: "Email atau password salah" });
          form.setError("password", {
            message: "Email atau password salah",
          });
          break;
        case SupabaseAuthErrorCode.email_not_confirmed:
          form.setError("email", { message: "Email belum diverifikasi" });
          break;
        default:
          toast.error("Sebuah kesalahan terjadi, coba lagi beberapa saat.");
      }
    }
  };

  return (
    <PageContainer>
      <SectionContainer className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center">
        <Card className="w-full max-w-[480px] self-center">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-primary">Sign In</h1>
            <p className="text-muted-foreground">
              Selamat datang kembali! Silakan login untuk melanjutkan
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <RegisterFormInnner
                onRegisterSubmit={handleSubmit}
                buttonText="Masuk"
                showPassword
              />
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Separator />
            <Button variant="secondary" className="w-full" size="lg">
              Masuk dengan Google
            </Button>
            <p>
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-purple-600">
                Daftar
              </Link>
            </p>
          </CardFooter>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};

export default LoginPage;