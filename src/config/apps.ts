import { FaUser, FaFolder, FaComments, FaFileAlt, FaCloudSun } from 'react-icons/fa';
import AboutMeApp from '../apps/AboutMeApp';
import ProjectsApp from '../apps/ProjectsApp';
import IrisChatApp from '../apps/IrisChatApp';
import CVApp from '../apps/CVApp';
import WeatherApp from '../apps/WeatherApp';
import { App } from '../types/os';

const apps: App[] = [
  {
    id: 'about-me',
    name: 'About Me',
    icon: FaUser,
    component: AboutMeApp,
    defaultSize: { width: 600, height: 700 },
    showInTaskbar: true,
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: FaFolder,
    component: ProjectsApp,
    defaultSize: { width: 800, height: 600 },
    showInTaskbar: true,
  },
  {
    id: 'iris-chat',
    name: 'IRIS Chat',
    icon: FaComments,
    component: IrisChatApp,
    defaultSize: { width: 400, height: 600 },
    showInTaskbar: true,
  },
  {
    id: 'cv',
    name: 'CV',
    icon: FaFileAlt,
    component: CVApp,
    defaultSize: { width: 800, height: 600 },
    showInTaskbar: true,
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: FaCloudSun,
    component: WeatherApp,
    defaultSize: { width: 360, height: 340 },
    showInTaskbar: true,
  },
];

export const getAllApps = () => apps;