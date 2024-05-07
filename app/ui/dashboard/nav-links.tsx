'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CurrencyEuroIcon,
  FolderIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { 
    name: 'Home', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
  { 
    name: 'Projects',
    href: '/dashboard/projects', 
    icon: FolderIcon
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: CurrencyEuroIcon,
  },
  { 
    name: 'Customers',
    href: '/dashboard/customers', 
    icon: UserGroupIcon 
  },
  {
    name: 'Tracker',
    href: '/dashboard/tracker',
    icon: ClockIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-sky-100 bg-opacity-95 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-800': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
