import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  children: React.ReactNode;
};
const List = (props: Props) => {
  const { className, children } = props;
  const baseSelector = 'h-list';

  const listClasses = classNames(baseSelector, {
    [className]: className
  });

  return (
    <div className={listClasses} data-testid={baseSelector}>
      {React.Children.map(children, (child) => (
        <div className='h-list__item-wrapper'>{child}</div>
      ))}
    </div>
  );
};

export default List;
