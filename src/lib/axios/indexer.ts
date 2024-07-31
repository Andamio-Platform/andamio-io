import axios from "axios";
import { INDEXER_URL } from "~/config/indexer";

export const indexer = axios.create({
  baseURL: `${INDEXER_URL}/api/`,
  headers: { cache: "no-store" },
});

export async function indexerGet<T>(url: string): Promise<T> {
  const res = await indexer.get<T>(url);
  if (res.status === 200) {
    return res.data;
  }
  throw new Error("Failed to fetch data from indexer");
}
