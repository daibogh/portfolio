import { render, screen } from '@testing-library/react';
import ChatMessage from './ChatMessage';
import styles from './ChatMessage.module.css';
describe('ChatMessage', () => {
  it('should render right message', () => {
    render(<ChatMessage type="right">test</ChatMessage>);
    expect(screen.getByText('test')).toHaveClass(styles.messageRight);
  });
  it('should render left message', () => {
    render(<ChatMessage type="left">test</ChatMessage>);
    expect(screen.getByText('test')).toHaveClass(styles.messageLeft);
  });
});
