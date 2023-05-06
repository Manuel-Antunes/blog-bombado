import { atom } from 'recoil';

const sidebarOpenAtom = atom({
  key: 'sidebarOpen',
  default: false,
})

export default sidebarOpenAtom;
