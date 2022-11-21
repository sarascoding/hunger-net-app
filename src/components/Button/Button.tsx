import React from 'react';
import classNames from 'classnames';

type Props = {
  id: string;
  size?: string;
  type?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  htmlType?: 'button' | 'submit';
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  const {
    id,
    size = 'medium',
    type = 'outlined',
    disabled,
    fullWidth,
    htmlType,
    children,
    className = '',
    onClick,
    ...otherProps
  } = props;
  const baseSelector = 'h-button';
  const buttonClasses = classNames(baseSelector, {
    [className]: className,
    [`${baseSelector}--disabled`]: disabled,
    [`${baseSelector}--fullWidth`]: fullWidth,
    [`${baseSelector}--${size}`]: size,
    [`${baseSelector}--${type}`]: type
  });

  return (
    <button
      data-testid={`h-button-${id}`}
      id={id}
      aria-label={id}
      type={htmlType}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
