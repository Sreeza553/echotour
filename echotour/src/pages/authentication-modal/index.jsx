import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AuthModal from './components/AuthModal';
import AuthTabs from './components/AuthTabs';
import SocialAuth from './components/SocialAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuthSuccess from './components/AuthSuccess';

const AuthenticationModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authStep, setAuthStep] = useState('form'); // 'form' | 'success'
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock credentials for demo
  const mockCredentials = {
    email: 'demo@echotour.com',
    password: 'demo123'
  };

  useEffect(() => {
    // Check if user came from a specific tab
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams?.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [location]);

  const validateLoginForm = (formData) => {
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

    // Check mock credentials
    if (formData?.email && formData?.password) {
      if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
        newErrors.submit = 'Invalid credentials. Use demo@echotour.com / demo123';
      }
    }

    return newErrors;
  };

  const validateRegisterForm = (formData) => {
    const newErrors = {};

    if (!formData?.name) {
      newErrors.name = 'Name is required';
    }

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

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'Please agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors)?.length === 0) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const user = {
          name: 'Demo User',
          email: formData?.email,
          id: 'demo-user-123'
        };

        setAuthenticatedUser(user);
        setIsAuthenticated(true);
        setAuthStep('success');
      } catch (error) {
        setErrors({ submit: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegister = async (formData) => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors)?.length === 0) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const user = {
          name: formData?.name,
          email: formData?.email,
          id: `user-${Date.now()}`,
          travelPreference: formData?.travelPreference
        };

        setAuthenticatedUser(user);
        setIsAuthenticated(true);
        setAuthStep('success');
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        name: `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`,
        email: `user@${provider}.com`,
        id: `${provider}-user-${Date.now()}`
      };

      setAuthenticatedUser(user);
      setIsAuthenticated(true);
      setAuthStep('success');
    } catch (error) {
      setErrors({ submit: 'Social authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    // Navigate back to landing page or previous location
    const from = location.state?.from || '/landing-page';
    navigate(from, { replace: true });
  };

  const handleCloseModal = () => {
    navigate('/landing-page');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setAuthStep('form');
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setAuthenticatedUser(null);
      setAuthStep('form');
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/landing-page', icon: 'Home', isActive: false },
    { label: 'Authentication', path: '/authentication-modal', icon: 'User', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        user={authenticatedUser}
      />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb customItems={breadcrumbItems} />
        </div>

        {/* Background */}
        <div className="fixed inset-0 bg-gradient-mesh opacity-5 pointer-events-none" />
        
        {/* Modal */}
        <AuthModal
          isOpen={true}
          onClose={handleCloseModal}
          title={authStep === 'success' ? 'Success!' : (activeTab === 'login' ? 'Welcome Back' : 'Join EchoTour')}
          subtitle={authStep === 'success' ? null : (activeTab === 'login' 
            ? 'Sign in to access your travel experiences' :'Create your account to start exploring'
          )}
        >
          {authStep === 'form' ? (
            <>
              <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
              
              <SocialAuth onSocialAuth={handleSocialAuth} isLoading={isLoading} />
              
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  errors={errors}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                  errors={errors}
                />
              )}
            </>
          ) : (
            <AuthSuccess
              user={authenticatedUser}
              onContinue={handleAuthSuccess}
              isLogin={activeTab === 'login'}
            />
          )}
        </AuthModal>
      </main>
    </div>
  );
};

export default AuthenticationModal;