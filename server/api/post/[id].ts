import path from "node:path";
import { remark } from "remark";
import remarkHtml from "remark-html";
import fs from "node:fs/promises";
import matter from "gray-matter";

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id");

  const fullPath = path.join(process.cwd(), "contents", `${id}.md`);
  const fileContent = await fs.readFile(fullPath, { encoding: "utf8" });

  const matterInfo = matter(fileContent);

  const file = await remark().use(remarkHtml).process(matterInfo.content);
  return {
    title: matterInfo.data.title as string,
    content: file.toString(),
  };
});
