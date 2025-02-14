import React, { useState } from 'react';
import BaseballTimeMachine from './components/BaseballTimeMachine';
import { JunkwaxGame } from './components/JunkwaxGame';
import { GameModeSelect } from './components/GameModeSelect';

export default function App() {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  if (!selectedMode) {
    return <GameModeSelect onSelectMode={handleModeSelect} />;
  }

  return selectedMode === 'timemachine' ? <BaseballTimeMachine /> : <JunkwaxGame />;
}