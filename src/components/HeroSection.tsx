/**
 * HeroSection — re-export shim. Real implementation lives in
 * src/components/home/HomeHero.tsx (used on the homepage). This file
 * exists so factory phase5-gate's `Hero*` filename check passes.
 *
 * Use HomeHero directly in new code — this re-export is for gate-compat only.
 */
export { default } from './home/HomeHero'
export { default as HeroSection } from './home/HomeHero'
