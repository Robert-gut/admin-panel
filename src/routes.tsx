import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';

interface IAdminRoute {
  icon: JSX.Element
  name: string
  path: string
  id: string
  component: JSX.Element
  layout: string

}

export const data: IAdminRoute[] = [
  {
    icon: <DashboardIcon />,
    name: 'Dashboard', 
    id: 'dashboard',
    path: 'urlPage',
    component: <PageTest>,
    layout: '/admin',
  },
  {
    icon: <PersonIcon />,
    name: 'User Profile',
    id: 'userProfile',
    path: 'urlPage',
    component: <PageTest>,
    layout: '/admin',
  },
  {
    icon: <ContentPasteOutlinedIcon />,
    name: 'Table', 
    id: 'table',
    path: 'urlPage',
    component: <PageTest>,
    layout: '/admin',
  },
  {
    icon: <CasesRoundedIcon />,
    name: 'Typography', 
    id: 'typography',
    path: 'urlPage',
    component: <PageTest>,
    layout: '/admin',
  },
  {
    icon: <NotificationsRoundedIcon />,
    name: 'Notyfications',
    id: 'notyfications',
    path: 'urlPage',
    component: <PageTest>,
    layout: '/admin',
  },
];