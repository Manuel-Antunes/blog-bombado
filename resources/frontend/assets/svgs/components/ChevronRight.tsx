import React from 'react';
import { IIconProps } from '~/shared/interfaces/IIconProps';

const ChevronRight: React.FC<IIconProps> = ({ ...props }) => (
   <svg {...props} width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
         d="M0.250162 9.91669C0.0973847 9.76391 0.0209961 9.56946 0.0209961 9.33335C0.0209961 9.09724 0.0973847 8.9028 0.250162 8.75002L3.50016 5.50002L0.250162 2.25002C0.0973847 2.09724 0.0209961 1.9028 0.0209961 1.66669C0.0209961 1.43058 0.0973847 1.23613 0.250162 1.08335C0.40294 0.930576 0.597385 0.854187 0.833496 0.854187C1.06961 0.854187 1.26405 0.930576 1.41683 1.08335L5.25016 4.91669C5.3335 5.00002 5.39266 5.0903 5.42766 5.18752C5.46211 5.28474 5.47933 5.38891 5.47933 5.50002C5.47933 5.61113 5.46211 5.7153 5.42766 5.81252C5.39266 5.90974 5.3335 6.00002 5.25016 6.08335L1.41683 9.91669C1.26405 10.0695 1.06961 10.1459 0.833496 10.1459C0.597385 10.1459 0.40294 10.0695 0.250162 9.91669Z"
         fill="#C2C9D6"
      />
   </svg>
);

export default ChevronRight;