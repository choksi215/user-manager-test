import useSWR from 'swr';

import { fetcher } from '@/helpers/fetcher';
import { User, UserInput, UserCreate } from '@/models/User';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UseUsersOutput {
  users: User[];
  isFetching: boolean;
  isError: boolean;
  addUser: (newUser: UserCreate) => Promise<void>;
  updateUser: (id: string, updateUserData:UserInput) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

interface ViewUsersOutput {
  user: UserInput;
  isFetching: boolean;
  isError: boolean;
}

export const useUsers = (): UseUsersOutput => {
  const { data, error } = useSWR(apiUrl, fetcher);

  const addUser = async (newUser: UserCreate) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      })
    };

    await fetcher(`${apiUrl}`, requestOptions);
  };

  const updateUser = async (id:string, updateUserData: UserInput) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: updateUserData.id,
        first_name: updateUserData.first_name,
        last_name: updateUserData.last_name,
        email: updateUserData.email,
        role: updateUserData.role
      })
    };

    await fetcher(`${apiUrl}${id}`, requestOptions);
  };

  const deleteUser = async (id:string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetcher(`${apiUrl}${id}`, requestOptions);
  };

  return { users: data || [], isFetching: !error && !data, isError: error, addUser, updateUser, deleteUser };
};

export const getUser = (id: string): ViewUsersOutput => {
  const { data, error } = useSWR(`${apiUrl}${id}`, fetcher);

  return { user: data || [], isFetching: !error && !data, isError: error };
}
