import React from 'react';

type Props = {
  withBackground?: boolean;
};
const CustomLoader = ({ withBackground }: Props) => (
  <div className={`custom-loader-wrapper ${withBackground ? 'with-bg' : ''}`}>
    <div className='custom-loader'></div>
  </div>
);
export default CustomLoader;
