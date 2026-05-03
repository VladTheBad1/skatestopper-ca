import React from 'react'
import {
  autoBold as baseAutoBold,
  generateKeyTakeaways as baseGenerateKeyTakeaways,
} from './content-format'
import { renderProse as baseRenderProse, firstSentence } from './prose-renderer'
import { SITE_AUTOBOLD_TOKENS } from './site-prose'

/**
 * Site-local prose wrappers. These bind the site's niche-specific autoBold
 * tokens (compliance codes, units of measure) so callers don't have to thread
 * them through every render. The factory `content-format` and
 * `prose-renderer` libraries stay neutral; this file is the only place where
 * niche tokens are referenced in code.
 */

export function autoBold(text: string): React.ReactNode[] {
  return baseAutoBold(text, { extraTokens: SITE_AUTOBOLD_TOKENS })
}

export function renderProse(
  markdown: string,
  opts: {
    subheadings?: string[]
    sentencesPerChunk?: number
    className?: string
  } = {},
): React.ReactNode {
  return baseRenderProse(markdown, {
    ...opts,
    extraTokens: SITE_AUTOBOLD_TOKENS,
  })
}

export { firstSentence, baseGenerateKeyTakeaways as generateKeyTakeaways }
export { KeyTakeaways } from './content-format'
