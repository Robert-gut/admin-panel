import { ReactNode } from 'react';
// icons
import PersonIcon from '@mui/icons-material/Person';


// pages
import Profile from './pages/Profile/proflle';
import Userslist from "./pages/UsersList/UsersList";

export interface IAdminRoute {
  path: string;
  icon: ReactNode;
  name: string;
  component: ReactNode;
  layout: string;
  id: string;
}

export const routes: IAdminRoute[] = [
  {
    path: '/profile',
    icon: <PersonIcon />,
    name: 'Profile', 
    component: <Profile/>,
    layout: '/admin',
    id: '1',
  },
  {
    path: '/user-list',
    icon: <PersonIcon />,
    name: 'Userslist',
    component: <Userslist/>,
    layout: '/admin',
    id: 2,
  },
];