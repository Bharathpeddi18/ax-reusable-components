'use client';
import './login.css'

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXInputPassword from '@/ax-reusable-components/ax-input/ax-input-password/ax-input-password';
import { useState } from 'react';
import bgLogin from '@/assets/images/bg-login.png';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from './me';
import { ROUTERS_PATHS } from '../../../global-config';

export const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (email: string, password: string) => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    if (!validate(cleanedEmail, cleanedPassword)) return;

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',

          body: JSON.stringify({
            email: cleanedEmail,
            password: cleanedPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.detail);
        return;
      }

      console.log('Login successful:', data);
      router.push(ROUTERS_PATHS.dashboardStudent)

    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }

    const user = await getCurrentUser();
    console.log('user: ', user)
  };

  return (
    <main 
      className="ax-h-screen ax-w-screen ax-flex ax-items-center ax-justify-center ax-p-4"
      style={{
        backgroundImage: `url(${bgLogin.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="ax-w-full ax-max-w-md">
        <AXCard
          propsClassName="ax-bg-white"
          propsSize="lg"
          propsHeaderClassName="ax-pb-0 ax-border-0"
          propsBodyClassName='ax-login-h'
          propsHeader={
            <>
            <div className="ax-flex ax-flex-col ax-gap-1 ax-items-center">
              <img
                src={ApplicationLogo.src}
                alt="AstraX Logo"
                width={60}
                height={60}
                className=""
              />
              <span className="ax-text-sm ax-text-gray-600 ax-font-medium ax-line-clamp-1">AstraX</span>
              <p className="ax-text-sm ax-text-gray-600">
                Sign in to continue to your portal.
              </p>
            </div>
            </>
          }
          propsBody={
            <div className="ax-flex ax-flex-col ax-gap-1">
              <div className="ax-flex ax-flex-col ax-gap-2">
                <div className="ax-flex ax-flex-col">
                  <AXInputText
                    propsLabel="Email Address"
                    propsPlaceholder="name@example.com"
                    propsClassName="ax-w-full"
                    propsValue={email}
                    propsOnChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) {
                        setErrors((prev) => ({
                          ...prev,
                          email: undefined,
                        }));
                      }
                    }}
                    propsHasError={!!errors.email}
                    propsErrorMessage={errors.email}
                  />
                </div>
                <div className="ax-flex ax-flex-col ax-gap-1">
                  <div className="ax-flex ax-flex-col">
                    <AXInputPassword
                      propsLabel="Password"
                      propsPlaceholder="Enter your password"
                      propsClassName="ax-w-full"
                      propsValue={password}
                      propsOnChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) {
                          setErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }));
                        }
                      }}
                      propsHasError={!!errors.password}
                      propsErrorMessage={errors.password}
                    />
                  </div>
                  <div className="ax-flex ax-justify-end ax-w-full ax-mt-1">
                    <Link 
                      href="/forgot-password" 
                      className="ax-text-sm ax-font-medium ax-text-blue-500 hover:ax-text-blue-700 ax-transition-colors ax-cursor-pointer"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              {/* Login */}
              <AXButton
                propsLabel={isLoading ? 'Signing In...' : 'Sign In'}
                propsSize="md"
                propsClassName="ax-bg-coral ax-text-white ax-rounded-md ax-w-full ax-mt-2 hover:ax-opacity-90 ax-transition-opacity"
                propsDisabled={isLoading}
                propsLoading={isLoading}
                onClick={() => {
                  handleLogin();
                }}  
              />
            </div>
          }
        />
      </div>
    </main>
  );
};

export default Login;