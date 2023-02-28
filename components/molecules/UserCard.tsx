import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@/components/atoms/IconButton';

interface IProps {
  href?: string;
  username: string;
  role?: string;
}

export const UserCard = ({ href = '/', username, role }: IProps) => {
  return (
    <Link href={href}>
      <div className='py-6 px-7 min-h-20 flex flex-row items-center justify-between bg-white shadow-xs drop-shadow-xs rounded-xl'>
        <div className='flex flex-col'>
          <p className='text-darkGrey text-titleCard font-semibold'>{username}</p>
          <p className='text-grey text-smallText font-normal'>{role}</p>
        </div>
          <IconButton classnames='w-6 h-6 bg-brown rounded-full'>
            <ChevronRightIcon className='w-4 text-white' />
          </IconButton>
      </div>
    </Link>
  );
};
