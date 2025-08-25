'use client';

import React from 'react';
import { useGame } from '../contexts/GameContext';

export default function GameResults() {
    const { state, dispatch } = useGame();

    const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
    const winner = sortedTeams[0];
    const isTie = sortedTeams.length > 1 && sortedTeams[0].score === sortedTeams[1].score;

    const handleNewGame = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    const handleBackToSetup = () => {
        dispatch({ type: 'SET_GAME_ACTIVE', payload: false });
        dispatch({ type: 'SET_PAUSED', payload: false });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Winner Announcement */}
                <div className="text-center animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-6">
                        🏆 Oyun Bitti! 🏆
                    </h1>

                    {isTie ? (
                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-yellow-800 mb-4">🤝 Beraberlik!</h2>
                            <p className="text-yellow-700 text-xl md:text-2xl font-semibold">
                                {sortedTeams.filter(team => team.score === winner.score).map(team => team.name).join(' ve ')}
                                takımları eşit puanla birinci oldu! 🎉
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl border-4 border-yellow-300/50">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                🥇 Kazanan: {winner.name}!
                            </h2>
                            <p className="text-yellow-100 text-xl md:text-2xl font-semibold">
                                {winner.score} puan ile birinci oldu! 🎊
                            </p>
                        </div>
                    )}
                </div>

                {/* Final Scores */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-8 text-center">
                        📊 Final Skorları
                    </h3>

                    <div className="space-y-6">
                        {sortedTeams.map((team, index) => (
                            <div
                                key={team.id}
                                className={`relative flex items-center justify-between p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${index === 0
                                    ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-xl'
                                    : index === 1
                                        ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50 shadow-lg'
                                        : index === 2
                                            ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg'
                                            : 'border-gray-200 bg-white shadow-md'
                                    }`}
                            >
                                {/* Medal/Badge */}
                                <div className="flex items-center space-x-6">
                                    <div className={`text-4xl md:text-6xl ${index === 0 ? 'text-yellow-600' :
                                        index === 1 ? 'text-gray-600' :
                                            index === 2 ? 'text-orange-600' : 'text-gray-500'
                                        }`}>
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                                    </div>

                                    <div>
                                        <h4 className={`text-xl md:text-2xl font-black ${index === 0 ? 'text-yellow-800' :
                                            index === 1 ? 'text-gray-800' :
                                                index === 2 ? 'text-orange-800' : 'text-gray-700'
                                            }`}>
                                            {team.name}
                                        </h4>
                                        <p className="text-sm md:text-base text-gray-600 mt-1">
                                            {team.players.join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className={`text-4xl md:text-5xl font-black ${index === 0 ? 'text-yellow-600' :
                                    index === 1 ? 'text-gray-600' :
                                        index === 2 ? 'text-orange-600' : 'text-gray-500'
                                    }`}>
                                    {team.score} Puan
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Game Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="text-4xl md:text-5xl font-black text-blue-600 mb-3">
                            {state.totalRounds}
                        </div>
                        <div className="text-blue-800 font-bold text-lg">Toplam Tur</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="text-4xl md:text-5xl font-black text-green-600 mb-3">
                            {state.wordsPerRound}
                        </div>
                        <div className="text-green-800 font-bold text-lg">Tur Başına Kelime</div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="text-4xl md:text-5xl font-black text-purple-600 mb-3">
                            {state.roundTime}s
                        </div>
                        <div className="text-purple-800 font-bold text-lg">Tur Süresi</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8 animate-fade-in">
                    <button
                        onClick={handleNewGame}
                        className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-green-400/50"
                    >
                        <span className="text-2xl mr-3">🎮</span>
                        Yeni Oyun
                    </button>

                    <button
                        onClick={handleBackToSetup}
                        className="px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-blue-400/50"
                    >
                        <span className="text-2xl mr-3">⚙️</span>
                        Ayarları Değiştir
                    </button>
                </div>

                {/* Congratulations Message */}
                <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-3xl p-8 md:p-12 text-center border-2 border-pink-200/50 shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-black text-purple-800 mb-4">
                        🎊 Tebrikler! 🎊
                    </h3>
                    <p className="text-purple-700 text-lg md:text-xl font-semibold">
                        Harika bir oyun oynadınız! Tüm takımlar için alkış! 👏
                    </p>
                    <div className="mt-6 text-4xl">
                        🎉🎊🎈🎁🎯🏆
                    </div>
                </div>

                {/* Game Summary */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-white/50">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-6 text-center">
                        📋 Oyun Özeti
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                <span className="font-semibold text-gray-700">Toplam Takım:</span>
                                <span className="font-bold text-blue-600">{state.teams.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                <span className="font-semibold text-gray-700">Toplam Oyuncu:</span>
                                <span className="font-bold text-green-600">{state.teams.reduce((acc, team) => acc + team.players.length, 0)}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                <span className="font-semibold text-gray-700">En Yüksek Skor:</span>
                                <span className="font-bold text-yellow-600">{Math.max(...state.teams.map(t => t.score))}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                <span className="font-semibold text-gray-700">En Düşük Skor:</span>
                                <span className="font-bold text-red-600">{Math.min(...state.teams.map(t => t.score))}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
