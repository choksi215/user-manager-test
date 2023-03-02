import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Layout } from '@/components/Layout';
import { IconButton } from '@/components/atoms/IconButton';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Label } from '@/components/atoms/Label';
import { useUsers } from '@/hooks/useUsers';
import { UserCreate } from '@/models/User';

import t from '@/public/locales/en/userDetails.json';

const options: { label: string; value: string }[] = [
  {
    label: 'Administrator',
    value: 'ADMIN'
  },
  {
    label: 'Regular user',
    value: 'DEV'
  }
];

export default function AddUserPage() {
  const { addUser } = useUsers();

  const { register, handleSubmit, reset } = useForm<UserCreate>();

  const onSubmitHandler: SubmitHandler<UserCreate> = (data) => {
    addUser(data);
    reset();
    Router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add new user</title>
        <meta name='description' content='New user page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo_prediko.svg' />
      </Head>
      <main>
        <Layout>
          <form className='h-full' onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='mb-10 p-8 flex flex-row justify-between bg-white rounded-xl'>
              <div className='flex flex-row items-center'>
                <Link href='/'>
                  <IconButton classnames='w-6 h-6 my-0 bg-brown rounded-full'>
                    <ChevronLeftIcon className='w-4 text-white' />
                  </IconButton>
                </Link>
                <h2 className='ml-9 font-bold text-title text-darkGrey drop-shadow-xs'>{t.title}</h2>
              </div>
              <button className='h-12 my-6 py-3.5 px-4 bg-green font-medium rounded-xl text-white' type='submit'>
                {t.submit}
              </button>
            </div>
            <div className='py-8 px-14 h-[76%] bg-white rounded-xl h-auto'>
              <span className='text-subtitle text-darkGrey font-bold'>{t.subtitle}</span>
              <div className='max-w-[80%] mt-8 grid grid-cols-3 gap-y-8 gap-x-28'>
                <div className='flex flex-col'>
                  <Label label={t.firstName} htmlFor='firstName' />
                  <input
                    id='firstName'
                    placeholder='Insert first name'
                    required
                    className='p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light'
                    {...register('firstName')}
                  />
                </div>
                <div className='flex flex-col'>
                  <Label label={t.lastName} htmlFor='lastName' />
                  <input
                    id='lastName'
                    placeholder='Insert last name'
                    required
                    className='p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light'
                    {...register('lastName')}
                  />
                </div>
                <div className='flex flex-col'>
                  <Label label={t.email} htmlFor='email' />
                  <input
                    id='email'
                    placeholder='Insert email address'
                    type='email'
                    className='p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light'
                    {...register('email')}
                  />
                </div>
                <div className='flex flex-col'>
                  <Label label={t.role} htmlFor='role' />
                  <select
                    id='role'
                    defaultValue={''}
                    className='p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light'
                    {...register('role')}
                  >
                    <option value=''>{t.rolePlaceholder}</option>
                    {options.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </Layout>
      </main>
    </>
  );
}