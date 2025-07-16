export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname.replace('/api/', '') // Remove /api/ prefix
  const method = getMethod(event)
  const body = method !== 'GET' ? await readBody(event) : undefined
  
  try {
    const response = await $fetch(`http://api-ads.ahfwml.live/${path}`, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return response
  } catch (error: any) {
    console.error('Proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erro interno do servidor'
    })
  }
})
