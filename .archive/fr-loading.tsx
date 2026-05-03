export default function LoadingFr() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#1B5E20]/20 border-t-[#1B5E20] rounded-full animate-spin" />
        <p className="text-sm text-[#64748b]">Chargement...</p>
      </div>
    </div>
  )
}
