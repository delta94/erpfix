import Loadable from 'react-loadable';
import Loading from 'dan-components/Loading';

// F1
export const F1_Area = Loadable({loader: () => import('./F1/Area'), loading: Loading,});
export const F1_Bank = Loadable({loader: () => import('./F1/Bank'), loading: Loading,});
export const F1_Branch = Loadable({loader: () => import('./F1/Branch'), loading: Loading,});
export const F1_City = Loadable({loader: () => import('./F1/City'), loading: Loading,});
export const F1_Color = Loadable({loader: () => import('./F1/Color'), loading: Loading,});
export const F1_Country = Loadable({loader: () => import('./F1/Country'), loading: Loading,});

// F2
export const F2_CR = Loadable({loader: () => import('./F2/CR'), loading: Loading,});
export const F2_CD = Loadable({loader: () => import('./F2/CD'), loading: Loading,});
