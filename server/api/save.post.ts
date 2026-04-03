export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // JSONBin.io руу POST
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$LCChQA80Y8vUnGk7.ssgr.lEAJtloz.axGEuaz0PVRlkFM9Al0wNu', // Таны API key
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify(body)
    })

    // Response-ийг текст хэлбэрээр авна
    const text = await res.text()

    // JSON parse хийх оролдлого
    try {
      const data = JSON.parse(text)
      return { success: true, data }
    } catch (e) {
      // Хэрвээ JSON биш бол алдааг буцаана
      return { success: false, message: 'Invalid JSON from JSONBin', raw: text }
    }

  } catch (err: any) {
    // Fetch хийх явцад гарсан алдаа
    return { success: false, message: err.message || 'Unknown server error' }
  }
})