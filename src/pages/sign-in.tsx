import AuthForm from "@/components/ui/auth/AuthForm"

export const SignIn = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <AuthForm isSignUp={false}/>
        </div>
    )
}