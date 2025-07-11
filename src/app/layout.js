import './globals.css';
import ProvidersClient from '@/components/ProvidersClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

//  ─────────────────────────────────────────────────────
//  Server component: fetch users once, before first paint
//  ─────────────────────────────────────────────────────
export default async function RootLayout({ children }) {
  // Server‑side fetch; no hooks here
  const res  = await fetch('https://dummyjson.com/users?limit=20', {
    cache: 'no-store',   // disable cache during dev; remove in prod if desired
  });
  const data = await res.json();
  const initialUsers = data.users || [];

  // Get the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
        {/* All client‑side providers & Navbar now live inside this wrapper */}
        <ProvidersClient initial={initialUsers} session={session}>
          {children}
        </ProvidersClient>
      </body>
    </html>
  );
}