import React from 'react';
import classNames from 'classnames';

const baseClassname = 'h-input-text';

type Props = {
  placeholder?: string;
  className?: string;
  value?: string;
  label?: string;
  onChange: (e: any) => void;
  id: string;
  type?: string;
  errorText?: string;
  isRequired?: boolean;
  readonly?: boolean;
  fullWidth: boolean;
};
const TextInput = (props: Props) => {
  const {
    placeholder = '',
    className,
    value,
    onChange,
    id,
    type = 'text',
    errorText,
    isRequired,
    readonly,
    fullWidth,
    label,
    ...otherProps
  } = props;
  const textInputClassnames = classNames(baseClassname, {
    [`${baseClassname}--fullWidth`]: fullWidth
  });

  return (
    <>
      <div className={textInputClassnames}>
        <div className={`${baseClassname}__label`}>
          {label && <span>{label} </span>}
          {isRequired && <span className={`${baseClassname}__required`}>*</span>}
        </div>

        <input
          data-testid={`h-input-${id}`}
          type={type}
          id={id}
          aria-label={id}
          placeholder={placeholder}
          className={className}
          readOnly={readonly}
          value={value}
          onChange={onChange}
          {...otherProps}
        />
        {errorText && <span className={`${baseClassname}__error`}>{errorText}</span>}
      </div>
    </>
  );
};

export default TextInput;
