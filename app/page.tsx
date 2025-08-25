'use client';

import React, { Suspense } from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import TeamSetup from './components/TeamSetup';
import GameBoard from './components/GameBoard';
import GameResults from './components/GameResults';
import { Team, GameSettings } from './types/game';

function GameApp() {
  const { state, dispatch } = useGame();

  const handleStartGame = (teams: Team[], settings: GameSettings) => {
    dispatch({ type: 'SET_TEAMS', payload: teams });
    dispatch({ type: 'SET_GAME_SETTINGS', payload: settings });
    dispatch({ type: 'SET_GAME_ACTIVE', payload: true });
  };

  // Debug logging
  console.log('GameApp render:', {
    isGameActive: state.isGameActive,
    currentRound: state.currentRound,
    totalRounds: state.totalRounds
  });

  if (!state.isGameActive) {
    return <TeamSetup onStartGame={handleStartGame} />;
  }

  if (state.currentRound > state.totalRounds) {
    return <GameResults />;
  }

  return <GameBoard />;
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800">Tabu Oyunu Yükleniyor...</h2>
        <p className="text-gray-600 mt-2">Oyun başlatılıyor...</p>
      </div>
    </div>
  );
}

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            {/* Game Title Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-4 shadow-lg">
              <h1 className="text-3xl md:text-4xl font-black">🎯 Tabu Oyunu - Türkçe Taboo Game</h1>
              <p className="text-indigo-100 mt-1">Türkçe Tabu kelime oyunu - arkadaşlarınızla eğlenceli vakit geçirin!</p>
              <div className="text-xs text-indigo-200 mt-2">
                Build: {new Date().toISOString()} | Version: 1.0.0
              </div>
            </div>

            <GameApp />
          </div>
        </Suspense>
      </GameProvider>
    </ErrorBoundary>
  );
}
