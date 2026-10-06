'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { USER_ROLES } from '../../../global-config';

type UserRole = (typeof USER_ROLES)[number];

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

interface User {
  id: number;
  email: string;
  group_code: UserRole;
}

const AuthGuard = ({
  children,
  allowedRoles,
}: AuthGuardProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          router.replace('/login');
          return;
        }

        const data = await response.json();

        const currentUser: User = data.user;

        if (
          allowedRoles &&
          !allowedRoles.includes(currentUser.group_code)
        ) {
          router.replace('/unauthorized');
          return;
        }

        setUser(currentUser);

      } catch (error) {
        console.error(
          'Authentication check failed:',
          error
        );

        router.replace('/login');

      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();

  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="ax-flex ax-h-screen ax-items-center ax-justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;