import Breadcrumb from 'nextjs-breadcrumbs';

import React from 'react';
import { useRecoilState } from 'recoil';

import breadcrumbsAtom from '../../atoms/breadcrumbs';
const Breadcrumbs: React.FC = () => {
  const [breadcrumbs] = useRecoilState(breadcrumbsAtom);

  return (
    <Breadcrumb
      containerClassName='breadcrumbs'
      transformLabel={(title) => {
        const breadcrumb = breadcrumbs.find(
          (breadcrumb) => breadcrumb.path === '/' + title,
        );

        return breadcrumb ? (
          <div className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              />
            </svg>
            {breadcrumb.breadcrumb}
          </div>
        ) : (
          title
        );
      }}
      useDefaultStyle
      rootLabel='Home'
    />
  );
};

export default Breadcrumbs;
