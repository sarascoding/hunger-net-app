import React from 'react';
import classNames from 'classnames';

type Props = {
  action: React.ReactNode;
  title: string;
  description?: string;
  subheader?: string;
  className?: string;
};
const ListItem = (props: Props) => {
  const { className, action, title, description, subheader } = props;
  const baseSelector = 'h-list__item';

  const itemClasses = classNames(baseSelector, {
    [className]: className
  });

  const textSelector = `${baseSelector}-text`;
  const actionSelector = `${baseSelector}--action`;

  const titleSelector = `${textSelector}--title`;
  const subheaderSelector = `${textSelector}--subheader`;
  const descriptionSelector = `${textSelector}--description`;

  const titleClasses = classNames(titleSelector, {
    [`${titleSelector}__lighter`]: !description
  });

  return (
    <div className={itemClasses}>
      <div className={textSelector}>
        {subheader && subheader !== '' && <div className={subheaderSelector}>{subheader}</div>}
        {title && title !== '' && <div className={titleClasses}>{title}</div>}
        {description && description !== '' && (
          <div className={descriptionSelector}>{description}</div>
        )}
      </div>
      {action && <div className={actionSelector}>{action}</div>}
    </div>
  );
};

export default ListItem;
