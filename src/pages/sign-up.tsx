import AuthForm from "@/components/ui/auth/AuthForm"

export const SignUp = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <AuthForm isSignUp={true}/>
        </div>
    )
}
