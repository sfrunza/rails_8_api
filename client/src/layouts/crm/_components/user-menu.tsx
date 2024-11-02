import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/slices/auth-slice';
// import { logout } from '@/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

function getInitials(
  firstName: string | undefined,
  lastName: string | undefined
) {
  if (!firstName || !lastName) return '';
  return `${firstName[0]}${lastName[0]}`;
}

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="hover:cursor-pointer">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>
              {getInitials(user?.first_name, user?.last_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-3">
        <div className="mb-2">
          <p className="font-semibold">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
