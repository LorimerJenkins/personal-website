// scripts/translate-i18n.js
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const client = new Anthropic();

// =====================================================
// CONFIGURATION
// =====================================================
const LOCALES_DIR = "./src/locales";
const SOURCE_FILE = "./src/en.json";
const SNAPSHOT_FILE = path.join(LOCALES_DIR, ".en-snapshot.json");
const BLOGS_DIR = "./public/blogs";
const BLOGS_SNAPSHOT_DIR = path.join(LOCALES_DIR, ".blog-snapshots");

// Use Haiku for cost savings (~$2-3 vs $18-20 with Sonnet)
const MODEL = "claude-haiku-4-5-20251001";

// Commit after each translation to avoid losing progress on timeout
const INCREMENTAL_COMMITS = process.env.INCREMENTAL_COMMITS !== "false";

// What to translate — set via env or default to both
const TRANSLATE_TARGET = process.env.TRANSLATE_TARGET || "all"; // "i18n", "blogs", or "all"

// =====================================================
// 89 Languages with Global Coverage
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

const DELAY_BETWEEN_REQUESTS = 1500;
const MAX_RETRIES = 3;

// =====================================================
// GIT FUNCTIONS
// =====================================================

function gitCommitAndPush(files, message) {
  if (!INCREMENTAL_COMMITS) return;

  try {
    for (const file of files) {
      execSync(`git add "${file}"`, { stdio: "pipe" });
    }

    const status = execSync("git diff --cached --name-only", {
      encoding: "utf-8",
    });
    if (!status.trim()) return;

    execSync(`git commit -m "${message}"`, { stdio: "pipe" });
    execSync("git pull --rebase --autostash", { stdio: "pipe" });
    execSync("git push", { stdio: "pipe" });

    console.log(`  📤 Committed and pushed`);
  } catch (error) {
    console.error(`  ⚠️ Git commit failed: ${error.message}`);
  }
}

