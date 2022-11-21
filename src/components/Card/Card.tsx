import React from 'react';
import classNames from 'classnames';

export type Props = {
  className?: string;
  children?: React.ReactNode;
  type?: 'inner' | 'outer' | 'outer-inner';
};
const Card = (props: Props): JSX.Element => {
  const baseSelector = 'h-card';
  const { className, children, type, ...otherProps } = props;

  const basicCardClass = classNames(baseSelector, `${baseSelector}--rounded`, {
    [className]: !!className,
    [`${baseSelector}--inner`]: type === 'inner',
    [`${baseSelector}--outer`]: type === 'outer' || type === 'outer-inner',
    [`${baseSelector}--outer-inner`]: type === 'outer-inner'
  });

  return (
    <div {...otherProps} className={basicCardClass} data-testid={baseSelector}>
      {children}
    </div>
  );
};
export default Card;
