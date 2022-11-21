import React from 'react';
import List from '../components/List/List';
import ListItem from '../components/List/ListItem/ListItem';
import Button from '../components/Button/Button';
import { Delete, Eye, PlusCircle } from '../assets';

type Props = {
  title?: string;
  headerAction?: () => void;
  children?: React.ReactNode;
  deleteIcon?: boolean;
  data?: [{ title: string; subheader: string; description: string; id?: string }];
  onClick?: (id: string) => void;
};

const ListView = (props: Props): JSX.Element => {
  const { title, data, onClick, headerAction, children, deleteIcon } = props;

  const Action = (props: any) => (
    <Button
      id='edit-button'
      size='small'
      className='test'
      type='ghost'
      onClick={() => onClick(props.id)}>
      {deleteIcon ? <Delete fill='#535254' /> : <Eye fill='#535254' />}
    </Button>
  );

  return (
    <>
      <div className='h-list-view'>
        <div className='h-list-view-header'>
          {title && <h2>{title}</h2>}
          {children}
          {headerAction && (
            <Button
              id='edit-button'
              size='small'
              className='test'
              type='ghost'
              onClick={headerAction}>
              <PlusCircle fill='#535254' />
            </Button>
          )}
        </div>

        <List>
          {data &&
            data.map((item, idx) => (
              <ListItem
                key={idx}
                title={item.title}
                subheader={item?.subheader}
                description={item?.description}
                action={<Action id={item.id} />}
              />
            ))}
        </List>
      </div>
    </>
  );
};

export default ListView;
