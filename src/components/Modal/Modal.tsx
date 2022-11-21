import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const baseSelector = 'h-modal';
type ModalProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
};
const Modal = ({ className, children, onClose, id, ...otherProps }: ModalProps) => {
  const modalNode = useRef(null);

  const modalBaseClass = classNames(baseSelector, {
    [className]: !!className
  });

  const onClickOutside = (event) => {
    const modal = document.getElementById(id);
    if (modal && modal.contains(event.target)) return;
    onClose();
  };

  return ReactDOM.createPortal(
    <aside
      data-testid={`${baseSelector}__backdrop`}
      id={`backdrop-${id}`}
      className={`${baseSelector}__backdrop`}
      tabIndex={-1}
      role='presentation'
      onClick={onClickOutside}>
      <div
        {...otherProps}
        role='dialog'
        aria-modal='true'
        id={id}
        className={modalBaseClass}
        data-testid={baseSelector}
        ref={modalNode}>
        {children}
      </div>
    </aside>,
    document.body
  );
};

export default Modal;
