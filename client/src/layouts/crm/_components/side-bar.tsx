import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { navLinks } from './navLinks';

export default function SideBar() {
  const { pathname } = useLocation();

  return (
    <nav className="mt-6">
      <ul role="list" className="flex flex-col items-center space-y-4">
        {navLinks.map((item, i) => {
          const isCurrentPage = pathname.includes(item.href);
          return (
            <li key={i}>
              <Button
                asChild
                size="icon"
                variant={isCurrentPage ? 'outline' : 'ghost'}
                className={cn(
                  'size-10 rounded-[36%]',
                  !isCurrentPage && 'text-white'
                )}
              >
                <Link to={item.href}>
                  <item.icon className="size-5" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
