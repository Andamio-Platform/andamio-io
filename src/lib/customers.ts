
import fs from "fs";
import path from "path";

const customersDirectory = path.join(process.cwd(), "src", "customers");

export function getCustomerPageContent(customerId: string): string {
  const filePath = path.join(customersDirectory, `${customerId}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Customer file not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}
