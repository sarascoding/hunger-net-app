// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

const onClick = jest.fn();
const defaultProps = {
  onClick,
  id: 'cta'
};
const testId = `h-button-${defaultProps.id}`;
test('shows proper text on button when rendered', () => {
  render(<Button {...defaultProps}>Hello World!</Button>);
  const heading = screen.getByText('Hello World!');
  expect(heading).toBeInTheDocument();
});

test('fires button onClick event when clicked', async () => {
  render(<Button {...defaultProps} />);
  const button = screen.getByRole('button');
  await fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('shows disabled class when passed and cant be clicked', async () => {
  render(<Button {...defaultProps} disabled />);
  const component = screen.getByTestId(testId);
  const button = screen.getByRole('button');
  await fireEvent.click(button);
  expect(component).toHaveClass('h-button--disabled');
  expect(onClick).toHaveBeenCalledTimes(0);
});
