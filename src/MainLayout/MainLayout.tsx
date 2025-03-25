import { FC, PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

type MainLayoutProps = PropsWithChildren<{}>;

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={cn(
      "min-h-screen bg-white",
      "container mx-auto px-4 py-8"
    )}>
      {children}
    </div>
  );
};
