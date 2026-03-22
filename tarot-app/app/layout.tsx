import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '판타로즈 타로 | Fantarose Tarot',
  description: '라티, 루미, 피피와 함께하는 힐링 타로. 오늘의 나를 만나는 시간.',
  openGraph: {
    title: '판타로즈 타로 | Fantarose Tarot',
    description: '라티, 루미, 피피와 함께하는 힐링 타로',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
