import { PropsWithChildren } from 'react';

interface IProps extends React.ComponentProps<'button'>{
  classnames?: string;
  selected?: boolean;
}

export const IconButton: React.FunctionComponent<PropsWithChildren<IProps>> = ({classnames, children, selected }) => {
  return (
    <button 
      className={`w-12 h-12 my-6 flex justify-center items-center rounded-xl ${classnames} ${selected === true ? 'border border-black-500' : ''}`}
    >
      {children}
    </button>
  );
};
