import { Node } from '@markdoc/markdoc';

export interface BlogPostMetadata {
  title: string;
  author: string;
  date: string;
}

export interface LMSObjectMetadata {
  title: string;
  description?: string;
  slt: string[];
  type:
    | 'ModuleOverview'
    | 'SLTList'
    | 'Lesson'
    | 'Assignment'
    | 'Project'
    | 'Summary';
  videoURL?: string;
  lastEdited: string;
  author: string;
  slug?: string;
}



export const parseMarkdocFrontmatter = (ast: Node) => {
  try {
    return ast.attributes.frontmatter
      ? (JSON.parse(ast.attributes.frontmatter) as LMSObjectMetadata)
      : undefined;
  } catch (error) {
    console.error('Error parsing JSON frontmatter:', error);
    return undefined;
  }
};

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
