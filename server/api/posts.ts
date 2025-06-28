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

  return posts;
});
