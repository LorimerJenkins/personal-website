const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic();

// =====================================================
// CONFIGURATION
// =====================================================
const LOCALES_DIR = "./src/text";
const SOURCE_FILE = path.join(LOCALES_DIR, "en.json");

// =====================================================
// Supported languages
// =====================================================
const LANGUAGES = [
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "ar", name: "Arabic" },
  { code: "tr", name: "Turkish" },
  { code: "id", name: "Indonesian" },
  { code: "vi", name: "Vietnamese" },
  { code: "am", name: "Amharic" },
  { code: "uk", name: "Ukrainian" },
  { code: "ru", name: "Russian" },
  { code: "bn", name: "Bengali" },
  { code: "ms", name: "Malay" },
  { code: "hu", name: "Hungarian" },
  { code: "tl", name: "Tagalog" },
  { code: "ha", name: "Hausa" },
  { code: "pt", name: "Portuguese" },
  { code: "hi", name: "Hindi" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "th", name: "Thai" },
  { code: "sw", name: "Swahili" },
  { code: "cs", name: "Czech" },
  { code: "ro", name: "Romanian" },
  { code: "el", name: "Greek" },
  { code: "he", name: "Hebrew" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "ur", name: "Urdu" },
  { code: "fa", name: "Farsi/Persian" },
  { code: "my", name: "Burmese" },
];

const DELAY_BETWEEN_REQUESTS = 1000;

async function translateToLanguage(sourceContent, targetLang) {
  const prompt = `You are a professional translator. Translate the following JSON file from English to ${targetLang.name}.

CRITICAL RULES:
1. Return ONLY valid JSON - no markdown code blocks, no backticks, no explanations
2. Keep ALL JSON keys exactly as they are (do not translate keys)
3. Only translate the string VALUES
4. Preserve all markdown links in format [text](url) - translate the link text but keep URLs intact
5. Keep these terms unchanged: AO, Arweave, SEIS, EIS, GDPR, CCPA, Othent, Wallety, LiquidOps, Astro, Lorimer Wilson
6. Keep all proper nouns (person names, company names, city names) unchanged
7. Preserve all special characters, newlines (\\n), and formatting exactly
8. For technical/legal terms, use the appropriate ${targetLang.name} equivalent if one exists
9. Maintain the same tone - professional for legal content, friendly for personal content
10. Do NOT wrap the output in \`\`\`json or any code blocks

Return ONLY the translated JSON object, starting with { and ending with }

Source JSON:
${sourceContent}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 32000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let translatedContent = response.content[0].text.trim();

  // Clean up response if it accidentally has markdown code blocks
  if (translatedContent.startsWith("```json")) {
    translatedContent = translatedContent.slice(7);
  }
  if (translatedContent.startsWith("```")) {
    translatedContent = translatedContent.slice(3);
  }
  if (translatedContent.endsWith("```")) {
    translatedContent = translatedContent.slice(0, -3);
  }
  translatedContent = translatedContent.trim();

  // Validate JSON
  try {
    JSON.parse(translatedContent);
    return translatedContent;
  } catch (e) {
    console.error(`Invalid JSON for ${targetLang.code}:`, e.message);
    console.error("Response preview:", translatedContent.substring(0, 200));
    throw new Error(`Failed to get valid JSON for ${targetLang.name}`);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=".repeat(50));
  console.log("i18n Auto-Translation Script");
  console.log("=".repeat(50));

  // Check if source file exists
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`\n❌ Source file not found: ${SOURCE_FILE}`);
    console.error(`\nMake sure LOCALES_DIR is set correctly in the script.`);
    process.exit(1);
  }

  const sourceContent = fs.readFileSync(SOURCE_FILE, "utf-8");

  // Validate source JSON
  try {
    JSON.parse(sourceContent);
    console.log(`\n✓ Source file valid: ${SOURCE_FILE}`);
    console.log(`  Size: ${(sourceContent.length / 1024).toFixed(1)} KB`);
  } catch (e) {
    console.error("\n❌ Invalid source JSON:", e.message);
    process.exit(1);
  }

  console.log(`\nTranslating to ${LANGUAGES.length} languages...\n`);

  const failed = [];
  const succeeded = [];

  for (let i = 0; i < LANGUAGES.length; i++) {
    const lang = LANGUAGES[i];
    const progress = `[${i + 1}/${LANGUAGES.length}]`;

    console.log(`${progress} Translating to ${lang.name} (${lang.code})...`);

    try {
      const translated = await translateToLanguage(sourceContent, lang);
      const outputPath = path.join(LOCALES_DIR, `${lang.code}.json`);
      fs.writeFileSync(outputPath, translated, "utf-8");
      console.log(`${progress} ✓ Saved ${lang.code}.json`);
      succeeded.push(lang.code);
    } catch (error) {
      console.error(`${progress} ✗ Failed ${lang.code}: ${error.message}`);
      failed.push({ code: lang.code, name: lang.name, error: error.message });
    }

    // Delay between requests (except for the last one)
    if (i < LANGUAGES.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("TRANSLATION SUMMARY");
  console.log("=".repeat(50));
  console.log(`\n✓ Succeeded: ${succeeded.length}/${LANGUAGES.length}`);

  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.length}`);
    console.log("\nFailed languages:");
    failed.forEach((f) => console.log(`  - ${f.name} (${f.code}): ${f.error}`));
    console.log("\nYou may want to retry these manually.");
  }

  if (succeeded.length === LANGUAGES.length) {
    console.log("\n🎉 All translations completed successfully!");
  }

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
