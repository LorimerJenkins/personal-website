// scripts/translate-i18n.js
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic();

// =====================================================
// CONFIGURATION
// =====================================================
const LOCALES_DIR = "./src/text";
const SOURCE_FILE = path.join(LOCALES_DIR, "en.json");
const SNAPSHOT_FILE = path.join(LOCALES_DIR, ".en-snapshot.json");

// Use Haiku for cost savings (~$2-3 vs $18-20 with Sonnet)
const MODEL = "claude-haiku-4-5-20250929";

// =====================================================
// 85 Languages with Global Coverage
// =====================================================
const LANGUAGES = [
  // Americas
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },

  // Europe - Major
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "uk", name: "Ukrainian" },
  { code: "ru", name: "Russian" },
  { code: "cs", name: "Czech" },
  { code: "ro", name: "Romanian" },
  { code: "el", name: "Greek" },
  { code: "hu", name: "Hungarian" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "tr", name: "Turkish" },

  // Europe - Additional
  { code: "bg", name: "Bulgarian" },
  { code: "hr", name: "Croatian" },
  { code: "sr", name: "Serbian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lv", name: "Latvian" },
  { code: "et", name: "Estonian" },
  { code: "ca", name: "Catalan" },
  { code: "sq", name: "Albanian" },
  { code: "mk", name: "Macedonian" },
  { code: "bs", name: "Bosnian" },
  { code: "be", name: "Belarusian" },
  { code: "is", name: "Icelandic" },
  { code: "ga", name: "Irish" },
  { code: "cy", name: "Welsh" },
  { code: "mt", name: "Maltese" },

  // Asia - East
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },

  // Asia - South (India + neighbors)
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "pa", name: "Punjabi" },
  { code: "or", name: "Odia" },
  { code: "as", name: "Assamese" },
  { code: "ne", name: "Nepali" },
  { code: "si", name: "Sinhala" },

  // Asia - Southeast
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "tl", name: "Filipino/Tagalog" },
  { code: "my", name: "Burmese" },
  { code: "km", name: "Khmer" },
  { code: "lo", name: "Lao" },

  // Asia - Central & Caucasus
  { code: "mn", name: "Mongolian" },
  { code: "ka", name: "Georgian" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "uz", name: "Uzbek" },
  { code: "kk", name: "Kazakh" },
  { code: "ky", name: "Kyrgyz" },
  { code: "tg", name: "Tajik" },
  { code: "tk", name: "Turkmen" },

  // Middle East
  { code: "ar", name: "Arabic" },
  { code: "he", name: "Hebrew" },
  { code: "fa", name: "Persian/Farsi" },
  { code: "ur", name: "Urdu" },
  { code: "ku", name: "Kurdish" },
  { code: "ps", name: "Pashto" },

  // Africa
  { code: "am", name: "Amharic" },
  { code: "ha", name: "Hausa" },
  { code: "sw", name: "Swahili" },
  { code: "yo", name: "Yoruba" },
  { code: "ig", name: "Igbo" },
  { code: "zu", name: "Zulu" },
  { code: "xh", name: "Xhosa" },
  { code: "af", name: "Afrikaans" },
  { code: "so", name: "Somali" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "mg", name: "Malagasy" },
  { code: "sn", name: "Shona" },
];

const DELAY_BETWEEN_REQUESTS = 1000;

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Flatten nested JSON to dot notation: { a: { b: "c" } } => { "a.b": "c" }
function flattenObject(obj, prefix = "") {
  const result = {};
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

// Unflatten dot notation back to nested object
function unflattenObject(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    const keys = key.split(".");
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = obj[key];
  }
  return result;
}

// Find changed keys between old and new flattened objects
function findChangedKeys(oldFlat, newFlat) {
  const changed = {};

  // Find new or modified keys
  for (const key of Object.keys(newFlat)) {
    if (!(key in oldFlat) || oldFlat[key] !== newFlat[key]) {
      changed[key] = newFlat[key];
    }
  }

  return changed;
}

