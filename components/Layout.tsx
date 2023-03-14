import Image from 'next/image';
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon, UsersIcon, UserPlusIcon } from '@heroicons/react/24/outline';

import { IconButton } from './atoms/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Layout = ({ children }: any) => {
  const router = useRouter()
  const path = router.pathname
  
  return (
    <div className='min-h-screen grid grid-cols-[100px_minmax(900px,_1fr)]'>
      <div className='pt-6 pb-6 px-6 flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <div className='mb-7 flex justify-center'>
            <Image src='/logo_prediko.svg' alt='prediko logo' width={30} height={30} />
          </div>
          <Link href='/'>
            <IconButton selected={path=== '/'? true : false}>
              <UsersIcon className='w-6 h-6 text-mediumGrey' />
            </IconButton>
          </Link>
          <Link href='/user/new'>
            <IconButton selected={path=== '/user/new'? true : false}>
              <UserPlusIcon className='w-6 h-6 text-mediumGrey' />
            </IconButton>
          </Link>
          <IconButton>
            <Cog8ToothIcon className='w-6 h-6 text-mediumGrey' />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <ArrowLeftOnRectangleIcon className='w-6 h-6 text-mediumGrey' />
          </IconButton>
        </div>
      </div>
      <div className='bg-grey py-5 px-5'>{children}</div>
    </div>
  );
};
