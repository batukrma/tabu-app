'use client';

import React, { useState, useEffect } from 'react';
import { TabooWord } from '../types/game';

interface TabooCardProps {
    word: TabooWord;
    onCorrect: () => void;
    onPass: () => void;
    onTaboo: () => void;
    isActive: boolean;
}

export default function TabooCard({ word, onCorrect, onPass, onTaboo, isActive }: TabooCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleCardClick = () => {
        if (isActive && !isAnimating) {
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
            setTimeout(() => setIsAnimating(false), 600);
        }
    };

    // Reset card when word changes
    useEffect(() => {
        setIsFlipped(false);
    }, [word.word]);

    return (
        <div className="max-w-md mx-auto px-4">
            {/* Main Card */}
            <div
                className={`card-flip ${isFlipped ? 'flipped' : ''} cursor-pointer transition-all duration-500 ${isActive ? 'hover:scale-105 hover:shadow-2xl' : 'opacity-60'
                    } ${isAnimating ? 'pointer-events-none' : ''}`}
                onClick={handleCardClick}
            >
                <div className="card-flip-inner">
                    {/* Front of card - Main Word */}
                    <div className="card-front">
                        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white text-center min-h-[350px] md:min-h-[400px] flex flex-col justify-center overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
                                <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold mb-3 text-yellow-200">Ana Kelime</h2>
                                    <div className="text-4xl md:text-5xl font-black tracking-wide break-words leading-tight bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                                        {word.word}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-red-200 flex items-center justify-center gap-2">
                                        <span className="text-2xl">🚫</span>
                                        Yasaklı Kelimeler
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {word.forbidden_words.map((forbidden, index) => (
                                            <div
                                                key={index}
                                                className="bg-red-500/30 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-semibold border-2 border-red-400/50 shadow-lg transform hover:scale-105 transition-transform duration-200"
                                            >
                                                {forbidden}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {isActive && (
                                    <div className="mt-6 text-sm text-blue-100 bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
                                        <span className="text-lg mr-2">💡</span>
                                        Kartı çevirmek için tıklayın
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Back of card - Scoring Rules */}
                    <div className="card-back">
                        <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white text-center min-h-[350px] md:min-h-[400px] flex flex-col justify-center overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
                                <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold mb-4">📊 Puanlama</h2>
                                    <div className="text-6xl mb-4">🎯</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-green-500/30 backdrop-blur-sm rounded-xl p-4 border-2 border-green-400/50 shadow-lg transform hover:scale-105 transition-transform duration-200">
                                        <div className="text-lg font-bold text-green-200">✅ Doğru Tahmin</div>
                                        <div className="text-3xl font-black text-green-100">+1 Puan</div>
                                    </div>

                                    <div className="bg-yellow-500/30 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-400/50 shadow-lg transform hover:scale-105 transition-transform duration-200">
                                        <div className="text-lg font-bold text-yellow-200">⏭️ Pas Geç</div>
                                        <div className="text-3xl font-black text-yellow-100">0 Puan</div>
                                    </div>

                                    <div className="bg-red-500/30 backdrop-blur-sm rounded-xl p-4 border-2 border-red-400/50 shadow-lg transform hover:scale-105 transition-transform duration-200">
                                        <div className="text-lg font-bold text-red-200">❌ Tabu Kelime</div>
                                        <div className="text-3xl font-black text-red-100">-1 Puan</div>
                                    </div>
                                </div>

                                {isActive && (
                                    <div className="mt-6 text-sm text-cyan-100 bg-cyan-500/20 rounded-lg p-3 border border-cyan-400/30">
                                        <span className="text-lg mr-2">🔄</span>
                                        Kartı tekrar çevirmek için tıklayın
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {isActive && (
                <div className="mt-8 space-y-4 animate-fade-in">
                    {/* Desktop version - 3 column grid */}
                    <div className="hidden sm:grid grid-cols-3 gap-4">
                        <button
                            onClick={onCorrect}
                            className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg border-2 border-green-400/50 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <span className="text-2xl">✅</span>
                                <span className="text-lg">Doğru</span>
                            </div>
                        </button>

                        <button
                            onClick={onPass}
                            className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg border-2 border-yellow-400/50 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <span className="text-2xl">⏭️</span>
                                <span className="text-lg">Pas</span>
                            </div>
                        </button>

                        <button
                            onClick={onTaboo}
                            className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg border-2 border-red-400/50 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <span className="text-2xl">❌</span>
                                <span className="text-lg">Tabu</span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile version - single column layout */}
                    <div className="sm:hidden space-y-3">
                        <button
                            onClick={onCorrect}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-green-400/50"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-2xl">✅</span>
                                <span className="text-xl">Doğru</span>
                            </div>
                        </button>

                        <button
                            onClick={onPass}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-yellow-400/50"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-2xl">⏭️</span>
                                <span className="text-xl">Pas</span>
                            </div>
                        </button>

                        <button
                            onClick={onTaboo}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-red-400/50"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-2xl">❌</span>
                                <span className="text-xl">Tabu</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
