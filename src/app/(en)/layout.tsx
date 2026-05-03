import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale="en" />
      <div id="main-content" className="flex-1">{children}</div>
      <Footer locale="en" />
      <FloatingCTA locale="en" />
    </div>
  )
}
