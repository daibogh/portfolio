import { render, screen } from '@testing-library/react';
import { MainLayout } from '.';
describe('MainLayout', () => {
  it('should render main layout and its children', () => {
    render(
      <MainLayout>
        <div data-testid="test1">hello world</div>
      </MainLayout>,
    );
    expect(screen.getByTestId('test1')).toBeInTheDocument();
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
