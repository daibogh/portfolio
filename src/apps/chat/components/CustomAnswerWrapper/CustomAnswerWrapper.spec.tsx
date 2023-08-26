import { render, screen } from '@testing-library/react';
import CustomAnswerWrapper from './CustomAnswerWrapper';
describe('custom answer wrapper', () => {
  it('should render custom compnent as children', () => {
    const onRenderEnd = jest.fn();
    render(
      <CustomAnswerWrapper onRenderEnd={onRenderEnd}>test</CustomAnswerWrapper>,
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('should call onRenderEnd after render once', () => {
    const onRenderEnd = jest.fn();
    render(
      <CustomAnswerWrapper onRenderEnd={onRenderEnd}>test</CustomAnswerWrapper>,
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(onRenderEnd).toBeCalledTimes(1);
  });
});
