import { ReactNode } from 'react';
// icons
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from "@mui/icons-material/Edit";


// pages
import Profile from './pages/Profile/proflle';
import { EditProfile } from './pages/EditProfile/EditProfile';
import Userslist from "./pages/UsersList/UsersList";
import News from './pages/News/News'


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
    path: "/profile",
    icon: <PersonIcon />,
    name: "Profile",
    component: <Profile />,
    layout: "/admin",
    id: "1",
  },
  {
    path: "/profile",
    icon: <PersonIcon />,
    name: "Profile2",
    component: <Profile />,
    layout: "/admin",
    id: "2",
  },
  {
    path: "/edit",
    icon: <EditIcon />,
    name: "Edit Profile",
    component: <EditProfile />,
    layout: "/admin",
    id: "3",
  },
  {
    path: '/user-list',
    icon: <PersonIcon />,
    name: 'Userslist',
    component: <Userslist/>,
    layout: '/admin',
    id: '4',
  },
    {
    path: '/news',
    icon: <PersonIcon />,
    name: 'News',
    component: <News/>,
    layout: '/admin',
    id: '5',
  },
];