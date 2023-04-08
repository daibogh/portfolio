import { render, screen } from '@testing-library/react';
import TextAnimation from './TextAnimation';

describe('TextAnimation', () => {
  it('should render cursor if shouldAnimate=true', () => {
    render(<TextAnimation text="test" shouldAnimate={true} />);
    expect(screen.getByTestId('cursor')).toBeInTheDocument();
  });
  it('should render text without cursor if shouldAnimate=false', () => {
    render(<TextAnimation text="test" shouldAnimate={false} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();
  });
});
