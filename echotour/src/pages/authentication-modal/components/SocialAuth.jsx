import React from 'react';
import Button from '../../../components/ui/Button';

const SocialAuth = ({ onSocialAuth, isLoading }) => {
  const socialProviders = [
    { id: 'google', name: 'Google', icon: 'Chrome', color: 'bg-red-500' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600' }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => onSocialAuth(provider?.id)}
          disabled={isLoading}
          iconName={provider?.icon}
          iconPosition="left"
          iconSize={18}
          className="min-h-touch"
        >
          Continue with {provider?.name}
        </Button>
      ))}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;