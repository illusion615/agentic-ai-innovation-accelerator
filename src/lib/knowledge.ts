/**
 * The Knowledge Hub is the single home for background reading.
 *
 * This programme is a path, not an encyclopedia. Everything it needs a reader
 * to *understand* — what Copilot Studio is, what it costs, where its limits
 * are, how Power Platform licensing and Dataverse roles work — is already
 * written and published in the Knowledge Hub, so this site links to it rather
 * than growing a second copy that would immediately start to drift.
 *
 * The one thing that lives here is the *curation*: which article, at which
 * point in the flow, and why (see `src/content/knowledge.json`).
 */

/**
 * Root of the published hub. It is a separate repository
 * (`illusion615/KnowledgeHub`) served from GitHub Pages, so this is the only
 * place the origin is written down — change it here if the hub moves to its
 * own domain.
 */
export const HUB_BASE = 'https://illusion615.github.io/KnowledgeHub';

export function hubArticleUrl(slug: string): string {
  return `${HUB_BASE}/posts/${slug}/index.html`;
}

/** The hub's own front page — the interactive knowledge graph. */
export const HUB_HOME = `${HUB_BASE}/index.html`;
