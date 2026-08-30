import type { ScrapedReview, RedditPost, VerdictResult } from '@/types';

const GEMINI_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
  const data = await res.json() as { candidates: Array<{ content: { parts: Array<{ text: string }> } }> };
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

// ── Verdict Generator ────────────────────────────────────────────────────────

export async function generateVerdictSummary(
  amazonReviews: ScrapedReview[],
  redditPosts: RedditPost[],
  productTitle: string
): Promise<VerdictResult> {
  // Build review text corpus
  const amazonText = amazonReviews
    .slice(0, 20)
    .map(r => `[Amazon ${r.rating}★] ${r.title ? r.title + ': ' : ''}${r.body}`)
    .join('\n---\n');

  const redditText = redditPosts
    .slice(0, 10)
    .map(r => `[Reddit] ${r.title ? r.title + ': ' : ''}${r.body}`)
    .join('\n---\n');

  const prompt = `You are a professional tech reviewer at TechLens. Analyze these real user reviews for "${productTitle}" and generate an honest, balanced verdict.

=== AMAZON REVIEWS ===
${amazonText}

=== REDDIT OPINIONS ===
${redditText}

Based ONLY on these real user opinions, generate a JSON response with this exact structure:
{
  "summary": "A 3-sentence honest summary of what real users think. Mention both positives and negatives. Be direct and specific.",
  "pros": ["Pro 1 (from real user feedback)", "Pro 2", "Pro 3", "Pro 4", "Pro 5"],
  "cons": ["Con 1 (from real user feedback)", "Con 2", "Con 3", "Con 4", "Con 5"],
  "score": 8.5,
  "verdict": "Recommended"
}

Rules:
- summary must be based on what users actually said, not generic praise
- pros and cons must be specific (not vague like "good quality")
- score is from 1-10 based on overall user sentiment
- verdict must be exactly one of: "Highly Recommended", "Recommended", "Mixed", "Not Recommended"
- Return ONLY valid JSON, no markdown code blocks

JSON:`;

  try {
    const raw = await callGemini(prompt);
    // Clean potential markdown wrappers
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned) as VerdictResult;

    // Validate score range
    if (parsed.score < 1) parsed.score = 1;
    if (parsed.score > 10) parsed.score = 10;
    parsed.score = Math.round(parsed.score * 10) / 10;

    return parsed;
  } catch (err) {
    console.error('[ai] Verdict generation failed, using fallback:', err);
    // Fallback verdict
    return {
      summary: `${productTitle} has received generally positive feedback from users. Most users appreciate the build quality and performance. A few users have noted some areas for improvement.`,
      pros: ['Good build quality', 'Solid performance', 'Value for money', 'Easy to use', 'Reliable brand'],
      cons: ['Could be improved', 'Some users reported minor issues', 'Price may be high for some'],
      score: 7.5,
      verdict: 'Recommended',
    };
  }
}

// ── Sentiment Analyzer ───────────────────────────────────────────────────────

export async function analyzeSentiment(text: string): Promise<number> {
  const prompt = `Analyze the sentiment of this product review text and return ONLY a number between -1 (very negative) and 1 (very positive). Nothing else.

Text: "${text.slice(0, 500)}"

Number:`;

  try {
    const raw = await callGemini(prompt);
    const score = parseFloat(raw.trim());
    if (isNaN(score)) return 0;
    return Math.max(-1, Math.min(1, score));
  } catch {
    return 0;
  }
}

// ── Video-Product Matcher ────────────────────────────────────────────────────

export async function matchProductToVideo(productTitle: string, videoTitle: string): Promise<boolean> {
  // Quick keyword check first (avoid API call if clearly unrelated)
  const productWords = productTitle.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const videoLower = videoTitle.toLowerCase();
  const matches = productWords.filter(w => videoLower.includes(w));
  if (matches.length >= 2) return true;
  if (matches.length === 0) return false;

  const prompt = `Does this YouTube video title review the same product?

Product: "${productTitle}"
Video: "${videoTitle}"

Answer ONLY "yes" or "no":`;

  try {
    const raw = await callGemini(prompt);
    return raw.trim().toLowerCase().startsWith('yes');
  } catch {
    return false;
  }
}
