'use client'

import { motion } from 'framer-motion'
import { Character, SpreadMode, characters } from '@/lib/tarotData'

interface Props {
  character: Character
  onSelect: (mode: SpreadMode) => void
  onBack: () => void
}

export default function SpreadSelect({ character, onSelect, onBack }: Props) {
  const char = characters[character]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
    >
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/50 hover:text-white/80 transition-colors text-sm flex items-center gap-1"
      >
        ← 돌아가기
      </button>

      {/* 헤더 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-10"
      >
        <p className="text-white/50 text-sm mb-2">Step 2 / 2</p>

        {/* 선택된 캐릭터 */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{
              background: `radial-gradient(circle, ${char.color}33, ${char.color}11)`,
              border: `1px solid ${char.color}66`,
            }}
          >
            {char.emoji}
          </div>
          <span style={{ color: char.color }} className="text-sm font-medium">
            {char.name}에게 묻기로 했어요
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          어떻게 뽑을까요?
        </h2>
        <p className="text-white/50 text-sm">
          오늘의 질문에 맞는 방식을 골라봐요
        </p>
      </motion.div>

      {/* 스프레드 선택 */}
      <div className="flex flex-col gap-5 w-full max-w-sm">
        {/* 1장 뽑기 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('single')}
          className="relative p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all text-left group"
        >
          {/* 카드 미리보기 */}
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-24 rounded-xl flex items-center justify-center text-2xl border-2"
              style={{
                background: `linear-gradient(135deg, ${char.color}22, ${char.color}44)`,
                borderColor: char.color + '88',
              }}
            >
              🃏
            </div>
          </div>

          <h3 className="text-white text-lg font-semibold text-center mb-1">
            오늘의 카드 (1장)
          </h3>
          <p className="text-white/50 text-sm text-center leading-relaxed">
            지금 당신에게 필요한 메시지<br />
            가볍게 하루를 시작하고 싶을 때
          </p>

          <div
            className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full font-medium"
            style={{
              background: char.color + '33',
              color: char.color,
            }}
          >
            추천
          </div>
        </motion.button>

        {/* 3장 스프레드 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('three')}
          className="relative p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all text-left group"
        >
          {/* 카드 미리보기 */}
          <div className="flex justify-center gap-2 mb-4">
            {[
              { label: '과거', emoji: '📷', color: characters.lumi.color },
              { label: '현재', emoji: '🕊️', color: characters.pipi.color },
              { label: '미래', emoji: '🌸', color: characters.lati.color },
            ].map((card) => (
              <div key={card.label} className="text-center">
                <div
                  className="w-12 h-18 rounded-lg flex items-center justify-center text-lg border"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}22, ${card.color}44)`,
                    borderColor: card.color + '66',
                    height: '72px',
                    width: '48px',
                  }}
                >
                  {card.emoji}
                </div>
                <p className="text-xs text-white/40 mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white text-lg font-semibold text-center mb-1">
            3카드 스프레드
          </h3>
          <p className="text-white/50 text-sm text-center leading-relaxed">
            과거 · 현재 · 미래의 흐름<br />
            <span className="text-xs text-white/30">루미(과거) · 피피(현재) · 라티(미래)</span>
          </p>
        </motion.button>
      </div>

      {/* 힌트 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-white/30 text-xs text-center"
      >
        마음이 가는 방식을 선택해봐요
      </motion.p>
    </motion.div>
  )
}
