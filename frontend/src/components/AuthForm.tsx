import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/auth.provider";
import { signinSchema, SigninType, signupSchema, SignupType } from "@/types/user.type";

export const AuthForm = () => {
  const { handleSignin, handleSignup } = useAuthContext();
  const location = useLocation();
  const authAction = (location.pathname === "/signin") ? "signin" : "signup";
  
  const form = useForm<SignupType | SigninType>({
    resolver: zodResolver(authAction === "signup" ? signupSchema : signinSchema),
    defaultValues: authAction==="signup" ? {
      name: "",
      email: "",
      password: "",
    } : {
      email: "", 
      password: ""
    },
  });
 
  async function onSubmit(values: SignupType | SigninType) {
    if (authAction === "signup") {
      await handleSignup(values as SignupType);
    } else {
      await handleSignin(values as SigninType);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {authAction === "signup" && <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email id" {...field} />
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
                <Input placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="my-2">{authAction === "signup" ? "Signup" : "Signin"}</Button>
      </form>
      <span className="text-gray-700">
        {authAction === "signup" ? (
          <span>Already have an account? <Link to={"/signin"} className="text-base font-medium">Signin</Link></span>
        ) : (
          <span>Don&apos;t have an account? <Link to={"/signup"} className="text-base font-medium">Signup</Link></span>
        )}
      </span>
    </Form>
  )
}