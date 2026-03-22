'use client'

import { motion } from 'framer-motion'
import { Character, characters } from '@/lib/tarotData'

interface Props {
  onSelect: (char: Character) => void
  onBack: () => void
}

const characterDetails = {
  lati: {
    intro: '"이 카드가 나왔다는 건, 좋은 일이 오고 있다는 신호예요!"',
    vibe: '설레고 따뜻한 해석',
    border: 'border-rose-300/50',
    glow: 'glow-coral',
    badge: '🌸 따뜻한 언니/친구',
  },
  lumi: {
    intro: '"...이 카드가 맞네요. 알고 있었을 거예요."',
    vibe: '짧고 차분한 핵심 해석',
    border: 'border-violet-300/50',
    glow: 'glow-purple',
    badge: '📷 조용한 사이다',
  },
  pipi: {
    intro: '(피피가 해당 카드를 발로 콕 찍는 애니메이션)',
    vibe: '행동으로만 전하는 해석',
    border: 'border-slate-300/50',
    glow: 'glow-gray',
    badge: '🕊️ 미스터리한 존재',
  },
}

export default function CharacterSelect({ onSelect, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
    >
      {/* 뒤로가기 */}
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
        <p className="text-white/50 text-sm mb-2">Step 1 / 2</p>
        <h2 className="text-2xl font-bold text-white mb-2">
          누구에게 물어볼까요?
        </h2>
        <p className="text-white/50 text-sm">
          각자 다른 방식으로 카드를 읽어드려요
        </p>
      </motion.div>

      {/* 캐릭터 카드들 */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {(Object.values(characters) as typeof characters[Character][]).map((char, i) => {
          const detail = characterDetails[char.id]
          return (
            <motion.button
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(char.id)}
              className={`
                relative p-5 rounded-2xl border text-left
                bg-white/5 backdrop-blur-sm
                hover:bg-white/10 transition-all duration-300
                ${detail.border}
              `}
            >
              <div className="flex items-start gap-4">
                {/* 캐릭터 아이콘 */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle, ${char.color}33, ${char.color}11)`,
                    border: `2px solid ${char.color}66`,
                  }}
                >
                  {char.emoji}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-lg">{char.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      {char.species}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mb-2">{char.job}</p>
                  <p
                    className="text-xs leading-relaxed italic"
                    style={{ color: char.color }}
                  >
                    {detail.intro}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                      {detail.badge}
                    </span>
                  </div>
                </div>

                {/* 화살표 */}
                <div className="text-white/30 self-center">›</div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* 힌트 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-white/30 text-xs text-center"
      >
        누구에게 물어보느냐에 따라 해석 톤이 달라져요
      </motion.p>
    </motion.div>
  )
}
