// export default defineEventHandler(async (event) => {
//   const body = await readBody(event)

//   // Зөвхөн password, confirmPassword-г JSONBin руу явуулах
//   const safeBody = {
//     password: body.password,
//     confirmPassword: body.confirmPassword
//   }

//   const res = await fetch('https://api.jsonbin.io/v3/b', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Master-Key': '$2a$10$LCChQA80Y8vUnGk7.ssgr.lEAJtloz.axGEuaz0PVRlkFM9Al0wNu',
//       'X-Access-Key': '$2a$10$KuOXRPka3O.Ig2CsfLNiDeqMZitG9Ekfo9QFfeDnKfoUGIUGaIh5y',
//       'X-Bin-Private': 'false'
//     },
//     body: JSON.stringify(safeBody)
//   })

//   const text = await res.text()
//   try {
//     return { success: true, data: JSON.parse(text) }
//   } catch {
//     return { success: false, message: 'Invalid JSON', raw: text }
//   }
// })

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uojgbglilickjyevvswk.supabase.co',      // 👉 URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvamdiZ2xpbGlja2p5ZXZ2c3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTQ2MzQsImV4cCI6MjA5MDc3MDYzNH0.cK6AdbycyHIdbrmMygbw3wZCk4E8tmxd4T7G6_2uCaI'                  // 👉 KEY
)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 🔍 Validation
    if (!body?.password || !body?.confirmPassword) {
      return {
        success: false,
        message: 'Нууц үг дутуу байна'
      }
    }

    if (body.password !== body.confirmPassword) {
      return {
        success: false,
        message: 'Нууц үг таарахгүй байна'
      }
    }

    // 🔥 Supabase insert
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          password: body.password,
          confirm_password: body.confirmPassword
        }
      ])
      .select() // 👉 insert хийсний дараа data буцаана

    // ❌ DB error
    if (error) {
      console.error('Supabase error:', error)

      return {
        success: false,
        message: error.message || 'Database алдаа'
      }
    }

    // ❌ Data буцаагүй (rare case)
    if (!data) {
      return {
        success: false,
        message: 'Data хадгалагдсангүй'
      }
    }

    // ✅ Амжилттай
    return {
      success: true,
      data
    }

  } catch (err: any) {
    console.error('Server crash:', err)

    return {
      success: false,
      message: err?.message || 'Server алдаа'
    }
  }
})