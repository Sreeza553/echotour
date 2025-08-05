import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = ({ onSubmit, isLoading, errors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    travelPreference: '',
    agreeToTerms: false
  });

  const travelPreferences = [
    { value: 'adventure', label: 'Adventure & Outdoor' },
    { value: 'cultural', label: 'Cultural & Historical' },
    { value: 'relaxation', label: 'Relaxation & Wellness' },
    { value: 'urban', label: 'Urban & City Life' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'food', label: 'Food & Culinary' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      travelPreference: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Create a password"
        error={errors?.password}
        required
        disabled={isLoading}
      />
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
      <Select
        label="Travel Preference (Optional)"
        description="Help us personalize your experience"
        options={travelPreferences}
        value={formData?.travelPreference}
        onChange={handleSelectChange}
        placeholder="Select your travel style"
        disabled={isLoading}
      />
      <Checkbox
        label={`I agree to the Terms of Service and Privacy Policy`}
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleInputChange}
        error={errors?.agreeToTerms}
        required
        disabled={isLoading}
      />
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
        Create Account
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Demo registration: Use any valid email format
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;