function formatWithPrettier(filePath) {
  try {
    execSync(`npx prettier --write "${filePath}"`, { stdio: "pipe" });
  } catch (error) {
    console.error(`  ⚠️ Prettier format failed: ${error.message}`);
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

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

function findChangedKeys(oldFlat, newFlat) {
  const changed = {};
  for (const key of Object.keys(newFlat)) {
    if (!(key in oldFlat)) {
      changed[key] = newFlat[key];
    } else {
      const oldVal = oldFlat[key];
      const newVal = newFlat[key];
      const oldStr =
        typeof oldVal === "object" ? JSON.stringify(oldVal) : oldVal;
      const newStr =
        typeof newVal === "object" ? JSON.stringify(newVal) : newVal;
      if (oldStr !== newStr) {
        changed[key] = newFlat[key];
      }
    }
  }
  return changed;
}

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

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================================
// BLOG FILE PARSING
// =====================================================

function parseBlogFile(raw) {
  const separatorIndex = raw.indexOf("\n---\n");
  if (separatorIndex === -1) {
    return { title: "", excerpt: "", date: "", content: raw.trim() };
  }

  const header = raw.substring(0, separatorIndex);
  const content = raw.substring(separatorIndex + 5).trim();

  const metadata = {};
  for (const line of header.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.substring(0, colonIndex).trim().toLowerCase();
    const value = line.substring(colonIndex + 1).trim();
    metadata[key] = value;
  }

  return {
    title: metadata.title || "",
    excerpt: metadata.excerpt || "",
    date: metadata.date || "",
    content,
  };
}

function serializeBlogFile(data) {
  return `title: ${data.title}\nexcerpt: ${data.excerpt}\ndate: ${data.date}\n---\n${data.content}\n`;
}

function discoverBlogs() {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const slugs = fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => fs.existsSync(path.join(BLOGS_DIR, d.name, "en.txt")))
    .map((d) => d.name);

  return slugs;
}

// =====================================================
// TRANSLATION FUNCTIONS
// =====================================================

async function translateJSON(content, targetLang, isPartial = false) {
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

  if (translatedContent.startsWith("```json"))
    translatedContent = translatedContent.slice(7);
  if (translatedContent.startsWith("```"))
    translatedContent = translatedContent.slice(3);
  if (translatedContent.endsWith("```"))
    translatedContent = translatedContent.slice(0, -3);
  translatedContent = translatedContent.trim();

  try {
    return JSON.parse(translatedContent);
  } catch (e) {
    console.error(`Invalid JSON for ${targetLang.code}:`, e.message);
    throw new Error(`Failed to get valid JSON for ${targetLang.name}`);
  }
}

async function translateBlogPost(blogData, targetLang) {
  const prompt = `You are a professional translator. Translate the following blog post from English to ${targetLang.name}.

I will give you a JSON object with title, excerpt, date, and content fields. Translate ALL of them.

CRITICAL RULES:
1. Return ONLY valid JSON - no markdown code blocks, no backticks, no explanations
2. Translate the title, excerpt, date, and content values
3. For the date, use the natural date format for ${targetLang.name} (e.g., "9 novembre 2025" for French)
4. Keep unchanged: AO, Arweave, LiquidOps, Astro, Lorimer Jenkins, and all proper nouns
5. Preserve all paragraph breaks (\\n\\n) in the content exactly
6. Preserve all markdown links [text](url) - translate link text, keep URLs intact
7. Maintain the tone and style of the original
8. Do NOT wrap output in \`\`\`json or any code blocks

Return ONLY the JSON object, starting with { and ending with }

Source:
${JSON.stringify(blogData, null, 2)}`;

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

  if (translatedContent.startsWith("```json"))
    translatedContent = translatedContent.slice(7);
  if (translatedContent.startsWith("```"))
    translatedContent = translatedContent.slice(3);
  if (translatedContent.endsWith("```"))
    translatedContent = translatedContent.slice(0, -3);
  translatedContent = translatedContent.trim();

  try {
    return JSON.parse(translatedContent);
  } catch (e) {
    console.error(`Invalid blog JSON for ${targetLang.code}:`, e.message);
    throw new Error(`Failed to get valid blog JSON for ${targetLang.name}`);
  }
}

// =====================================================
// I18N TRANSLATION (existing logic)
// =====================================================

async function translateI18n() {
  console.log("\n" + "─".repeat(60));
  console.log("📄 I18N TRANSLATIONS");
  console.log("─".repeat(60));

  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`\n❌ Source file not found: ${SOURCE_FILE}`);
    return { succeeded: 0, failed: 0 };
  }

  const sourceContent = fs.readFileSync(SOURCE_FILE, "utf-8");
  let sourceObj;

  try {
    sourceObj = JSON.parse(sourceContent);
    console.log(`\n✓ Source file: ${SOURCE_FILE}`);
    console.log(`  Size: ${(sourceContent.length / 1024).toFixed(1)} KB`);
  } catch (e) {
    console.error("\n❌ Invalid source JSON:", e.message);
    return { succeeded: 0, failed: 0 };
  }

  if (!fs.existsSync(LOCALES_DIR)) {
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
  }

  const hasSnapshot = fs.existsSync(SNAPSHOT_FILE);
  const sampleLangFile = path.join(LOCALES_DIR, "de.json");
  const hasExistingTranslations = fs.existsSync(sampleLangFile);

  let isInitialRun = !hasSnapshot || !hasExistingTranslations;
  let changedKeys = {};
  let changedCount = 0;

  if (!isInitialRun) {
    const snapshotContent = fs.readFileSync(SNAPSHOT_FILE, "utf-8");
    const snapshotObj = JSON.parse(snapshotContent);

    const oldFlat = flattenObject(snapshotObj);
    const newFlat = flattenObject(sourceObj);

    changedKeys = findChangedKeys(oldFlat, newFlat);
    changedCount = Object.keys(changedKeys).length;

    if (changedCount === 0) {
      console.log("\n✓ No changes detected in en.json — skipping i18n");
      return { succeeded: 0, failed: 0, skipped: true };
    }

    console.log(`\n📝 Incremental update: ${changedCount} keys changed`);
  } else {
    console.log("\n🚀 Initial run: translating entire file");
  }

  const pendingLanguages = isInitialRun
    ? LANGUAGES.filter((lang) => {
        const outputPath = path.join(LOCALES_DIR, `${lang.code}.json`);
        return !fs.existsSync(outputPath);
      })
    : LANGUAGES;

  const alreadyDone = LANGUAGES.length - pendingLanguages.length;
  if (alreadyDone > 0 && isInitialRun) {
    console.log(`⏩ Resuming: ${alreadyDone} languages already completed`);
  }

  console.log(`Translating to ${pendingLanguages.length} languages...\n`);

  const failed = [];
  const succeeded = [];

  for (let i = 0; i < pendingLanguages.length; i++) {
    const lang = pendingLanguages[i];
    const progress = `[i18n ${i + 1}/${pendingLanguages.length}]`;
    const outputPath = path.join(LOCALES_DIR, `${lang.code}.json`);

    console.log(`${progress} ${lang.name} (${lang.code})...`);

    let success = false;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (isInitialRun) {
          const translated = await translateJSON(sourceObj, lang, false);
          fs.writeFileSync(
            outputPath,
            JSON.stringify(translated, null, 2),
            "utf-8",
          );
        } else {
          const changedObj = unflattenObject(changedKeys);
          const translatedChanges = await translateJSON(changedObj, lang, true);

          let existing = {};
          if (fs.existsSync(outputPath)) {
            existing = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
          }

          const merged = deepMerge(existing, translatedChanges);
          fs.writeFileSync(
            outputPath,
            JSON.stringify(merged, null, 2),
            "utf-8",
          );
        }

        console.log(`${progress} ✓ Saved ${lang.code}.json`);
        formatWithPrettier(outputPath);
        succeeded.push(lang.code);

        gitCommitAndPush(
          [outputPath],
          `chore(i18n): add ${lang.name} (${lang.code}) translation`,
        );

        success = true;
        break;
      } catch (error) {
        lastError = error;
        if (attempt < MAX_RETRIES) {
          console.log(
            `${progress} ⚠️ Attempt ${attempt}/${MAX_RETRIES} failed, retrying...`,
          );
          await sleep(2000);
        }
      }
    }

    if (!success) {
      console.error(
        `${progress} ✗ Failed after ${MAX_RETRIES} attempts: ${lastError.message}`,
      );
      failed.push({
        code: lang.code,
        name: lang.name,
        error: lastError.message,
      });
    }

    if (i < pendingLanguages.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Save snapshot
  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(sourceObj, null, 2), "utf-8");
  formatWithPrettier(SNAPSHOT_FILE);
  gitCommitAndPush([SNAPSHOT_FILE], "chore(i18n): update translation snapshot");

  return { succeeded: succeeded.length, failed: failed.length };
}

