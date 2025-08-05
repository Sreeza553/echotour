import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const AuthModal = ({ isOpen = false, onClose, onAuth, mode = 'signin' }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentMode(mode);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        agreeToTerms: false
      });
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, mode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (currentMode === 'signup') {
      if (!formData?.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'Please agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onAuth) {
        onAuth({
          mode: currentMode,
          user: {
            email: formData?.email,
            name: formData?.name || formData?.email?.split('@')?.[0]
          }
        });
      }
      
      onClose();
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onAuth) {
        onAuth({
          mode: 'social',
          provider,
          user: {
            email: `user@${provider}.com`,
            name: `${provider} User`
          }
        });
      }
      
      onClose();
    } catch (error) {
      setErrors({ submit: 'Social authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-background rounded-2xl shadow-primary-hover border border-border animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {currentMode === 'signin' ? 'Welcome Back' : 'Join EchoTour'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {currentMode === 'signin' ? 'Sign in to access your travel experiences' : 'Create your account to start exploring'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Social Auth */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('google')}
              disabled={isLoading}
              iconName="Chrome"
              iconPosition="left"
              iconSize={18}
              className="min-h-touch"
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('apple')}
              disabled={isLoading}
              iconName="Apple"
              iconPosition="left"
              iconSize={18}
              className="min-h-touch"
            >
              Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentMode === 'signup' && (
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                error={errors?.name}
                required
                disabled={isLoading}
              />
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              error={errors?.email}
              required
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors?.password}
              required
              disabled={isLoading}
            />

            {currentMode === 'signup' && (
              <>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  error={errors?.confirmPassword}
                  required
                  disabled={isLoading}
                />

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData?.agreeToTerms}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <button type="button" className="text-primary hover:underline">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-primary hover:underline">
                      Privacy Policy
                    </button>
                  </label>
                </div>
                {errors?.agreeToTerms && (
                  <p className="text-sm text-error">{errors?.agreeToTerms}</p>
                )}
              </>
            )}

            {errors?.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error">{errors?.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isLoading}
              className="min-h-touch"
            >
              {currentMode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {currentMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              {' '}
              <button
                type="button"
                onClick={() => setCurrentMode(currentMode === 'signin' ? 'signup' : 'signin')}
                disabled={isLoading}
                className="text-primary hover:underline font-medium"
              >
                {currentMode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;