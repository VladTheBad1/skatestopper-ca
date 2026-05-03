import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale="fr" />
      <div id="main-content" className="flex-1">{children}</div>
      <Footer locale="fr" />
      <FloatingCTA locale="fr" />
    </div>
  )
}
