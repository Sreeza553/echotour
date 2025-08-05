import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onSubmit, isLoading, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        <button
          type="button"
          className="text-sm text-primary hover:underline"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
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
        Sign In
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Use demo credentials: <strong>demo@echotour.com</strong> / <strong>demo123</strong>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;