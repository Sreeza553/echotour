import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AccommodationInput = ({ value, onChange, error }) => {
  const [accommodationType, setAccommodationType] = useState(value?.type || 'hotel');

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotel', icon: 'Building2' },
    { value: 'homestay', label: 'Homestay', icon: 'Home' },
    { value: 'hostel', label: 'Hostel', icon: 'Users' },
    { value: 'resort', label: 'Resort', icon: 'Palmtree' },
    { value: 'apartment', label: 'Apartment', icon: 'Building' },
    { value: 'guesthouse', label: 'Guesthouse', icon: 'DoorOpen' }
  ];

  const handleTypeChange = (selectedType) => {
    setAccommodationType(selectedType);
    onChange({
      ...value,
      type: selectedType,
      name: ''
    });
  };

  const handleNameChange = (e) => {
    onChange({
      ...value,
      name: e?.target?.value
    });
  };

  const getTypeIcon = (type) => {
    const typeObj = accommodationTypes?.find(t => t?.value === type);
    return typeObj ? typeObj?.icon : 'Building2';
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Accommodation Details
        </label>
        
        {/* Accommodation Type Selector */}
        <div className="mb-4">
          <Select
            label="Accommodation Type"
            placeholder="Select accommodation type"
            options={accommodationTypes?.map(type => ({
              value: type?.value,
              label: type?.label
            }))}
            value={accommodationType}
            onChange={handleTypeChange}
          />
        </div>

        {/* Accommodation Name Input */}
        <div className="relative">
          <Input
            label={`${accommodationTypes?.find(t => t?.value === accommodationType)?.label || 'Accommodation'} Name`}
            type="text"
            placeholder={`Enter ${accommodationTypes?.find(t => t?.value === accommodationType)?.label?.toLowerCase() || 'accommodation'} name`}
            value={value?.name || ''}
            onChange={handleNameChange}
            error={error}
            className="pr-10"
          />
          <div className="absolute right-3 top-9 flex items-center">
            <Icon 
              name={getTypeIcon(accommodationType)} 
              size={18} 
              className="text-muted-foreground" 
            />
          </div>
        </div>
      </div>
      {/* Accommodation Info */}
      {accommodationType && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Icon 
                name={getTypeIcon(accommodationType)} 
                size={16} 
                className="text-secondary" 
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {accommodationTypes?.find(t => t?.value === accommodationType)?.label} Planning
              </h4>
              <p className="text-xs text-muted-foreground">
                {accommodationType === 'hotel' && "We'll plan activities around your hotel's location for convenient access to nearby attractions."}
                {accommodationType === 'homestay' && "Experience local culture while we plan authentic neighborhood experiences around your homestay."}
                {accommodationType === 'hostel' && "Budget-friendly planning with focus on social activities and backpacker-friendly attractions."}
                {accommodationType === 'resort' && "Luxury-focused itinerary with premium experiences and resort-based activities."}
                {accommodationType === 'apartment' && "Local living experience with neighborhood exploration and authentic city experiences."}
                {accommodationType === 'guesthouse' && "Intimate local experience with personalized recommendations from your hosts."}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Optional Features */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Lightbulb" size={14} />
        <span>
          Providing accommodation details helps us create location-optimized itineraries
        </span>
      </div>
    </div>
  );
};

export default AccommodationInput;