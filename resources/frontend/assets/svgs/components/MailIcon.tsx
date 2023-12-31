import React from 'react';
import { IIconProps } from '~/shared/interfaces/IIconProps';

const MailIcon: React.FC<IIconProps> = ({ ...props }) => (
   <svg {...props} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
         d="M19.6667 4.66659L11 10.0833L2.33332 4.66659V2.49992L11 7.91659L19.6667 2.49992M19.6667 0.333252H2.33332C1.13082 0.333252 0.166656 1.29742 0.166656 2.49992V15.4999C0.166656 16.0746 0.39493 16.6257 0.801258 17.032C1.20759 17.4383 1.75869 17.6666 2.33332 17.6666H19.6667C20.2413 17.6666 20.7924 17.4383 21.1987 17.032C21.605 16.6257 21.8333 16.0746 21.8333 15.4999V2.49992C21.8333 1.92528 21.605 1.37418 21.1987 0.967854C20.7924 0.561525 20.2413 0.333252 19.6667 0.333252Z"
         fill="white"
      />
   </svg>
);

export default MailIcon;
