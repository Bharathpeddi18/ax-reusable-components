export const getCurrentUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
};