// =====================================================
// BLOG TRANSLATION
// =====================================================

async function translateBlogs() {
  console.log("\n" + "─".repeat(60));
  console.log("📝 BLOG TRANSLATIONS");
  console.log("─".repeat(60));

  const slugs = discoverBlogs();

  if (slugs.length === 0) {
    console.log("\n✓ No blogs found in", BLOGS_DIR);
    return { succeeded: 0, failed: 0 };
  }

  console.log(`\nFound ${slugs.length} blog(s): ${slugs.join(", ")}`);

  // Ensure snapshot dir exists
  if (!fs.existsSync(BLOGS_SNAPSHOT_DIR)) {
    fs.mkdirSync(BLOGS_SNAPSHOT_DIR, { recursive: true });
  }

  let totalSucceeded = 0;
  let totalFailed = 0;

  for (const slug of slugs) {
    console.log(`\n📖 Blog: ${slug}`);

    const enPath = path.join(BLOGS_DIR, slug, "en.txt");
    const enContent = fs.readFileSync(enPath, "utf-8");
    const blogData = parseBlogFile(enContent);

    // Check snapshot to see if this blog changed
    const snapshotPath = path.join(BLOGS_SNAPSHOT_DIR, `${slug}.txt`);
    const hasSnapshot = fs.existsSync(snapshotPath);

    if (hasSnapshot) {
      const oldContent = fs.readFileSync(snapshotPath, "utf-8");
      if (oldContent === enContent) {
        // Check if any languages are missing
        const missingLangs = LANGUAGES.filter((lang) => {
          const langPath = path.join(BLOGS_DIR, slug, `${lang.code}.txt`);
          return !fs.existsSync(langPath);
        });

        if (missingLangs.length === 0) {
          console.log(`  ✓ No changes — skipping`);
          continue;
        }

        console.log(
          `  📝 Content unchanged but ${missingLangs.length} languages missing`,
        );
      } else {
        console.log(`  📝 Content changed — re-translating all languages`);
      }
    } else {
      console.log(`  🚀 New blog — translating to all languages`);
    }

    // Determine which languages need translation
    const languagesToTranslate = hasSnapshot
      ? LANGUAGES.filter((lang) => {
          const langPath = path.join(BLOGS_DIR, slug, `${lang.code}.txt`);
          // Re-translate if content changed OR file missing
          const oldContent = fs.readFileSync(snapshotPath, "utf-8");
          return oldContent !== enContent || !fs.existsSync(langPath);
        })
      : LANGUAGES;

    console.log(
      `  Translating to ${languagesToTranslate.length} languages...\n`,
    );

    for (let i = 0; i < languagesToTranslate.length; i++) {
      const lang = languagesToTranslate[i];
      const progress = `  [blog:${slug} ${i + 1}/${languagesToTranslate.length}]`;
      const outputPath = path.join(BLOGS_DIR, slug, `${lang.code}.txt`);

      console.log(`${progress} ${lang.name} (${lang.code})...`);

      let success = false;
      let lastError = null;

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const translated = await translateBlogPost(blogData, lang);

          // Validate we got the expected fields back
          if (!translated.title || !translated.content) {
            throw new Error("Missing title or content in translation");
          }

          const output = serializeBlogFile({
            title: translated.title,
            excerpt: translated.excerpt || blogData.excerpt,
            date: translated.date || blogData.date,
            content: translated.content,
          });

          fs.writeFileSync(outputPath, output, "utf-8");
          console.log(`${progress} ✓ Saved ${lang.code}.txt`);
          totalSucceeded++;

          gitCommitAndPush(
            [outputPath],
            `chore(blog): translate ${slug} to ${lang.name} (${lang.code})`,
          );

          success = true;
          break;
        } catch (error) {
          lastError = error;
          if (attempt < MAX_RETRIES) {
            console.log(
              `${progress} ⚠️ Attempt ${attempt}/${MAX_RETRIES} failed, retrying...`,
            );
            await sleep(2000);
          }
        }
      }

      if (!success) {
        console.error(
          `${progress} ✗ Failed after ${MAX_RETRIES} attempts: ${lastError.message}`,
        );
        totalFailed++;
      }

      if (i < languagesToTranslate.length - 1) {
        await sleep(DELAY_BETWEEN_REQUESTS);
      }
    }

    // Save blog snapshot
    fs.writeFileSync(snapshotPath, enContent, "utf-8");
    gitCommitAndPush(
      [snapshotPath],
      `chore(blog): update snapshot for ${slug}`,
    );
  }

  return { succeeded: totalSucceeded, failed: totalFailed };
}

