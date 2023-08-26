import { FC, PropsWithChildren } from 'react';
import styles from './MainLayout.module.css';
export const _MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