// Deep merge two objects (target gets values from source)
function deepMerge(target, source) {
  const result = JSON.parse(JSON.stringify(target));

  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      if (!result[key]) result[key] = {};
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

// =====================================================
// TRANSLATION FUNCTIONS
// =====================================================

async function translateContent(content, targetLang, isPartial = false) {
  const contentStr =
    typeof content === "string" ? content : JSON.stringify(content, null, 2);

  const prompt = `You are a professional translator. Translate the following ${isPartial ? "partial " : ""}JSON from English to ${targetLang.name}.

CRITICAL RULES:
1. Return ONLY valid JSON - no markdown code blocks, no backticks, no explanations
2. Keep ALL JSON keys exactly as they are (do not translate keys)
3. Only translate the string VALUES
4. Preserve all markdown links [text](url) - translate link text, keep URLs intact
5. Keep unchanged: AO, Arweave, SEIS, EIS, GDPR, CCPA, Othent, Wallety, LiquidOps, Astro, Lorimer Wilson
6. Keep all proper nouns (names, companies, cities) unchanged
7. Preserve special characters, newlines (\\n), formatting exactly
8. Use appropriate ${targetLang.name} equivalents for technical/legal terms
9. Maintain tone - professional for legal, friendly for personal content
10. Do NOT wrap output in \`\`\`json or any code blocks

Return ONLY the JSON object, starting with { and ending with }

Source JSON:
${contentStr}`;

  let translatedContent = "";

  const stream = await client.messages.stream({
    model: MODEL,
    max_tokens: 64000,
    messages: [{ role: "user", content: prompt }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      translatedContent += event.delta.text;
      process.stdout.write(".");
    }
  }

  console.log("");
  translatedContent = translatedContent.trim();

  // Clean markdown wrappers
  if (translatedContent.startsWith("```json"))
    translatedContent = translatedContent.slice(7);
  if (translatedContent.startsWith("```"))
    translatedContent = translatedContent.slice(3);
  if (translatedContent.endsWith("```"))
    translatedContent = translatedContent.slice(0, -3);
  translatedContent = translatedContent.trim();

  // Validate and parse JSON
  try {
    return JSON.parse(translatedContent);
  } catch (e) {
    console.error(`Invalid JSON for ${targetLang.code}:`, e.message);
    throw new Error(`Failed to get valid JSON for ${targetLang.name}`);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================================
// MAIN LOGIC
// =====================================================

async function main() {
  console.log("=".repeat(60));
  console.log("i18n Smart Translation Script");
  console.log(`Model: ${MODEL} (cost-effective)`);
  console.log("=".repeat(60));

  // Check source file
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`\n❌ Source file not found: ${SOURCE_FILE}`);
    process.exit(1);
  }

  const sourceContent = fs.readFileSync(SOURCE_FILE, "utf-8");
  let sourceObj;

  try {
    sourceObj = JSON.parse(sourceContent);
    console.log(`\n✓ Source file: ${SOURCE_FILE}`);
    console.log(`  Size: ${(sourceContent.length / 1024).toFixed(1)} KB`);
  } catch (e) {
    console.error("\n❌ Invalid source JSON:", e.message);
    process.exit(1);
  }

  // Determine if this is initial run or incremental
  const hasSnapshot = fs.existsSync(SNAPSHOT_FILE);
  const sampleLangFile = path.join(LOCALES_DIR, "de.json");
  const hasExistingTranslations = fs.existsSync(sampleLangFile);

  let isInitialRun = !hasSnapshot || !hasExistingTranslations;
  let changedKeys = {};
  let changedCount = 0;

  if (!isInitialRun) {
    // Load snapshot and find changes
    const snapshotContent = fs.readFileSync(SNAPSHOT_FILE, "utf-8");
    const snapshotObj = JSON.parse(snapshotContent);

    const oldFlat = flattenObject(snapshotObj);
    const newFlat = flattenObject(sourceObj);

    changedKeys = findChangedKeys(oldFlat, newFlat);
    changedCount = Object.keys(changedKeys).length;

    if (changedCount === 0) {
      console.log("\n✓ No changes detected in en.json");
      console.log("  Nothing to translate!");
      process.exit(0);
    }

    console.log(`\n📝 Incremental update: ${changedCount} keys changed`);
    console.log(
      "  Changed keys:",
      Object.keys(changedKeys).slice(0, 5).join(", "),
      changedCount > 5 ? "..." : "",
    );
  } else {
    console.log("\n🚀 Initial run: translating entire file");
  }

  console.log(`\nTranslating to ${LANGUAGES.length} languages...\n`);

  const failed = [];
  const succeeded = [];
  const startTime = Date.now();

  for (let i = 0; i < LANGUAGES.length; i++) {
    const lang = LANGUAGES[i];
    const progress = `[${i + 1}/${LANGUAGES.length}]`;
    const outputPath = path.join(LOCALES_DIR, `${lang.code}.json`);

    console.log(`${progress} ${lang.name} (${lang.code})...`);

    try {
      if (isInitialRun) {
        // Full translation
        const translated = await translateContent(sourceObj, lang, false);
        fs.writeFileSync(
          outputPath,
          JSON.stringify(translated, null, 2),
          "utf-8",
        );
      } else {
        // Incremental: translate only changed keys, merge with existing
        const changedObj = unflattenObject(changedKeys);
        const translatedChanges = await translateContent(
          changedObj,
          lang,
          true,
        );

        // Load existing translation and merge
        let existing = {};
        if (fs.existsSync(outputPath)) {
          existing = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
        }

        const merged = deepMerge(existing, translatedChanges);
        fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2), "utf-8");
      }

      console.log(`${progress} ✓ Saved ${lang.code}.json`);
      succeeded.push(lang.code);
    } catch (error) {
      console.error(`${progress} ✗ Failed: ${error.message}`);
      failed.push({ code: lang.code, name: lang.name, error: error.message });
    }

    if (i < LANGUAGES.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Save snapshot for future incremental runs
  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(sourceObj, null, 2), "utf-8");
  console.log(`\n✓ Saved snapshot: ${SNAPSHOT_FILE}`);

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("TRANSLATION SUMMARY");
  console.log("=".repeat(60));
  console.log(
    `\nMode: ${isInitialRun ? "Full (initial)" : `Incremental (${changedCount} keys)`}`,
  );
  console.log(`Time: ${elapsed} minutes`);
  console.log(`✓ Succeeded: ${succeeded.length}/${LANGUAGES.length}`);

  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.name} (${f.code}): ${f.error}`));
  }

  // Cost estimate
  const inputTokens = isInitialRun
    ? LANGUAGES.length * 12000
    : LANGUAGES.length * (changedCount * 50);
  const outputTokens = inputTokens;
  const cost = ((inputTokens * 0.8 + outputTokens * 4) / 1000000).toFixed(2);
  console.log(`\n💰 Estimated cost: ~$${cost}`);

  if (succeeded.length === LANGUAGES.length) {
    console.log("\n🎉 All translations completed!");
  }

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
