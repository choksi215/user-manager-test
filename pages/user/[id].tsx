import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Layout } from '@/components/Layout';
import { IconButton } from '@/components/atoms/IconButton';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import { getUser, useUsers } from '@/hooks/useUsers';
import { UserInput } from '@/models/User';

import t from '@/public/locales/en/userDetails.json';

const Component = () => {
  const router = useRouter()
  const { id: userId } = router.query

  const { deleteUser } = useUsers();

  const { user: user, isError: isError } = getUser(userId as string);

  const { register, handleSubmit, setValue, reset } = useForm<UserInput>();

  const onClick = () => {
    deleteUser(userId as string);
    reset();
    router.push('/');
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
          <form onSubmit={handleSubmit(()=> console.log('updated'))} className="p-5 h-screen">
          <div className='mb-10 p-8 flex flex-row justify-between bg-white rounded-xl'>
              <div className='flex flex-row items-center'>
                <Link href='/'>
                  <IconButton classnames='w-6 h-6 my-0 bg-brown rounded-full'>
                    <ChevronLeftIcon className='w-4 text-white' />
                  </IconButton>
                </Link>
                <h2 className='ml-9 font-bold text-title text-darkGrey drop-shadow-xs'>{t.title}</h2>
              </div>
              <div className="flex justify-start pt-6">
                <button
                  type="button"
                  className="py-3.5 px-4 bg-red font-medium rounded-xl text-text text-white"
                  onClick={() => onClick()}
                >
                  {t.deleteUser}
                </button>
              </div>
            </div>
            <div className="py-8 px-14 h-[76%] bg-white rounded-xl">
              <div className="max-w-[80%] mt-8 grid grid-cols-3 gap-y-8 gap-x-28">
                <div className="flex flex-col justify-center">
                  <label htmlFor="first_name">{t.firstName}</label>
                  <input
                    {...register("first_name", { required: true, maxLength: 20 })}
                    className="p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light"
                    disabled
                    onChange={(e) => {
                      setValue("first_name", e.target.value);
                    }}
                    defaultValue={user.first_name}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="last_name">{t.lastName}</label>
                  <input
                    {...register("last_name", {
                      pattern: /^[A-Za-z]+$/i,
                      required: true,
                    })}
                    disabled
                    className="p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light"
                    onChange={(e) => {
                      setValue("last_name", e.target.value);
                    }}
                    defaultValue={user.last_name}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="email">{t.email}</label>
                  <input
                    {...register("email", { required: true })}
                    disabled
                    type="email"
                    className="p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light"
                    onChange={(e) => {
                      setValue("email", e.target.value);
                    }}
                    defaultValue={user.email}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="role">{t.role}</label>
                  <select
                    {...register("role")}
                    disabled
                    className="p-3.5 rounded border-lightGrey border-solid border-2 text-grey text-text font-light"
                    onChange={(e) => {
                      setValue("role", e.target.value);
                    }}
                    defaultValue={user.role}
                  >
                    <option value="ADMIN">{t.admin}</option>
                    <option value="DEV">{t.dev}</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </Layout>
      </main>
    </>
  )
}

export default Component