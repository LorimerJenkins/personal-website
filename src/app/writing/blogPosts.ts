import { SupportedLocale } from "@/utils/translations";

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  translations: Record<SupportedLocale, BlogPostTranslation>;
}

export const blogPosts: BlogPost[] = [
  {
    id: "test-id",
    slug: "test-slug",
    translations: {
      // Americas
      "en-US": {
        title: "Test Title",
        excerpt: "Test description of the blog post...",
        date: "November 9th, 2025",
        content: `Test content

Multiple paragraphs supported.

This is a test blog post.`,
      },

      // Europe
      en: {
        title: "Test Title",
        excerpt: "Test description of the blog post...",
        date: "9th November 2025",
        content: `Test content

Multiple paragraphs supported.

This is a test blog post.`,
      },
      de: {
        title: "Test Titel",
        excerpt: "Test Beschreibung des Blogbeitrags...",
        date: "9. November 2025",
        content: `Test Inhalt

Mehrere Absätze werden unterstützt.

Dies ist ein Test-Blogbeitrag.`,
      },
      es: {
        title: "Título de prueba",
        excerpt: "Descripción de prueba de la publicación del blog...",
        date: "9 de noviembre de 2025",
        content: `Contenido de prueba

Se admiten múltiples párrafos.

Esta es una publicación de blog de prueba.`,
      },
      fr: {
        title: "Titre de test",
        excerpt: "Description de test de l'article de blog...",
        date: "9 novembre 2025",
        content: `Contenu de test

Plusieurs paragraphes pris en charge.

Ceci est un article de blog de test.`,
      },
      it: {
        title: "Titolo di prova",
        excerpt: "Descrizione di prova del post del blog...",
        date: "9 novembre 2025",
        content: `Contenuto di prova

Più paragrafi supportati.

Questo è un post di blog di prova.`,
      },
      nl: {
        title: "Test Titel",
        excerpt: "Test beschrijving van de blogpost...",
        date: "9 november 2025",
        content: `Test inhoud

Meerdere alinea's worden ondersteund.

Dit is een test blogpost.`,
      },
      pl: {
        title: "Testowy Tytuł",
        excerpt: "Testowy opis wpisu na blogu...",
        date: "9 listopada 2025",
        content: `Testowa treść

Obsługiwane jest wiele akapitów.

To jest testowy wpis na blogu.`,
      },
      pt: {
        title: "Título de Teste",
        excerpt: "Descrição de teste da publicação do blog...",
        date: "9 de novembro de 2025",
        content: `Conteúdo de teste

Múltiplos parágrafos suportados.

Esta é uma publicação de blog de teste.`,
      },
      uk: {
        title: "Тестовий Заголовок",
        excerpt: "Тестовий опис публікації блогу...",
        date: "9 листопада 2025",
        content: `Тестовий вміст

Підтримується кілька абзаців.

Це тестова публікація блогу.`,
      },
      ru: {
        title: "Тестовый Заголовок",
        excerpt: "Тестовое описание записи блога...",
        date: "9 ноября 2025",
        content: `Тестовый контент

Поддерживается несколько абзацев.

Это тестовая запись блога.`,
      },
      cs: {
        title: "Testovací Titulek",
        excerpt: "Testovací popis příspěvku na blogu...",
        date: "9. listopadu 2025",
        content: `Testovací obsah

Je podporováno více odstavců.

Toto je testovací příspěvek na blogu.`,
      },
      ro: {
        title: "Titlu de Test",
        excerpt: "Descriere de test a postării pe blog...",
        date: "9 noiembrie 2025",
        content: `Conținut de test

Mai multe paragrafe sunt acceptate.

Aceasta este o postare de test pe blog.`,
      },
      el: {
        title: "Δοκιμαστικός Τίτλος",
        excerpt: "Δοκιμαστική περιγραφή της ανάρτησης του blog...",
        date: "9 Νοεμβρίου 2025",
        content: `Δοκιμαστικό περιεχόμενο

Υποστηρίζονται πολλαπλές παράγραφοι.

Αυτή είναι μια δοκιμαστική ανάρτηση blog.`,
      },
      hu: {
        title: "Teszt Cím",
        excerpt: "A blogbejegyzés teszt leírása...",
        date: "2025. november 9.",
        content: `Teszt tartalom

Több bekezdés támogatott.

Ez egy teszt blogbejegyzés.`,
      },
      sv: {
        title: "Testtitel",
        excerpt: "Testbeskrivning av blogginlägget...",
        date: "9 november 2025",
        content: `Testinnehåll

Flera stycken stöds.

Detta är ett testblogginlägg.`,
      },
      da: {
        title: "Testtitel",
        excerpt: "Testbeskrivelse af blogindlægget...",
        date: "9. november 2025",
        content: `Testindhold

Flere afsnit understøttes.

Dette er et testblogindlæg.`,
      },
      no: {
        title: "Testtittel",
        excerpt: "Testbeskrivelse av blogginnlegget...",
        date: "9. november 2025",
        content: `Testinnhold

Flere avsnitt støttes.

Dette er et testblogginnlegg.`,
      },
      fi: {
        title: "Testiotsikko",
        excerpt: "Blogikirjoituksen testikuvaus...",
        date: "9. marraskuuta 2025",
        content: `Testisisältö

Useita kappaleita tuetaan.

Tämä on testiblogikirjoitus.`,
      },
      tr: {
        title: "Test Başlığı",
        excerpt: "Blog yazısının test açıklaması...",
        date: "9 Kasım 2025",
        content: `Test içeriği

Birden fazla paragraf desteklenir.

Bu bir test blog yazısıdır.`,
      },

      // Asia
      zh: {
        title: "测试标题",
        excerpt: "博客文章的测试描述...",
        date: "2025年11月9日",
        content: `测试内容

支持多个段落。

这是一篇测试博客文章。`,
      },
      ja: {
        title: "テストタイトル",
        excerpt: "ブログ投稿のテスト説明...",
        date: "2025年11月9日",
        content: `テストコンテンツ

複数の段落がサポートされています。

これはテストブログ投稿です。`,
      },
      ko: {
        title: "테스트 제목",
        excerpt: "블로그 게시물의 테스트 설명...",
        date: "2025년 11월 9일",
        content: `테스트 콘텐츠

여러 단락이 지원됩니다.

이것은 테스트 블로그 게시물입니다.`,
      },
      hi: {
        title: "परीक्षण शीर्षक",
        excerpt: "ब्लॉग पोस्ट का परीक्षण विवरण...",
        date: "9 नवंबर 2025",
        content: `परीक्षण सामग्री

कई पैराग्राफ समर्थित हैं।

यह एक परीक्षण ब्लॉग पोस्ट है।`,
      },
      bn: {
        title: "পরীক্ষামূলক শিরোনাম",
        excerpt: "ব্লগ পোস্টের পরীক্ষামূলক বিবরণ...",
        date: "৯ নভেম্বর ২০২৫",
        content: `পরীক্ষামূলক বিষয়বস্তু

একাধিক অনুচ্ছেদ সমর্থিত।

এটি একটি পরীক্ষামূলক ব্লগ পোস্ট।`,
      },
      ta: {
        title: "சோதனை தலைப்பு",
        excerpt: "வலைப்பதிவு இடுகையின் சோதனை விளக்கம்...",
        date: "நவம்பர் 9, 2025",
        content: `சோதனை உள்ளடக்கம்

பல பத்திகள் ஆதரிக்கப்படுகின்றன.

இது ஒரு சோதனை வலைப்பதிவு இடுகை.`,
      },
      te: {
        title: "పరీక్ష శీర్షిక",
        excerpt: "బ్లాగ్ పోస్ట్ యొక్క పరీక్ష వివరణ...",
        date: "నవంబర్ 9, 2025",
        content: `పరీక్ష కంటెంట్

బహుళ పేరాగ్రాఫ్‌లు మద్దతు ఇవ్వబడతాయి.

ఇది ఒక పరీక్ష బ్లాగ్ పోస్ట్.`,
      },
      mr: {
        title: "चाचणी शीर्षक",
        excerpt: "ब्लॉग पोस्टचे चाचणी वर्णन...",
        date: "९ नोव्हेंबर २०२५",
        content: `चाचणी सामग्री

एकाधिक परिच्छेद समर्थित आहेत.

हे एक चाचणी ब्लॉग पोस्ट आहे.`,
      },
      ur: {
        title: "ٹیسٹ عنوان",
        excerpt: "بلاگ پوسٹ کی ٹیسٹ تفصیل...",
        date: "۹ نومبر ۲۰۲۵",
        content: `ٹیسٹ مواد

متعدد پیراگراف سپورٹڈ ہیں۔

یہ ایک ٹیسٹ بلاگ پوسٹ ہے۔`,
      },
      th: {
        title: "ชื่อเรื่องทดสอบ",
        excerpt: "คำอธิบายทดสอบของบทความบล็อก...",
        date: "9 พฤศจิกายน 2568",
        content: `เนื้อหาทดสอบ

รองรับหลายย่อหน้า

นี่คือบทความบล็อกทดสอบ`,
      },
      vi: {
        title: "Tiêu đề Thử nghiệm",
        excerpt: "Mô tả thử nghiệm của bài viết blog...",
        date: "9 tháng 11, 2025",
        content: `Nội dung thử nghiệm

Hỗ trợ nhiều đoạn văn.

Đây là một bài viết blog thử nghiệm.`,
      },
      id: {
        title: "Judul Tes",
        excerpt: "Deskripsi tes dari posting blog...",
        date: "9 November 2025",
        content: `Konten tes

Beberapa paragraf didukung.

Ini adalah posting blog tes.`,
      },
      ms: {
        title: "Tajuk Ujian",
        excerpt: "Penerangan ujian catatan blog...",
        date: "9 November 2025",
        content: `Kandungan ujian

Pelbagai perenggan disokong.

Ini adalah catatan blog ujian.`,
      },
      tl: {
        title: "Pamagat ng Pagsubok",
        excerpt: "Paglalarawan ng pagsubok ng blog post...",
        date: "Nobyembre 9, 2025",
        content: `Nilalaman ng pagsubok

Maraming talata ang sinusuportahan.

Ito ay isang pagsubok na blog post.`,
      },
      my: {
        title: "စမ်းသပ်ခေါင်းစဉ်",
        excerpt: "ဘလော့ဂ်ပို့စ်၏ စမ်းသပ်ဖော်ပြချက်...",
        date: "၂၀၂၅ ခုနှစ် နိုဝင်ဘာလ ၉ ရက်",
        content: `စမ်းသပ်အကြောင်းအရာ

စာပိုဒ်များစွာ ပံ့ပိုးထားသည်။

ဤသည်မှာ စမ်းသပ်ဘလော့ဂ်ပို့စ်ဖြစ်သည်။`,
      },

      // Middle East
      ar: {
        title: "عنوان تجريبي",
        excerpt: "وصف تجريبي لمقالة المدونة...",
        date: "٩ نوفمبر ٢٠٢٥",
        content: `محتوى تجريبي

يتم دعم فقرات متعددة.

هذه مقالة مدونة تجريبية.`,
      },
      he: {
        title: "כותרת בדיקה",
        excerpt: "תיאור בדיקה של פוסט הבלוג...",
        date: "9 בנובמבר 2025",
        content: `תוכן בדיקה

נתמכים מספר פסקאות.

זהו פוסט בלוג לבדיקה.`,
      },
      fa: {
        title: "عنوان آزمایشی",
        excerpt: "توضیحات آزمایشی پست وبلاگ...",
        date: "۹ نوامبر ۲۰۲۵",
        content: `محتوای آزمایشی

چندین پاراگراف پشتیبانی می‌شود.

این یک پست وبلاگ آزمایشی است.`,
      },

      // Africa
      am: {
        title: "የሙከራ ርዕስ",
        excerpt: "የብሎግ ልጥፍ የሙከራ መግለጫ...",
        date: "ኖቬምበር 9, 2025",
        content: `የሙከራ ይዘት

ብዙ አንቀጾች ይደገፋሉ።

ይህ የሙከራ ብሎግ ልጥፍ ነው።`,
      },
      ha: {
        title: "Taken Gwaji",
        excerpt: "Bayanin gwaji na rubutun blog...",
        date: "9 ga Nuwamba 2025",
        content: `Abun ciki na gwaji

Ana tallafa wa sakin layi da yawa.

Wannan rubutun blog ne na gwaji.`,
      },
      sw: {
        title: "Kichwa cha Jaribio",
        excerpt: "Maelezo ya jaribio ya chapisho la blogu...",
        date: "9 Novemba 2025",
        content: `Maudhui ya jaribio

Aya nyingi zinasaidiwa.

Hii ni chapisho la blogu la jaribio.`,
      },
    },
  },
];
