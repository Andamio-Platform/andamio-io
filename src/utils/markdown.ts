import { Node } from '@markdoc/markdoc';

export interface BlogPostMetadata {
  title: string;
  author: string;
  date: string;
  image?: string;
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