// =====================================================
// MAIN
// =====================================================

async function main() {
  console.log("=".repeat(60));
  console.log("i18n + Blog Translation Script");
  console.log(`Model: ${MODEL} (cost-effective)`);
  console.log(`Target: ${TRANSLATE_TARGET}`);
  console.log(
    `Incremental commits: ${INCREMENTAL_COMMITS ? "enabled" : "disabled"}`,
  );
  console.log("=".repeat(60));

  const startTime = Date.now();
  let i18nResult = { succeeded: 0, failed: 0 };
  let blogResult = { succeeded: 0, failed: 0 };

  if (TRANSLATE_TARGET === "all" || TRANSLATE_TARGET === "i18n") {
    i18nResult = await translateI18n();
  }

  if (TRANSLATE_TARGET === "all" || TRANSLATE_TARGET === "blogs") {
    blogResult = await translateBlogs();
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("TRANSLATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`\nTime: ${elapsed} minutes`);

  if (TRANSLATE_TARGET === "all" || TRANSLATE_TARGET === "i18n") {
    console.log(
      `\n📄 i18n: ${i18nResult.succeeded} succeeded, ${i18nResult.failed} failed`,
    );
  }

  if (TRANSLATE_TARGET === "all" || TRANSLATE_TARGET === "blogs") {
    console.log(
      `📝 Blogs: ${blogResult.succeeded} succeeded, ${blogResult.failed} failed`,
    );
  }

  const totalSucceeded = i18nResult.succeeded + blogResult.succeeded;
  const totalFailed = i18nResult.failed + blogResult.failed;

  // Cost estimate
  const estimatedTokens = (totalSucceeded + totalFailed) * 8000;
  const cost = (
    (estimatedTokens * 0.8 + estimatedTokens * 4) /
    1000000
  ).toFixed(2);
  console.log(`\n💰 Estimated cost: ~$${cost}`);

  if (totalFailed === 0 && totalSucceeded > 0) {
    console.log("\n🎉 All translations completed!");
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
