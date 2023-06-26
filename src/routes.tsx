import { ReactNode } from 'react';
// icons
import PersonIcon from '@mui/icons-material/Person';

// pages
import Profile from './pages/Profile/proflle';

export interface IAdminRoute {
  path: string;
  icon: ReactNode;
  name: string;
  component: ReactNode;
  layout: string;
  id: number;
}

export const routes: IAdminRoute[] = [
  {
    path: '/profile',
    icon: <PersonIcon />,
    name: 'Profile', 
    component: <Profile/>,
    layout: '/admin',
    id: 1,
  },
  {
    path: '/profile',
    icon: <PersonIcon />,
    name: 'Profile2', 
    component: <Profile/>,
    layout: '/admin',
    id: 2,
  },
];