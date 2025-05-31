import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { type RegisterFormSchema } from "../forms/register";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

type RegisterFormInnnerProps = {
  onRegisterSubmit: (values: RegisterFormSchema) => void;
  isLoading?: boolean;
  buttonText?: string;
  showPassword?: boolean;
};

export const RegisterFormInnner = (props: RegisterFormInnnerProps) => {
  const form = useFormContext<RegisterFormSchema>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form
      onSubmit={form.handleSubmit(props.onRegisterSubmit)}
      className="space-y-8"
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email " placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                {...field}
                placeholder="Enter your password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {props.showPassword && (
        <Label className="mt-4 flex items-center gap-2">
          <Checkbox
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(!!checked)}
          />
          Show Password
        </Label>
      )}

      <Button disabled={props.isLoading} size="lg" className="mt-4 w-full">
        {props.buttonText ?? "Buat Akun"}
      </Button>
    </form>
  );
};
