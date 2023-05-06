import appLogo from '@payless/ui/src/images/app-logo.svg';
import { If, Then } from 'react-if';

export interface AppLogoProps {
  hideName?: boolean;
}

const AppLogo: React.FC<AppLogoProps> = ({ hideName }) => {
  return (
    <>
      <img className='mx-auto h-12 w-12' src={appLogo} alt='logo' />
      <If condition={!hideName}>
        <Then>
          <p className='dark:text-navy-100 text-xl font-semibold uppercase text-slate-700'>
            Payless
          </p>
        </Then>
      </If>
    </>
  );
};

export default AppLogo;
