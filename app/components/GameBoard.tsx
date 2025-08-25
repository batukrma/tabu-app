'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';
import TabooCard from './TabooCard';
import { TabooWord } from '../types/game';
import wordsData from '../../words.json';

export default function GameBoard() {
    const { state, pauseGame, resumeGame, endGame, addPoints, nextWord } = useGame();
    const [currentWords, setCurrentWords] = useState<TabooWord[]>([]);
    const [shuffledWords, setShuffledWords] = useState<TabooWord[]>([]);
    const [wordsError, setWordsError] = useState<string | null>(null);

    useEffect(() => {
        try {
            // Shuffle words for the current round
            if (wordsData && Array.isArray(wordsData)) {
                const shuffled = [...wordsData].sort(() => Math.random() - 0.5);
                setShuffledWords(shuffled);
                setWordsError(null);
            } else {
                setWordsError('Kelimeler yüklenemedi');
            }
        } catch (error) {
            console.error('Error loading words:', error);
            setWordsError('Kelimeler yüklenirken hata oluştu');
        }
    }, [state.currentRound]);

    useEffect(() => {
        // Get words for current round
        if (shuffledWords.length > 0) {
            const startIndex = (state.currentRound - 1) * state.wordsPerRound;
            const roundWords = shuffledWords.slice(startIndex, startIndex + state.wordsPerRound);
            setCurrentWords(roundWords);
        }
    }, [shuffledWords, state.currentRound, state.wordsPerRound]);

    const handleCorrect = () => {
        addPoints(state.currentTeamIndex, 1);
        nextWord();
    };

    const handlePass = () => {
        nextWord();
    };

    const handleTaboo = () => {
        addPoints(state.currentTeamIndex, -1);
        nextWord();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getCurrentWord = () => {
        if (currentWords.length === 0 || state.currentWordIndex >= currentWords.length) {
            return null;
        }
        return currentWords[state.currentWordIndex];
    };

    const currentWord = getCurrentWord();
    const currentTeam = state.teams[state.currentTeamIndex];

    if (wordsError) {
        return (
            <div className="text-center p-8">
                <div className="text-2xl font-bold text-red-600 mb-4">❌ Hata</div>
                <div className="text-lg text-gray-700 mb-4">{wordsError}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    Sayfayı Yenile
                </button>
            </div>
        );
    }

    if (!currentWord || !currentTeam) {
        return (
            <div className="text-center p-8">
                <div className="text-2xl font-bold text-gray-800 mb-4">Oyun Yükleniyor...</div>
                <div className="text-gray-600">Lütfen bekleyin...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header with Game Info */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-white/50">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-2">
                                🎯 Tabu Oyunu
                            </h1>
                            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                                    <span className="text-blue-600 font-bold">🏆</span>
                                    <span className="font-semibold">Tur {state.currentRound} / {state.totalRounds}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                                    <span className="text-green-600 font-bold">📝</span>
                                    <span className="font-semibold">Kelime {state.currentWordIndex + 1} / {state.wordsPerRound}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Timer */}
                            <div className="text-center bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-4 shadow-lg">
                                <div className="text-3xl md:text-4xl font-black text-white">
                                    {formatTime(state.timeRemaining)}
                                </div>
                                <div className="text-sm text-red-100 font-medium">⏰ Kalan Süre</div>
                            </div>

                            {/* Game Controls */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                {state.isPaused ? (
                                    <button
                                        onClick={resumeGame}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-green-400/50"
                                    >
                                        <span className="text-xl mr-2">▶️</span>
                                        Devam Et
                                    </button>
                                ) : (
                                    <button
                                        onClick={pauseGame}
                                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-yellow-400/50"
                                    >
                                        <span className="text-xl mr-2">⏸️</span>
                                        Duraklat
                                    </button>
                                )}

                                <button
                                    onClick={endGame}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-red-400/50"
                                >
                                    <span className="text-xl mr-2">🏁</span>
                                    Oyunu Bitir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Scoreboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {state.teams.map((team, index) => (
                        <div
                            key={team.id}
                            className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 transition-all duration-500 transform hover:scale-105 ${index === state.currentTeamIndex
                                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl scale-105'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {/* Current turn indicator */}
                            {index === state.currentTeamIndex && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                    🎯 SIRA
                                </div>
                            )}

                            <div className="text-center">
                                <h3 className={`text-xl md:text-2xl font-black mb-3 ${index === state.currentTeamIndex ? 'text-blue-700' : 'text-gray-800'
                                    }`}>
                                    {team.name}
                                </h3>

                                <div className="mb-4">
                                    <div className={`text-4xl md:text-5xl font-black ${index === state.currentTeamIndex ? 'text-blue-600' : 'text-green-600'
                                        }`}>
                                        {team.score}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Puan</div>
                                </div>

                                <div className="space-y-2">
                                    {team.players.map((player, playerIndex) => (
                                        <div
                                            key={playerIndex}
                                            className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200"
                                        >
                                            👤 {player}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Team Highlight */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white text-center shadow-2xl border border-blue-400/30">
                    <h2 className="text-2xl md:text-3xl font-black mb-3">
                        🎮 Sıra: {currentTeam.name}
                    </h2>
                    <p className="text-blue-100 text-lg">
                        {currentTeam.players.join(', ')} takımı oynuyor
                    </p>
                </div>

                {/* Taboo Card */}
                <div className="flex justify-center animate-fade-in">
                    <TabooCard
                        word={currentWord}
                        onCorrect={handleCorrect}
                        onPass={handlePass}
                        onTaboo={handleTaboo}
                        isActive={!state.isPaused}
                    />
                </div>

                {/* Enhanced Game Progress */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/50">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-700">📊 Oyun İlerlemesi</span>
                            <span className="text-lg font-bold text-gray-700">
                                {state.currentWordIndex + 1} / {state.wordsPerRound} kelime
                            </span>
                        </div>

                        <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                                    style={{ width: `${((state.currentWordIndex + 1) / state.wordsPerRound) * 100}%` }}
                                ></div>
                            </div>

                            {/* Progress markers */}
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                                <span>Başlangıç</span>
                                <span>Bitiş</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Game Rules */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 md:p-8 shadow-lg">
                    <h3 className="font-black text-yellow-800 mb-4 text-xl flex items-center gap-2">
                        <span className="text-2xl">📖</span>
                        Oyun Kuralları
                    </h3>
                    <ul className="text-sm md:text-base text-yellow-700 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Ana kelimeyi yasaklı kelimeleri kullanmadan açıklayın
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Takım arkadaşlarınız kelimeyi tahmin etmeye çalışsın
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Yasaklı kelimelerden birini söylerseniz -1 puan
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            Doğru tahmin +1 puan, pas geçmek 0 puan
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
