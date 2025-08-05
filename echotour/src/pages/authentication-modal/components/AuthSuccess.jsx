import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthSuccess = ({ user, onContinue, isLogin }) => {
  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          {isLogin ? 'Welcome Back!' : 'Account Created!'}
        </h3>
        <p className="text-muted-foreground">
          {isLogin 
            ? `Welcome back, ${user?.name || 'traveler'}! Ready to continue your journey?`
            : `Welcome to EchoTour, ${user?.name || 'traveler'}! Your adventure begins now.`
          }
        </p>
      </div>

      {/* User Info */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground">{user?.name || 'Demo User'}</p>
            <p className="text-sm text-muted-foreground">{user?.email || 'demo@echotour.com'}</p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        variant="default"
        fullWidth
        onClick={onContinue}
        iconName="ArrowRight"
        iconPosition="right"
        className="min-h-touch"
      >
        Continue to EchoTour
      </Button>

      {/* Additional Info */}
      <div className="text-xs text-muted-foreground">
        <p>You can now access all features including:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded">Travel Planning</span>
          <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">Cultural Stories</span>
          <span className="bg-accent/10 text-accent px-2 py-1 rounded">Music Experience</span>
          <span className="bg-warning/10 text-warning px-2 py-1 rounded">Voice Memories</span>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;