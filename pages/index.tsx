import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '@/components/Layout';
import { fetcher } from '@/helpers/fetcher';
import { User } from '@/models/User';
import { UserCard } from '@/components/molecules/UserCard';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import t from '@/public/locales/en/users.json';

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const getServerSideProps: GetServerSideProps = async () => {
  const users: User[] = await fetcher(apiUrl);

  return {
    props: {
      users
    }
  };
};

export default function Home({ users }: { users: User[] }) {
  const role = (role: 'ADMIN' | 'DEV') => (role === 'ADMIN' ? t.administrator : t.devUser);

  return (
    <>
      <Head>
        <title>Our users</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo_prediko.svg' />
      </Head>
      <main>
        <Layout>
          <div className='mt-10 mx-32'>
            <h2 className='font-bold text-title text-darkGrey'>{t.title}</h2>
            <div className='my-8 h-14 flex flex-row justify-between'>
              <div className='p-5 w-80 flex flex-row items-center bg-white shadow-xs drop-shadow-xs rounded-2xl'>
                <div>
                  <MagnifyingGlassIcon className='w-6 text-darkGrey' />
                </div>
                <span className='ml-4 text-darkGrey text-text font-medium'>{t.search}</span>
              </div>
              <Link href='user/new'>
                <button className='p-3 w-fit flex flex-row items-center bg-white shadow-xs drop-shadow-xs rounded-2xl'>
                  <div className='w-9 h-9 flex justify-center items-center rounded-xl bg-blue'>
                    <PlusIcon className='w-5 text-white' />
                  </div>
                  <span className='ml-4 text-darkGrey text-text font-medium'>{t.addUser}</span>
                </button>
              </Link>
            </div>
            <div className='my-11 w-full grid grid-cols-3 gap-x-7 gap-y-11'>
              {users.map((user) => (
                <UserCard username={`${user.first_name} ${user.last_name}`} role={user.role && role(user.role)} key={user.id} href={`/user/${user.id}`}/>
              ))}
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
