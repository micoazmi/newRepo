import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export async function handleLogout() {
    const router = useRouter();
    Cookies.remove('Authorization');
    router.push('/login');
  }