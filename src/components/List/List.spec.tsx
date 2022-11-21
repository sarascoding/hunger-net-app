// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import List from './List';

const Child1 = () => <div>child1</div>;
const Child2 = () => <div>child2</div>;

const baseSelector = 'h-list';
test('shows proper children on list when rendered', () => {
  render(
    <List>
      <Child1 />
      <Child2 />
    </List>
  );
  const child1Text = screen.getByText('child1');
  expect(child1Text).toBeInTheDocument();

  const child2Text = screen.getByText('child2');
  expect(child2Text).toBeInTheDocument();
});

test('shows custom class when passed', () => {
  render(
    <List className='custom-class'>
      <Child1 />
    </List>
  );
  const component = screen.getByTestId(baseSelector);
  expect(component).toHaveClass('custom-class');
});
