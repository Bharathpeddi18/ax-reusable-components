'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXInputPassword from '@/ax-reusable-components/ax-input/ax-input-password/ax-input-password';
import { FormEvent, useState } from 'react';
import bgLogin from '@/assets/images/bg-login.png';
import { useRouter } from 'next/navigation';

export const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {

    // Simulate login for the static page
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard-student');
    }, 1000);
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
          propsClassName="ax-bg-transparent ax-shadow-none ax-border-0"
          propsSize="lg"
          propsHeaderClassName="ax-pb-0 ax-border-0"
          propsHeader={
            <div className="ax-text-center">
              <h1 className="ax-m-0 ax-text-2xl ax-font-bold ax-text-gray-800">
                Welcome Back
              </h1>
              <p className="ax-mt-2 ax-mb-0 ax-text-sm ax-text-gray-100">
                Sign in to continue to your portal.
              </p>
            </div>
          }
          propsBody={
            <div className="ax-flex ax-flex-col ax-gap-4">
              {/* Login */}
              <AXButton
                propsLabel={isLoading ? 'Signing In...' : 'Sign In'}
                propsSize="md"
                propsClassName="ax-bg-secondary ax-text-white ax-rounded-md ax-w-full ax-mt-2"
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