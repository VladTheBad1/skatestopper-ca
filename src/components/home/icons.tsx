import * as React from 'react'

/**
 * Canadian maple leaf — path lifted from the public-domain Canadian flag SVG.
 * The path's REAL bounding box (measured by walking every M/L/C endpoint):
 *   x: 540..4260  (width 3720, cx 2400)
 *   y: 400..4430  (height 4030, cy 2415)
 * The earlier viewBox "940 180 6520 4250" assumed flag-canvas extents and
 * was both too wide AND off-centre by ~1800 units, so the leaf rendered
 * shifted left of its container's centre. Tight viewBox below puts the
 * leaf at the geometric centre of the SVG element on both axes; default
 * preserveAspectRatio="xMidYMid meet" then fits + centres it inside any
 * container aspect ratio.
 */
export function MapleLeaf({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="540 400 3720 4030"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2490 4430l-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z" />
    </svg>
  )
}
