export const verifyGeminiAPI = async () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ API Key tidak ditemukan di .env');
    console.log('💡 Tambahkan ini ke .env file:');
    console.log('VITE_GEMINI_API_KEY=your_key_here');
    return false;
  }

  console.log('🔑 API Key ditemukan:', apiKey.substring(0, 10) + '...');

  // Coba beberapa endpoint yang mungkin
  const endpoints = [
    'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent'
  ];

  for (const endpoint of endpoints) {
    try {
      const url = `${endpoint}?key=${apiKey}`;
      console.log(`🔄 Mencoba endpoint: ${endpoint.split('/').pop()}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Test" }] }]
        })
      });

      if (response.ok) {
        console.log(`✅ Endpoint berhasil: ${endpoint}`);
        return { success: true, endpoint };
      } else {
        console.log(`❌ Endpoint gagal (${response.status}): ${endpoint}`);
      }
    } catch (error) {
      console.log(`⚠️ Error: ${endpoint} - ${error.message}`);
    }
  }

  return { success: false, message: 'Semua endpoint gagal' };
};