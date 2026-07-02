import { type Node } from '@markdoc/markdoc';

export interface BlogPostMetadata {
  title: string;
  author: string;
  date: string;
  description?: string;
  image?: string;
  tags?: string[];
  redirectTo?: string;
}

export const parseBlogMarkdocFrontmatter = (ast: Node) => {
  try {
    return ast.attributes.frontmatter
      ? (JSON.parse(ast.attributes.frontmatter) as BlogPostMetadata)
      : undefined;
  } catch (error) {
    console.error('Error parsing JSON frontmatter:', error);
    return undefined;
  }
};

/**
 * Meta-description fallback for posts whose frontmatter has no `description`:
 * the first substantial body paragraph, stripped of markdown syntax and
 * truncated to search-snippet length.
 */
export function extractExcerpt(content: string, maxLength = 160): string {
  const body = content.replace(/^---[\s\S]*?---/, '');
  const paragraph = body
    .split('\n')
    .map((line) => line.trim())
    .find(
      (line) =>
        line.length > 40 &&
        !line.startsWith('#') &&
        !line.startsWith('!') &&
        !line.startsWith('{%') &&
        !line.startsWith('|'),
    );
  if (!paragraph) return '';

  const plain = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .trim();

  return plain.length > maxLength
    ? `${plain.slice(0, maxLength - 1).trimEnd()}…`
    : plain;
}
