'use client';

import React, { useState } from 'react';
import { Team, GameSettings } from '../types/game';

interface TeamSetupProps {
  onStartGame: (teams: Team[], settings: GameSettings) => void;
}

export default function TeamSetup({ onStartGame }: TeamSetupProps) {
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [playersPerTeam, setPlayersPerTeam] = useState(2);
  const [roundTime, setRoundTime] = useState(60);
  const [wordsPerRound, setWordsPerRound] = useState(5);
  const [totalRounds, setTotalRounds] = useState(3);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showTeamNames, setShowTeamNames] = useState(false);

  const handleContinue = () => {
    const newTeams: Team[] = Array.from({ length: numberOfTeams }, (_, index) => ({
      id: `team-${index + 1}`,
      name: `Takım ${index + 1}`,
      score: 0,
      players: Array.from({ length: playersPerTeam }, (_, playerIndex) => `Oyuncu ${playerIndex + 1}`),
    }));
    setTeams(newTeams);
    setShowTeamNames(true);
  };

  const handleTeamNameChange = (teamIndex: number, name: string) => {
    setTeams(prev => prev.map((team, index) => 
      index === teamIndex ? { ...team, name } : team
    ));
  };

  const handlePlayerNameChange = (teamIndex: number, playerIndex: number, name: string) => {
    setTeams(prev => prev.map((team, index) => 
      index === teamIndex 
        ? { 
            ...team, 
            players: team.players.map((player, pIndex) => 
              pIndex === playerIndex ? name : player
            )
          }
        : team
    ));
  };

  const handleStartGame = () => {
    const settings: GameSettings = {
      numberOfTeams,
      playersPerTeam,
      roundTime,
      wordsPerRound,
      totalRounds,
    };
    onStartGame(teams, settings);
  };

  if (showTeamNames) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-4">
              🏆 Takım İsimleri ve Oyuncular
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Her takım için isim belirleyin ve oyuncuları adlandırın
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {teams.map((team, teamIndex) => (
              <div 
                key={team.id} 
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 transform hover:scale-105"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {teamIndex + 1}
                    </div>
                    <label className="block text-lg font-bold text-gray-700">
                      Takım İsmi
                    </label>
                  </div>
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleTeamNameChange(teamIndex, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all duration-200"
                    placeholder={`Takım ${teamIndex + 1}`}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-bold text-gray-700 flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    Oyuncular
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {team.players.map((player, playerIndex) => (
                      <input
                        key={playerIndex}
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerNameChange(teamIndex, playerIndex, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-base font-medium transition-all duration-200"
                        placeholder={`Oyuncu ${playerIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <button
              onClick={() => setShowTeamNames(false)}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-400/50"
            >
              <span className="text-xl mr-2">⬅️</span>
              Geri
            </button>
            <button
              onClick={handleStartGame}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-green-400/50"
            >
              <span className="text-xl mr-2">🚀</span>
              Oyunu Başlat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-4">
            🎯 Tabu Oyunu
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Oyun ayarlarını yapılandırın ve eğlenceli bir oyun deneyimi yaşayın!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Game Settings */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Takım Sayısı
                </label>
                <select
                  value={numberOfTeams}
                  onChange={(e) => setNumberOfTeams(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all duration-200"
                >
                  {[2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Takım</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Takım Başına Oyuncu
                </label>
                <select
                  value={playersPerTeam}
                  onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all duration-200"
                >
                  {[2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Oyuncu</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⏰</span>
                  Tur Süresi
                </label>
                <select
                  value={roundTime}
                  onChange={(e) => setRoundTime(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all duration-200"
                >
                  {[30, 45, 60, 90, 120].map(num => (
                    <option key={num} value={num}>{num} saniye</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Tur Başına Kelime
                </label>
                <select
                  value={wordsPerRound}
                  onChange={(e) => setWordsPerRound(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all duration-200"
                >
                  {[3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} kelime</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              Toplam Tur Sayısı
            </label>
            <select
              value={totalRounds}
              onChange={(e) => setTotalRounds(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all duration-200"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} tur</option>
              ))}
            </select>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-blue-400/50"
            >
              <span className="text-2xl mr-3">➡️</span>
              Devam Et
            </button>
          </div>
        </div>

        {/* Game Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 md:p-8 border-2 border-blue-200/50">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">🎮 Oyun Önizlemesi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">{numberOfTeams}</div>
              <div className="text-sm text-gray-600">Takım</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-green-600">{numberOfTeams * playersPerTeam}</div>
              <div className="text-sm text-gray-600">Toplam Oyuncu</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">{roundTime}s</div>
              <div className="text-sm text-gray-600">Tur Süresi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
