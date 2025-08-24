import React from 'react';
import Preferences from './Preferences';

interface PreferencesScreenProps {
  sessionId: string;
  onCitySelect: (city: string) => void;
}

const PreferencesScreen: React.FC<PreferencesScreenProps> = ({ sessionId, onCitySelect }) => {
  return (
    <Preferences
      sessionId={sessionId}
      onCitySelect={onCitySelect}
    />
  );
};

export default PreferencesScreen;
