export const GEMINI_CONFIG = {
  API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  
  // Filter keywords untuk OJK
  ALLOWED_KEYWORDS: [
    'ojk', 'irs', 'apolo', 'e-reporting', 'sipina',
    'laporan', 'pelaporan', 'keuangan', 'bank', 'regulasi',
    'deadline', 'format', 'file', 'sistem', 'dashboard'
  ],
  
  // Blocked topics
  BLOCKED_TOPICS: [
    'investasi', 'saham', 'trading', 'kripto',
    'prediksi', 'rekomendasi', 'financial advice',
    'politik', 'agama', 'sara'
  ]
};

export const checkQueryRelevance = (query) => {
  const lowerQuery = query.toLowerCase();
  
  const hasAllowedKeyword = GEMINI_CONFIG.ALLOWED_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  
  const hasBlockedTopic = GEMINI_CONFIG.BLOCKED_TOPICS.some(topic => 
    lowerQuery.includes(topic)
  );
  
  return {
    isRelevant: hasAllowedKeyword,
    isBlocked: hasBlockedTopic,
    reason: hasBlockedTopic ? 'Topik tidak diperbolehkan' : 
            !hasAllowedKeyword ? 'Tidak relevan dengan OJK' : null
  };
};