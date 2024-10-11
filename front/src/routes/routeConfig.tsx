import Home from '../pages/Home';
import TwitterAuth from '../pages/TwitterAuth';
import Explore from '../pages/Explore';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected: boolean;
}

export const routeConfig: RouteConfig[] = [
  { 
     path: "/x",
     element: <TwitterAuth />,
     protected: false
  },
  { 
    path: "/",
    element: <Home />,
    protected: true 
  },
  { 
    path: "/explore",
    element: <Explore />,
    protected: true
  },
];
