export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2a$10$LCChQA80Y8vUnGk7.ssgr.lEAJtloz.axGEuaz0PVRlkFM9Al0wNu',
      'X-Bin-Private': 'false'
    },
    body: JSON.stringify(body)
  })

  const text = await res.text()  // JSON биш байж магадгүй
  try {
    return JSON.parse(text)
  } catch {
    return { message: 'Invalid JSON from jsonbin', raw: text }
  }
})