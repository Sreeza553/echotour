import React from 'react';
import Select from '../../../components/ui/Select';

const RegionSelector = ({ selectedRegion, onRegionSelect, disabled = false }) => {
  const regionOptions = [
    { value: '', label: 'Select a region' },
    { value: 'north-america', label: 'North America', description: 'USA, Canada, Mexico' },
    { value: 'south-america', label: 'South America', description: 'Brazil, Argentina, Peru' },
    { value: 'europe', label: 'Europe', description: 'UK, France, Germany, Italy' },
    { value: 'asia', label: 'Asia', description: 'India, China, Japan, Thailand' },
    { value: 'africa', label: 'Africa', description: 'South Africa, Kenya, Morocco' },
    { value: 'oceania', label: 'Oceania', description: 'Australia, New Zealand, Fiji' },
    { value: 'middle-east', label: 'Middle East', description: 'UAE, Turkey, Israel' },
    { value: 'caribbean', label: 'Caribbean', description: 'Jamaica, Bahamas, Barbados' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Travel Region
        </h3>
        <p className="text-sm text-muted-foreground">
          Select your travel destination region
        </p>
      </div>

      <Select
        options={regionOptions}
        value={selectedRegion}
        onChange={onRegionSelect}
        placeholder="Choose your travel region"
        disabled={disabled}
        searchable
        className="w-full"
      />
    </div>
  );
};

export default RegionSelector;