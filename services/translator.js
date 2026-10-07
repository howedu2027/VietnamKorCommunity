// ===== Robust Trilingual Translation Service =====
// Multi-provider translation engine (Google Translate gtx + MyMemory fallback)
// Translates between Korean (ko), Vietnamese (vi), and English (en)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateGoogle(text, from, to) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) throw new Error(`Google API status ${res.status}`);
  const data = await res.json();
  if (data && data[0] && Array.isArray(data[0])) {
    const translated = data[0].map((item) => item[0]).filter(Boolean).join('');
    if (translated && translated.trim()) return translated.trim();
  }
  throw new Error('Invalid Google response format');
}

async function translateMyMemory(text, from, to) {
  const langpair = `${from}|${to}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory API status ${res.status}`);
  const data = await res.json();
  if (data && data.responseData && data.responseData.translatedText) {
    const resText = data.responseData.translatedText;
    if (resText && !resText.includes('QUERY LENGTH LIMIT EXCEEDED')) {
      return resText.trim();
    }
  }
  throw new Error('Invalid MyMemory response');
}

async function translateText(text, fromLang, toLang) {
  if (!text || !text.trim()) return '';
  if (fromLang === toLang) return text;

  // 1. Try Google Translate
  try {
    const res = await translateGoogle(text, fromLang, toLang);
    return res;
  } catch (err1) {
    // 2. Try MyMemory fallback
    try {
      await delay(120);
      const res = await translateMyMemory(text, fromLang, toLang);
      return res;
    } catch (err2) {
      console.warn(`Translation fallback failed (${fromLang} -> ${toLang}):`, err2.message);
      return text;
    }
  }
}

/**
 * Translates title and content into all 3 languages (ko, en, vi) sequentially
 */
async function translatePost(title, content, sourceLang) {
  const allLangs = ['ko', 'en', 'vi'];
  const titleObj = { ko: '', en: '', vi: '' };
  const contentObj = { ko: '', en: '', vi: '' };

  titleObj[sourceLang] = title;
  contentObj[sourceLang] = content;

  const otherLangs = allLangs.filter((l) => l !== sourceLang);

  for (const targetLang of otherLangs) {
    await delay(150);
    titleObj[targetLang] = await translateText(title, sourceLang, targetLang);
    await delay(150);
    contentObj[targetLang] = await translateText(content, sourceLang, targetLang);
  }

  return { title: titleObj, content: contentObj };
}

/**
 * Translates comment text into all 3 languages (ko, en, vi)
 */
async function translateComment(text, sourceLang) {
  const allLangs = ['ko', 'en', 'vi'];
  const textObj = { ko: '', en: '', vi: '' };
  textObj[sourceLang] = text;

  const otherLangs = allLangs.filter((l) => l !== sourceLang);

  for (const targetLang of otherLangs) {
    await delay(120);
    textObj[targetLang] = await translateText(text, sourceLang, targetLang);
  }

  return textObj;
}

module.exports = {
  translateText,
  translatePost,
  translateComment
};
