import React from 'react';
import { IIconProps } from '~/shared/interfaces/IIconProps';

const DecisionTree: React.FC<IIconProps> = ({ ...props }) => (
   <svg {...props} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
         d="M18.75 8V3H13.75V4.875H11.25C10.9186 4.87533 10.6008 5.00713 10.3665 5.24148C10.1321 5.47583 10.0003 5.79358 10 6.125V9.875H6.25V8H1.25V13H6.25V11.125H10V14.875C10.0003 15.2064 10.1321 15.5242 10.3665 15.7585C10.6008 15.9929 10.9186 16.1247 11.25 16.125H13.75V18H18.75V13H13.75V14.875H11.25V6.125H13.75V8H18.75ZM5 11.75H2.5V9.25H5V11.75ZM15 14.25H17.5V16.75H15V14.25ZM15 4.25H17.5V6.75H15V4.25Z"
         fill="white"
      />
   </svg>
);

export default DecisionTree;
