/**
 * Auth Form
 * 
 * This component is used to render the auth form.
 * It includes a sign in form and a sign up form.
 * It also includes a toggle button to switch between the two forms.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '@/hooks/auth/use-register';
import type { SignInDTO, SignUpDTO } from '@/types/types';
import { useAuthenticate } from '@/hooks/auth/use-authenticate';
import { signInSchema, signUpSchema } from './auth-schemas';

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

export const AuthForm = (props: { isSignUp: boolean }) => {
  // States
  const [isSignUp, setIsSignUp] = useState(props.isSignUp); // State to toggle between sign in and sign up
  const [showPassword, setShowPassword] = useState(false); // State to show/hide password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to show/hide confirm password
  const [isLoading, setIsLoading] = useState(false); // State to show/hide loading spinner
  const [error, setError] = useState(''); // State to show/hide error message

  // Forms
  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      },
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Current form
  const currentForm = isSignUp ? signUpForm : signInForm;

  //Hooks to handle the sign up and sign in
  const onError = (error: any) => {
    console.log("error", error);
    setError("Authentication failed. Please try again.");
  }
  const register = useRegister(onError);
  const authenticate = useAuthenticate(onError);

  
  // On submit
  const onSubmit = async (data: SignInData | SignUpData) => {
    setIsLoading(true);
    try {
      // If the form is sign up, we need to create a new user
      if (isSignUp && 'name' in data) { // Check if the form is sign up and if the data has a name
        const dto: SignUpDTO = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
        register.mutate(dto);

      } else {
        // If the form is sign in, we need to authenticate the user
        const dto: SignInDTO = {
          username: data.email,
          password: data.password,
        };
        authenticate.mutate(dto);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between sign in and sign up
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    signInForm.reset();
    signUpForm.reset();
  };

  return (
    // Card to wrap the form
    <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-white/20 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isSignUp ? 'Create account' : 'Welcome back'}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {isSignUp 
            ? 'Enter your information to create your account'
            : 'Enter your credentials to access your account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form to handle the sign up and sign in */}
        <form onSubmit={currentForm.handleSubmit(onSubmit)} className="space-y-4">
          {/* Error message */}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* If the form is sign up, we need to show the name input */}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 h-11"
                  {...signUpForm.register('name')}
                  disabled={isLoading}
                />
              </div>
              {signUpForm.formState.errors.name && (
                <p className="text-sm text-red-600">{signUpForm.formState.errors.name.message}</p>
              )}
            </div>
          )}

          {/* Email input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10 h-11"
                {...(isSignUp ? signUpForm.register('email') : signInForm.register('email'))}
                disabled={isLoading}
              />
            </div>
            {currentForm.formState.errors.email && (
              <p className="text-sm text-red-600">{currentForm.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="pl-10 pr-10 h-11"
                {...(isSignUp ? signUpForm.register('password') : signInForm.register('password'))}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {currentForm.formState.errors.password && (
              <p className="text-sm text-red-600">{currentForm.formState.errors.password.message}</p>
            )}
           
          </div>

          {/* If the form is sign up, we need to show the confirm password input */}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-11"
                  {...signUpForm.register('confirmPassword')}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-600">{signUpForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          {/* Submit button */}
          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </>
            ) : (
              isSignUp ? 'Create account' : 'Sign in'
            )}
          </Button>
        </form>

        {/* Toggle button to switch between sign in and sign up */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          </span>
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm font-semibold" 
            onClick={toggleMode}
            disabled={isLoading}
          >
            <Link to={isSignUp ? '/sign-in' : '/sign-up'}>
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}