import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/landing-page': { label: 'Home', icon: 'Home' },
    '/smart-travel-planner': { label: 'Smart Travel Planner', icon: 'MapPin' },
    '/cultural-storytelling': { label: 'Cultural Storytelling', icon: 'BookOpen' },
    '/mood-based-music-experience': { label: 'Mood-Based Music', icon: 'Music' },
    '/voice-memories-studio': { label: 'Voice Memories Studio', icon: 'Mic' },
    '/authentication-modal': { label: 'Authentication', icon: 'User' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Home
    breadcrumbs?.push({
      label: 'Home',
      path: '/landing-page',
      icon: 'Home',
      isActive: false
    });

    // Add current page if not home
    if (location.pathname !== '/landing-page' && location.pathname !== '/') {
      const currentRoute = routeMap?.[location.pathname];
      if (currentRoute) {
        breadcrumbs?.push({
          label: currentRoute?.label,
          path: location.pathname,
          icon: currentRoute?.icon,
          isActive: true
        });
      }
    } else {
      // Mark home as active if we're on home page
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path, isActive) => {
    if (!isActive && path) {
      navigate(path);
    }
  };

  // Don't render breadcrumbs on landing page unless there are custom items
  if (location.pathname === '/landing-page' && !customItems) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path || index}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-muted-foreground flex-shrink-0" 
            />
          )}
          
          <div className="flex items-center">
            {item?.isActive ? (
              <div className="flex items-center space-x-2 text-foreground font-medium">
                {item?.icon && (
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className="text-primary flex-shrink-0" 
                  />
                )}
                <span className="truncate">{item?.label}</span>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path, item?.isActive)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md px-2 py-1 -mx-2 hover:bg-muted"
              >
                {item?.icon && (
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className="flex-shrink-0" 
                  />
                )}
                <span className="truncate">{item?.label}</span>
              </button>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;