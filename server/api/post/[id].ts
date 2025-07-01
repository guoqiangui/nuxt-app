import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')

  const fullPath = path.join(process.cwd(), 'contents', `${id}.md`)

  try {
    await fs.access(fullPath)
  }
  catch {
    throw createError({
      statusCode: 404,
      statusMessage: '文章不存在',
    })
  }

  const fileContent = await fs.readFile(fullPath, { encoding: 'utf8' })

  const matterInfo = matter(fileContent)

  const file = await remark().use(remarkHtml).process(matterInfo.content)
  return {
    title: matterInfo.data.title as string,
    content: file.toString(),
  }
})
