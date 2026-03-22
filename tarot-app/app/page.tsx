'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Character, SpreadMode, drawCards, characters } from '@/lib/tarotData'
import CharacterSelect from '@/components/CharacterSelect'
import SpreadSelect from '@/components/SpreadSelect'
import CardDraw from '@/components/CardDraw'
import CardResult from '@/components/CardResult'
import StarlightBg from '@/components/StarlightBg'

type Step = 'home' | 'character' | 'spread' | 'draw' | 'result'

export default function Home() {
  const [step, setStep] = useState<Step>('home')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [selectedSpread, setSelectedSpread] = useState<SpreadMode>('single')
  const [drawnCards, setDrawnCards] = useState<ReturnType<typeof drawCards>>([])

  const handleStart = () => setStep('character')

  const handleCharacterSelect = (char: Character) => {
    setSelectedCharacter(char)
    setStep('spread')
  }

  const handleSpreadSelect = (mode: SpreadMode) => {
    setSelectedSpread(mode)
    const cards = drawCards(mode === 'single' ? 1 : 3)
    setDrawnCards(cards)
    setStep('draw')
  }

  const handleDrawComplete = () => {
    setStep('result')
  }

  const handleReset = () => {
    setStep('home')
    setSelectedCharacter(null)
    setDrawnCards([])
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarlightBg />

      <AnimatePresence mode="wait">
        {step === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
          >
            {/* 로고/타이틀 */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="text-6xl mb-4 animate-float-gentle">🌹</div>
              <h1 className="text-4xl font-bold gradient-text-gold mb-2">
                판타로즈
              </h1>
              <p className="text-lg text-white/60 tracking-widest">
                F A N T A R O S E
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-sm">
                <span>🌸</span>
                <span>타로로 만나는 오늘의 나</span>
                <span>🌸</span>
              </div>
            </motion.div>

            {/* 캐릭터 프리뷰 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-6 mb-12"
            >
              {Object.values(characters).map((char, i) => (
                <motion.div
                  key={char.id}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 border-2"
                    style={{
                      backgroundColor: char.color + '22',
                      borderColor: char.color + '66',
                    }}
                  >
                    {char.emoji}
                  </div>
                  <p className="text-xs text-white/50">{char.name}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* 설명 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-10 max-w-xs"
            >
              <p className="text-white/70 text-sm leading-relaxed">
                라티, 루미, 피피와 함께<br />
                오늘 당신에게 필요한 카드를 뽑아봐요.
              </p>
              <p className="text-white/40 text-xs mt-2">
                점이 아니라, 오늘의 나를 만나는 시간이에요.
              </p>
            </motion.div>

            {/* 시작 버튼 */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-10 py-4 rounded-full text-lg font-semibold relative overflow-hidden group glow-gold"
              style={{
                background: 'linear-gradient(135deg, #F4C875, #FFB3A7)',
                color: '#1A0F2E',
              }}
            >
              <span className="relative z-10">✨ 카드 뽑으러 가기</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            {/* 하단 장식 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex gap-4 text-white/20 text-xs"
            >
              <span>메이저 아르카나 22장</span>
              <span>•</span>
              <span>3가지 캐릭터 해석</span>
              <span>•</span>
              <span>무료 체험</span>
            </motion.div>
          </motion.div>
        )}

        {step === 'character' && (
          <CharacterSelect
            key="character"
            onSelect={handleCharacterSelect}
            onBack={() => setStep('home')}
          />
        )}

        {step === 'spread' && selectedCharacter && (
          <SpreadSelect
            key="spread"
            character={selectedCharacter}
            onSelect={handleSpreadSelect}
            onBack={() => setStep('character')}
          />
        )}

        {step === 'draw' && selectedCharacter && drawnCards.length > 0 && (
          <CardDraw
            key="draw"
            cards={drawnCards}
            character={selectedCharacter}
            spreadMode={selectedSpread}
            onComplete={handleDrawComplete}
          />
        )}

        {step === 'result' && selectedCharacter && drawnCards.length > 0 && (
          <CardResult
            key="result"
            cards={drawnCards}
            character={selectedCharacter}
            spreadMode={selectedSpread}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
