// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

const baseSelector = 'h-modal';
const defaultProps = {
  id: 'modal',
  onClose: jest.fn()
};

test('shows proper children on modal when rendered', () => {
  render(<Modal {...defaultProps}>Hello World!</Modal>);
  const heading = screen.getByText('Hello World!');
  expect(heading).toBeInTheDocument();
});

test('when clicked outside of modal, onClose is called', async () => {
  render(<Modal {...defaultProps}>Hello World!</Modal>);
  const portalBackdrop = screen.getByTestId(`${baseSelector}__backdrop`);
  await userEvent.click(portalBackdrop);
  expect(defaultProps.onClose).toHaveBeenCalled();
});

test('shows custom class when passed', () => {
  render(
    <Modal {...defaultProps} className='custom-class'>
      children
    </Modal>
  );
  const component = screen.getByTestId(baseSelector);
  expect(component).toHaveClass('custom-class');
});
