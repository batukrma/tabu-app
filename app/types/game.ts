export interface TabooWord {
  word: string;
  forbidden_words: string[];
}

export interface Team {
  id: string;
  name: string;
  score: number;
  players: string[];
}

export interface GameState {
  teams: Team[];
  currentTeamIndex: number;
  currentRound: number;
  currentWordIndex: number;
  isGameActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  roundTime: number;
  wordsPerRound: number;
  totalRounds: number;
}

export interface GameSettings {
  numberOfTeams: number;
  playersPerTeam: number;
  roundTime: number;
  wordsPerRound: number;
  totalRounds: number;
}
