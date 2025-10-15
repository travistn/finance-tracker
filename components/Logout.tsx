import { signOut } from 'next-auth/react';

import Button from './Button';

const Logout = () => {
  return <Button onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>Logout</Button>;
};

export default Logout;
