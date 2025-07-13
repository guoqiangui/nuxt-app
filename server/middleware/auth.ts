export default defineEventHandler((e) => {
  const protectedRoutes = ['/api/post/']

  const token = getHeader(e, 'token')

  if (protectedRoutes.some(route => e.path.startsWith(route)) && !token) {
    return createError({ status: 401, message: 'Hey! Unauthorized!!!' })
  }
})
