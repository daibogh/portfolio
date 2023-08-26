import { render, screen, waitFor } from '@testing-library/react';
import { QuestionContainer } from '.';
import { noop } from 'lodash';
import userEvent from '@testing-library/user-event';

describe('QuestionContainer', () => {
  it('should receive props questionNumber header, questionDescription, answers, status and render it if status is pending', () => {
    render(
      <QuestionContainer
        header="test header"
        questionDescription="test question description"
        rightAnswerIdx={0}
        answers={['test answer 1', 'test answer 2']}
        questionNumber={1}
        onChooseAnswer={noop}
        status="pending"
        answerDescription="test answer description"
      />,
    );
    expect(screen.getByText('test header')).toBeInTheDocument();
    expect(screen.getByText('test question description')).toBeInTheDocument();
    expect(screen.getByText('test answer 1')).toBeInTheDocument();
    expect(screen.getByText('test answer 2')).toBeInTheDocument();
    expect(screen.getByTestId('questionNumber')).toBeInTheDocument();
    expect(screen.getByTestId('questionNumber')).toHaveTextContent(
      'question: 1',
    );
  });
  it('should call onChooseAnswer with answer index when user click on answer', async () => {
    const onChooseAnswer = jest.fn();

    render(
      <QuestionContainer
        header="test header"
        questionDescription="test question description"
        rightAnswerIdx={0}
        answers={['test answer 1', 'test answer 2']}
        questionNumber={1}
        onChooseAnswer={onChooseAnswer}
        status="pending"
        answerDescription="test answer description"
      />,
    );

    userEvent.click(screen.getByTestId('answer-0'));

    await waitFor(() => expect(onChooseAnswer).toHaveBeenCalledWith(0));
  });
  it('should provide status for answer', () => {});
});
