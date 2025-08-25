'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GameState, GameSettings } from '../types/game';

interface GameAction {
  type: string;
  payload?: unknown;
}

const initialState: GameState = {
  teams: [],
  currentTeamIndex: 0,
  currentRound: 1,
  currentWordIndex: 0,
  isGameActive: false,
  isPaused: false,
  timeRemaining: 60,
  roundTime: 60,
  wordsPerRound: 5,
  totalRounds: 3,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_TEAMS':
      return { ...state, teams: action.payload as GameState['teams'] };
    case 'UPDATE_TEAM_SCORE':
      return {
        ...state,
        teams: state.teams.map((team, index) =>
          index === (action.payload as { teamIndex: number }).teamIndex
            ? { ...team, score: team.score + (action.payload as { points: number }).points }
            : team
        ),
      };
    case 'NEXT_TEAM':
      return {
        ...state,
        currentTeamIndex: (state.currentTeamIndex + 1) % state.teams.length,
        currentWordIndex: 0,
        timeRemaining: state.roundTime,
      };
    case 'NEXT_ROUND':
      return {
        ...state,
        currentRound: state.currentRound + 1,
        currentTeamIndex: 0,
        currentWordIndex: 0,
        timeRemaining: state.roundTime,
      };
    case 'NEXT_WORD':
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
      };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.payload as boolean };
    case 'SET_PAUSED':
      return { ...state, isPaused: action.payload as boolean };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.payload as number };
    case 'SET_GAME_SETTINGS':
      return { ...state, ...(action.payload as GameSettings) };
    case 'RESET_GAME':
      return {
        ...initialState,
        teams: state.teams.map(team => ({ ...team, score: 0 })),
        currentRound: 1,
        currentTeamIndex: 0,
        currentWordIndex: 0,
        timeRemaining: state.roundTime,
      };
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: (settings: GameSettings) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  addPoints: (teamIndex: number, points: number) => void;
  nextWord: () => void;
  nextTeam: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const nextTeam = useCallback(() => {
    if (state.currentWordIndex >= state.wordsPerRound - 1) {
      if (state.currentTeamIndex >= state.teams.length - 1) {
        if (state.currentRound >= state.totalRounds) {
          dispatch({ type: 'SET_GAME_ACTIVE', payload: false });
          return;
        }
        dispatch({ type: 'NEXT_ROUND' });
      } else {
        dispatch({ type: 'NEXT_TEAM' });
      }
    } else {
      dispatch({ type: 'NEXT_WORD' });
    }
  }, [state.currentWordIndex, state.wordsPerRound, state.currentTeamIndex, state.teams.length, state.currentRound, state.totalRounds]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state.isGameActive && !state.isPaused && state.timeRemaining > 0) {
      timer = setTimeout(() => {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeRemaining - 1 });
      }, 1000);
    } else if (state.timeRemaining === 0 && state.isGameActive) {
      // Time's up, move to next team
      nextTeam();
    }

    return () => clearTimeout(timer);
  }, [state.isGameActive, state.isPaused, state.timeRemaining, nextTeam]);

  const startGame = (settings: GameSettings) => {
    dispatch({ type: 'SET_GAME_SETTINGS', payload: settings });
    dispatch({ type: 'SET_GAME_ACTIVE', payload: true });
    dispatch({ type: 'SET_PAUSED', payload: false });
  };

  const pauseGame = () => {
    dispatch({ type: 'SET_PAUSED', payload: true });
  };

  const resumeGame = () => {
    dispatch({ type: 'SET_PAUSED', payload: false });
  };

  const endGame = () => {
    dispatch({ type: 'SET_GAME_ACTIVE', payload: false });
    dispatch({ type: 'SET_PAUSED', payload: false });
  };

  const addPoints = (teamIndex: number, points: number) => {
    dispatch({ type: 'UPDATE_TEAM_SCORE', payload: { teamIndex, points } });
  };

  const nextWord = () => {
    dispatch({ type: 'NEXT_WORD' });
  };

  const value: GameContextType = {
    state,
    dispatch,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    addPoints,
    nextWord,
    nextTeam,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
