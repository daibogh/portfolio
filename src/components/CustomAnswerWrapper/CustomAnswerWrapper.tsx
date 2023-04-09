import { FC, PropsWithChildren, useLayoutEffect } from 'react';

type CustomAnswerWrapperProps = PropsWithChildren<{
  onRenderEnd: () => void;
}>;

const CustomAnswerWrapper: FC<CustomAnswerWrapperProps> = ({
  children,
  onRenderEnd,
}) => {
  useLayoutEffect(() => onRenderEnd(), [onRenderEnd]);
  return <>{children}</>;
};

export default CustomAnswerWrapper;
