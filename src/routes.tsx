import { ReactNode } from 'react';
// icons
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonAddIcon from "@mui/icons-material/PersonAdd";


// pages
import Profile from './pages/Profile/proflle';
import { EditProfile } from './pages/EditProfile/EditProfile';
import Userslist from "./pages/UsersList/UsersList";
import News from './pages/News/News'
import AddNewUser from './pages/AddNewUser/AddNewUser';

export interface IAdminRoute {
  path: string;
  icon: ReactNode;
  name: string;
  component: ReactNode;
  layout: string;
  id: string;
  role: string[];
}

export const routes: IAdminRoute[] = [
    {
    path: '/news',
    icon: <NewspaperIcon />,
    name: 'News',
    component: <News/>,
    layout: '/admin',
    id: '1',
    role: ['USER', 'ADMINISTRATOR'],
  },
  {
    path: "/profile",
    icon: <PersonIcon />,
    name: "Profile",
    component: <Profile />,
    layout: "/admin",
    id: "2",
    role: ['USER', 'ADMINISTRATOR'],
  },
  {
    path: "/edit",
    icon: <EditIcon />,
    name: "Edit Profile",
    component: <EditProfile />,
    layout: "/admin",
    id: "3",
    role: ['USER', 'ADMINISTRATOR'],
  },
  {
    path: '/user-list',
    icon: <FormatListBulletedIcon />,
    name: 'Users list',
    component: <Userslist/>,
    layout: '/admin',
    id: '4',
    role: ['ADMINISTRATOR'],
  },
  {
    path: '/add-new-user',
    icon: <PersonAddIcon />,
    name: 'Add new user',
    component: <AddNewUser/>,
    layout: '/admin',
    id: '5',
    role: ['ADMINISTRATOR'],
  },
];