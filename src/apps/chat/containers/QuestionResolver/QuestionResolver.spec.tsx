import { render, screen } from '@testing-library/react';
import QuestionResolver from './QuestionResolver';
jest.mock('../../components/ChatMessage', () => ({
  ChatMessage: ({ children, type }: any) => (
    <div data-testid="chatMessage" className={type}>
      {children}
    </div>
  ),
}));
describe('QuestionResolver', () => {
  it('should render', () => {
    render(
      <QuestionResolver text="test" isTyping={false} onTypeEnd={() => {}} />,
    );
    expect(screen.getByTestId('chatMessage')).toBeInTheDocument();
    expect(screen.getByTestId('chatMessage')).toHaveClass('right');
  });
});
