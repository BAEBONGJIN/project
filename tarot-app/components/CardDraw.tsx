'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TarotCard, Character, SpreadMode, characters } from '@/lib/tarotData'

interface Props {
  cards: TarotCard[]
  character: Character
  spreadMode: SpreadMode
  onComplete: () => void
}

const colorMap = {
  coral: { bg: '#FFB3A7', glow: 'glow-coral', text: '#FFB3A7' },
  purple: { bg: '#7B5EA7', glow: 'glow-purple', text: '#C9B8E8' },
  gray: { bg: '#9EA3B0', glow: 'glow-gray', text: '#C5C8D0' },
}

export default function CardDraw({ cards, character, spreadMode, onComplete }: Props) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [isReady, setIsReady] = useState(false)
  const char = characters[character]

  const handleFlip = (index: number) => {
    const newFlipped = new Set(flippedCards)
    newFlipped.add(index)
    setFlippedCards(newFlipped)

    if (newFlipped.size === cards.length) {
      setTimeout(() => setIsReady(true), 600)
    }
  }

  const positionLabels = ['과거', '현재', '미래']
  const positionChars = [characters.lumi, characters.pipi, characters.lati]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
    >
      {/* 캐릭터 & 안내 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
          style={{
            background: `radial-gradient(circle, ${char.color}33, ${char.color}11)`,
            border: `2px solid ${char.color}66`,
          }}
        >
          {char.emoji}
        </div>
        <p style={{ color: char.color }} className="text-sm font-medium mb-2">
          {char.name}이(가) 카드를 준비했어요
        </p>
        <h2 className="text-xl font-bold text-white mb-2">
          {flippedCards.size === 0
            ? '카드를 탭해서 뒤집어봐요'
            : flippedCards.size < cards.length
            ? `${cards.length - flippedCards.size}장 더 뒤집어봐요`
            : '모든 카드를 확인했어요'}
        </h2>
        <p className="text-white/40 text-xs">
          마음을 가라앉히고 천천히 선택해봐요
        </p>
      </motion.div>

      {/* 카드들 */}
      <div className={`flex gap-5 mb-10 ${spreadMode === 'three' ? 'flex-row' : ''}`}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.has(index)
          const colors = colorMap[card.colorTheme]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="flex flex-col items-center"
            >
              {/* 위치 라벨 (3장 모드) */}
              {spreadMode === 'three' && (
                <div className="mb-3 text-center">
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: positionChars[index].color }}
                  >
                    {positionChars[index].emoji} {positionLabels[index]}
                  </p>
                  <p className="text-xs text-white/30">{positionChars[index].name}</p>
                </div>
              )}

              {/* 카드 */}
              <div
                className="card-container cursor-pointer"
                style={{ width: spreadMode === 'single' ? 180 : 110, height: spreadMode === 'single' ? 280 : 170 }}
                onClick={() => !isFlipped && handleFlip(index)}
              >
                <div className={`card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>
                  {/* 카드 앞면 (뒷면 디자인) */}
                  <div className="card-front w-full h-full">
                    <motion.div
                      className="w-full h-full rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
                      whileHover={!isFlipped ? { scale: 1.05 } : {}}
                      style={{
                        background: 'linear-gradient(135deg, #2A1B4E, #1A0F2E)',
                        border: `2px solid ${char.color}44`,
                      }}
                    >
                      {/* 패턴 */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-4 rounded-xl border border-white/30" />
                        <div className="absolute inset-6 rounded-lg border border-white/20" />
                      </div>

                      <div className="text-5xl animate-pulse-soft mb-2">🌹</div>
                      <p className="text-white/30 text-xs tracking-widest">FANTAROSE</p>

                      {!isFlipped && (
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute bottom-4 text-xs text-white/40"
                        >
                          탭해서 열기
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* 카드 뒷면 (실제 카드) */}
                  <div className="card-back w-full h-full">
                    <motion.div
                      initial={false}
                      animate={isFlipped ? { boxShadow: `0 0 30px ${colors.bg}66` } : {}}
                      className="w-full h-full rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${colors.bg}33, ${colors.bg}11, #1A0F2E)`,
                        border: `2px solid ${colors.bg}88`,
                      }}
                    >
                      {/* 상단 카드 번호 */}
                      <div className="absolute top-3 left-0 right-0 flex justify-center">
                        <span className="text-xs text-white/50 tracking-widest">
                          {card.id.toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* 이모지 */}
                      <div className="text-5xl mb-3 animate-float-gentle">
                        {card.emoji}
                      </div>

                      {/* 카드명 */}
                      <p className="text-white font-bold text-sm mb-1">
                        {card.nameKo}
                      </p>
                      <p className="text-white/40 text-xs mb-3">
                        {card.nameEn}
                      </p>

                      {/* 키워드 */}
                      <div className="flex gap-1 flex-wrap justify-center px-2">
                        {card.keywords.slice(0, 2).map((kw) => (
                          <span
                            key={kw}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: colors.bg + '33',
                              color: colors.text,
                            }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 결과 보기 버튼 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isReady && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-8 py-3 rounded-full font-semibold glow-gold"
            style={{
              background: `linear-gradient(135deg, ${char.color}, #F4C875)`,
              color: '#1A0F2E',
            }}
          >
            {char.name}의 해석 보기 ✨
          </motion.button>
        )}
      </motion.div>

      {/* 진행 상태 */}
      <div className="mt-6 flex gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: flippedCards.has(i)
                ? char.color
                : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
