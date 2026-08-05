export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return
  const { initLeadsHubFlusher } = await import("@/lib/leads-hub")
  initLeadsHubFlusher()
}
