// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Card from './Card';

const baseSelector = 'h-card';
test('shows proper text on card when rendered', () => {
  render(<Card>Hello World!</Card>);
  const heading = screen.getByText('Hello World!');
  expect(heading).toBeInTheDocument();
});

test('shows class based on props passed', async () => {
  render(<Card type='inner' />);
  const component = screen.getByTestId(baseSelector);
  expect(component).toHaveClass(`${baseSelector}--inner`);
});

test('shows custom class when passed', async () => {
  render(<Card type='inner' className='custom-class' />);
  const component = screen.getByTestId(baseSelector);
  expect(component).toHaveClass('custom-class');
});
