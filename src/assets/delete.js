import React from 'react';

const stylesCls1 = {
  clipRule: 'evenodd'
};
const stylesCls3 = {
  clipPath: 'url(#clip-path)'
};

const Delete = ({ ...props }) => (
  <svg
    id='trash'
    data-name='trash'
    xmlns='http://www.w3.org/2000/svg'
    fill='#1a1a1a'
    fillRule='evenodd'
    viewBox='0 0 20 20'
    {...props}>
    <title>Trash icon </title>
    <defs>
      <clipPath id='clip-path'>
        <path
          className='cls-1'
          style={stylesCls1}
          d='M14.58,19.53a1.81,1.81,0,0,0,1.78-1.67l.79-12.63H2.85l.79,12.63a1.81,1.81,0,0,0,1.78,1.67ZM17.75,4a.6.6,0,0,0,.59-.59V2.25a.6.6,0,0,0-.59-.59H13.28L12.93,1a1,1,0,0,0-.67-.48H7.87a1,1,0,0,0-.8.49l-.35.7H2.25a.6.6,0,0,0-.59.59v1.2A.6.6,0,0,0,2.25,4Z'
        />
      </clipPath>
    </defs>
    <path
      className='cls-2'
      d='M14.58,19.53a1.81,1.81,0,0,0,1.78-1.67l.79-12.63H2.85l.79,12.63a1.81,1.81,0,0,0,1.78,1.67ZM17.75,4a.6.6,0,0,0,.59-.59V2.25a.6.6,0,0,0-.59-.59H13.28L12.93,1a1,1,0,0,0-.67-.48H7.87a1,1,0,0,0-.8.49l-.35.7H2.25a.6.6,0,0,0-.59.59v1.2A.6.6,0,0,0,2.25,4Z'
    />
    <g className='cls-3' style={stylesCls3}>
      <rect className='cls-4' x='-6.29' y='-7.48' width='32.57' height='34.95' />
    </g>
  </svg>
);

export default Delete;
