import { atom } from 'recoil'

const breadcrumbsAtom = atom({
  key: 'breadcrumbs',
  default: [
    { path: '/home', breadcrumb: 'Home' },
    { path: '/contacts', breadcrumb: 'Contatos' },
  ],
})

export default breadcrumbsAtom
