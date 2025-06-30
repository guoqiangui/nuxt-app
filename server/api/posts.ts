import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export default defineEventHandler(async (e) => {
  const dir = path.join(process.cwd(), "contents");

  const fileNames = await fs.readdir(dir);

  const posts = [];
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const match = /(.*)\.md$/.exec(fileName);

    let id = fileName;
    if (match) {
      id = match[1];
    }

    const fullPath = path.join(dir, fileName);
    const fileContents = await fs.readFile(fullPath, { encoding: "utf8" });
    const stats = await fs.stat(fullPath);

    const matterInfo = matter(fileContents);

    posts.push({
      id,
      title: matterInfo.data.title as string,
      date: stats.mtime,
    });
  }

  posts.sort((a, b) => {
    return a.date > b.date ? -1 : 1;
  });

  const query = getQuery(e);
  const page = Number(query.page ?? 1);
  const size = Number(query.size ?? 10);

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  return posts.slice(startIndex, endIndex);
});
