import { FC, PropsWithChildren } from 'react';
import s from './MainLayout.module.css';

type MainLayoutProps = PropsWithChildren<{}>;

export const _MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};
