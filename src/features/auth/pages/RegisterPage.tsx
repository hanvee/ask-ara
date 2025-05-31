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

const RegisterPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: registerUser, isPending: registerUserIsPending } =
    api.auth.register.useMutation({
      onSuccess: () => {
        toast("Berhasil buat akun!");
        form.setValue("email", "");
        form.setValue("password", "");
      },
      onError: () => {
        toast.error("Gagal buat akun, coba beberapa saat lagi");
      },
    });

  const handleSubmit = (data: RegisterFormSchema) => {
    registerUser(data);
  };

  return (
    <PageContainer>
      <SectionContainer className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center">
        <Card className="w-full max-w-[480px] self-center">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-primary">Buat Akun</h1>
            <p className="text-muted-foreground">
              Buat akun baru untuk memulai perjalananmu bersama ask-ara
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <RegisterFormInnner
                onRegisterSubmit={handleSubmit}
                isLoading={registerUserIsPending}
                showPassword
              />
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Separator />
            <Button variant="secondary" className="w-full" size="lg">
              Buat Akun dengan Google
            </Button>
            <p>
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-purple-600">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};

export default RegisterPage;
