
import fs from "fs";
import path from "path";
import Markdoc from "@markdoc/markdoc";
import {
  type BlogPostMetadata,
  parseBlogMarkdocFrontmatter,
} from "../utils/markdown";

const customersDirectory = path.join(process.cwd(), "src", "customers");

export function getCustomerPages(): {
  id: string;
  frontmatter: BlogPostMetadata | undefined;
}[] {
  return fs
    .readdirSync(customersDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const id = file.replace(/\.md$/, "");
      const contents = fs.readFileSync(
        path.join(customersDirectory, file),
        "utf-8",
      );
      const frontmatter = parseBlogMarkdocFrontmatter(Markdoc.parse(contents));
      return { id, frontmatter };
    });
}

export function getCustomerPageContent(customerId: string): string {
  const filePath = path.join(customersDirectory, `${customerId}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Customer file not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}
