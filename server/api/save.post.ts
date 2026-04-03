export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Зөвхөн password, confirmPassword-г JSONBin руу явуулах
  const safeBody = {
    password: body.password,
    confirmPassword: body.confirmPassword
  }

  const res = await fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2a$10$LCChQA80Y8vUnGk7.ssgr.lEAJtloz.axGEuaz0PVRlkFM9Al0wNu',
      'X-Bin-Private': 'false'
    },
    body: JSON.stringify(safeBody)
  })

  const text = await res.text()
  try {
    return { success: true, data: JSON.parse(text) }
  } catch {
    return { success: false, message: 'Invalid JSON', raw: text }
  }
})