import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionSelector from './QuestionSelector';
import { useStore } from '@nanostores/react';
import { questionsMap } from '../../stores/chat/data';
jest.mock('../../stores/chat/data', () => ({ questionsMap: {} }));
jest.mock('@nanostores/react', () => ({ useStore: jest.fn() }));
describe('QuestionSelector', () => {
  it('should render list of available questions', () => {
    const getList = jest.fn(() => [
      {
        id: 'question1',
        action: jest.fn(),
      },
      {
        id: 'clear',
        action: jest.fn(),
      },
    ]);
    const getIsTyping = jest.fn(() => false);
    jest
      .mocked(useStore)
      .mockImplementationOnce(getList)
      .mockImplementationOnce(getIsTyping)
      // TODO: fix double call of useStore for each atom
      .mockImplementationOnce(getList)
      .mockImplementationOnce(getIsTyping);
    (questionsMap as any).question1 = { text: 'question1Text' };
    render(<QuestionSelector />);
    expect(screen.getByText('question1Text')).toBeInTheDocument();
    expect(screen.getByText('Clear chat history')).toBeInTheDocument();
  });
  it('should call question and cacnel buttons action on click', async () => {
    const question1Action = jest.fn();
    const clearAction = jest.fn();
    const getList = jest.fn(() => [
      {
        id: 'question1',
        action: question1Action,
      },
      {
        id: 'clear',
        action: clearAction,
      },
    ]);
    const getIsTyping = jest.fn(() => false);
    jest
      .mocked(useStore)
      .mockImplementationOnce(getList)
      .mockImplementationOnce(getIsTyping)
      // TODO: fix double call of useStore for each atom
      .mockImplementationOnce(getList)
      .mockImplementationOnce(getIsTyping);
    (questionsMap as any).question1 = { text: 'question1Text' };
    render(<QuestionSelector />);
    userEvent.click(screen.getByText('question1Text'));
    userEvent.click(screen.getByText('Clear chat history'));
    await waitFor(() =>
      expect(question1Action).toHaveBeenCalledWith('question1'),
    );
    await waitFor(() => expect(clearAction).toHaveBeenCalled());
  });
});
