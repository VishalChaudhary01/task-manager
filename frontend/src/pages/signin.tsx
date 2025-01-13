import { AuthForm } from "@/components/AuthForm"

export const SigninPage = () => {
  return (
    <div className="flex items-center justify-center w-full">
     <div className="w-[370px] max-w-xl border mt-8 p-6 rounded-md shadow-sm">
          <h1 className="text-center text-xl md:text-3xl font-bold text-gray-700 mb-2">Signin</h1>
          <AuthForm />
     </div>
    </div>
  )
}
