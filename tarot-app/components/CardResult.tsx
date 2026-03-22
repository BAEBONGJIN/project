'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { TarotCard, Character, SpreadMode, characters } from '@/lib/tarotData'

interface Props {
  cards: TarotCard[]
  character: Character
  spreadMode: SpreadMode
  onReset: () => void
}

const colorMap = {
  coral: {
    bg: '#FFB3A7',
    light: 'rgba(255,179,167,0.15)',
    border: 'rgba(255,179,167,0.4)',
    text: '#FFB3A7',
  },
  purple: {
    bg: '#7B5EA7',
    light: 'rgba(123,94,167,0.15)',
    border: 'rgba(123,94,167,0.4)',
    text: '#C9B8E8',
  },
  gray: {
    bg: '#9EA3B0',
    light: 'rgba(158,163,176,0.15)',
    border: 'rgba(158,163,176,0.4)',
    text: '#C5C8D0',
  },
}

const positionLabels = ['과거', '현재', '미래']
const positionEmojis = ['📷', '🕊️', '🌸']

export default function CardResult({ cards, character, spreadMode, onReset }: Props) {
  const char = characters[character]
  const resultRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    const text =
      spreadMode === 'single'
        ? `오늘 판타로즈 타로에서 [${cards[0].nameKo}] 카드가 나왔어요!\n\n"${cards[0].healingMessage}"\n\n판타로즈 타로 해보기 →`
        : `오늘 판타로즈 3카드 스프레드 결과:\n과거: ${cards[0].nameKo} / 현재: ${cards[1].nameKo} / 미래: ${cards[2].nameKo}\n\n판타로즈 타로 해보기 →`

    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('📋 결과가 복사됐어요! SNS에 붙여넣기 해봐요.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen px-6 py-10 overflow-y-auto"
    >
      {/* 헤더 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
          style={{
            background: `radial-gradient(circle, ${char.color}33, ${char.color}11)`,
            border: `2px solid ${char.color}66`,
          }}
        >
          {char.emoji}
        </div>
        <h2 className="text-xl font-bold text-white mb-1">
          {char.name}의 해석
        </h2>
        <p className="text-white/40 text-sm">
          {spreadMode === 'single' ? '오늘의 카드' : '과거 · 현재 · 미래'}
        </p>
      </motion.div>

      {/* 결과 컨테이너 */}
      <div ref={resultRef} className="w-full max-w-sm space-y-5">
        {cards.map((card, index) => {
          const colors = colorMap[card.colorTheme]
          const message = card.characterMessages[character]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: colors.light,
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* 카드 헤더 */}
              {spreadMode === 'three' && (
                <div
                  className="px-4 py-2 flex items-center gap-2"
                  style={{ background: colors.bg + '22', borderBottom: `1px solid ${colors.border}` }}
                >
                  <span className="text-sm">{positionEmojis[index]}</span>
                  <span className="text-xs font-medium" style={{ color: colors.text }}>
                    {positionLabels[index]}
                  </span>
                </div>
              )}

              <div className="p-5">
                {/* 카드 정보 */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-16 h-22 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.bg}44, ${colors.bg}22)`,
                      border: `1px solid ${colors.border}`,
                      width: 64,
                      height: 90,
                    }}
                  >
                    <div className="text-2xl mb-1">{card.emoji}</div>
                    <div className="text-xs text-white/40">{card.id.toString().padStart(2, '0')}</div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white text-lg font-bold mb-0.5">
                      {card.nameKo}
                    </h3>
                    <p className="text-white/40 text-xs mb-2">{card.nameEn}</p>
                    <div className="flex gap-1 flex-wrap">
                      {card.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: colors.bg + '33', color: colors.text }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 전통 타로 해석 */}
                <div
                  className="rounded-xl p-4 mb-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}` }}
                >
                  <p
                    className="text-xs font-semibold mb-2 uppercase tracking-widest"
                    style={{ color: colors.text + '99' }}
                  >
                    전통 해석
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {card.traditionalMeaning}
                  </p>
                </div>

                {/* 힐링 메시지 */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <p
                    className="text-sm font-medium leading-relaxed text-center italic"
                    style={{ color: colors.text }}
                  >
                    "{card.healingMessage}"
                  </p>
                </div>

                {/* 캐릭터 해석 */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                    style={{
                      background: char.color + '22',
                      border: `1px solid ${char.color}44`,
                    }}
                  >
                    {char.emoji}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* 3장 스프레드 종합 메시지 */}
        {spreadMode === 'three' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl p-5 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(244,200,117,0.1), rgba(255,179,167,0.1))',
              border: '1px solid rgba(244,200,117,0.3)',
            }}
          >
            <div className="text-2xl mb-2">🌹</div>
            <p className="text-white/70 text-sm leading-relaxed">
              <span style={{ color: '#C9B8E8' }}>{cards[0].nameKo}</span>
              {' '}→{' '}
              <span style={{ color: '#9EA3B0' }}>{cards[1].nameKo}</span>
              {' '}→{' '}
              <span style={{ color: '#FFB3A7' }}>{cards[2].nameKo}</span>
            </p>
            <p className="text-white/40 text-xs mt-2">
              지나온 것들이 지금을 만들었고, 지금이 앞을 만들어요.
            </p>
          </motion.div>
        )}
      </div>

      {/* 액션 버튼들 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 w-full max-w-sm space-y-3"
      >
        {/* 공유 버튼 */}
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${char.color}, #F4C875)`,
            color: '#1A0F2E',
          }}
        >
          📤 결과 공유하기
        </button>

        {/* 다시 뽑기 */}
        <button
          onClick={onReset}
          className="w-full py-3 rounded-full text-sm font-medium border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          🔮 다시 뽑기
        </button>

        {/* SNS 링크 */}
        <p className="text-center text-white/30 text-xs py-2">
          오늘의 에피소드도 확인해봐요 →{' '}
          <span
            className="underline cursor-pointer hover:text-white/50 transition-colors"
            style={{ color: char.color + 'bb' }}
          >
            @fantarose_official
          </span>
        </p>
      </motion.div>

      {/* 브랜드 워터마크 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-6 text-center text-white/20 text-xs"
      >
        <p>🌹 Fantarose Tarot</p>
        <p>점이 아니라, 오늘의 나를 만나는 시간</p>
      </motion.div>
    </motion.div>
  )
}
