import './globals.css';
import ProvidersClient from '@/components/ProvidersClient';

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

  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
        {/* All client‑side providers & Navbar now live inside this wrapper */}
        <ProvidersClient initial={initialUsers}>
          {children}
        </ProvidersClient>
      </body>
    </html>
  );
}
