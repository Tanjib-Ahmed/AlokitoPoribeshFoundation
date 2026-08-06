import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className }) => {
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    // Return a default icon if name doesn't match
    const DefaultIcon = LucideIcons.HelpCircle;
    return <DefaultIcon className={className} />;
  }

  return <IconComponent className={className} />;
};
export default IconHelper;
