// TODO: add auto translate for blogs like we do with the text.json files
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
      // ============ AMERICAS ============
      "en-US": {
        title: "Test Title",
        excerpt: "Test description of the blog post...",
        date: "November 9th, 2025",
        content: `Test content

Multiple paragraphs supported.

This is a test blog post.`,
      },
      "es-MX": {
        title: "Título de prueba",
        excerpt: "Descripción de prueba de la publicación del blog...",
        date: "9 de noviembre de 2025",
        content: `Contenido de prueba

Se admiten múltiples párrafos.

Esta es una publicación de blog de prueba.`,
      },
      "pt-BR": {
        title: "Título de Teste",
        excerpt: "Descrição de teste da postagem do blog...",
        date: "9 de novembro de 2025",
        content: `Conteúdo de teste

Vários parágrafos são suportados.

Esta é uma postagem de blog de teste.`,
      },

      // ============ EUROPE ============
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
      bg: {
        title: "Тестово Заглавие",
        excerpt: "Тестово описание на публикацията в блога...",
        date: "9 ноември 2025",
        content: `Тестово съдържание

Поддържат се множество параграфи.

Това е тестова публикация в блог.`,
      },
      hr: {
        title: "Testni Naslov",
        excerpt: "Testni opis objave na blogu...",
        date: "9. studenog 2025.",
        content: `Testni sadržaj

Podržano je više odlomaka.

Ovo je testna objava na blogu.`,
      },
      sr: {
        title: "Тестни Наслов",
        excerpt: "Тестни опис објаве на блогу...",
        date: "9. новембар 2025.",
        content: `Тестни садржај

Подржано је више пасуса.

Ово је тестна објава на блогу.`,
      },
      sk: {
        title: "Testovací Názov",
        excerpt: "Testovací popis príspevku na blogu...",
        date: "9. novembra 2025",
        content: `Testovací obsah

Podporovaných je viacero odsekov.

Toto je testovací príspevok na blogu.`,
      },
      sl: {
        title: "Testni Naslov",
        excerpt: "Testni opis objave na blogu...",
        date: "9. november 2025",
        content: `Testna vsebina

Podprtih je več odstavkov.

To je testna objava na blogu.`,
      },
      lt: {
        title: "Bandomasis Pavadinimas",
        excerpt: "Bandomasis tinklaraščio įrašo aprašymas...",
        date: "2025 m. lapkričio 9 d.",
        content: `Bandomasis turinys

Palaikoma keletas pastraipų.

Tai bandomasis tinklaraščio įrašas.`,
      },
      lv: {
        title: "Testa Virsraksts",
        excerpt: "Bloga ieraksta testa apraksts...",
        date: "2025. gada 9. novembris",
        content: `Testa saturs

Tiek atbalstītas vairākas rindkopas.

Šis ir testa bloga ieraksts.`,
      },
      et: {
        title: "Testpealkiri",
        excerpt: "Blogipostituse testikirjeldus...",
        date: "9. november 2025",
        content: `Testsisu

Toetatud on mitu lõiku.

See on testblogipostitus.`,
      },
      ca: {
        title: "Títol de Prova",
        excerpt: "Descripció de prova de la publicació del blog...",
        date: "9 de novembre de 2025",
        content: `Contingut de prova

Es donen suport a múltiples paràgrafs.

Aquesta és una publicació de blog de prova.`,
      },
      sq: {
        title: "Titulli i Testit",
        excerpt: "Përshkrimi i testit të postimit në blog...",
        date: "9 nëntor 2025",
        content: `Përmbajtja e testit

Mbështeten paragrafe të shumta.

Ky është një postim blog testi.`,
      },
      mk: {
        title: "Тестен Наслов",
        excerpt: "Тестен опис на објавата на блогот...",
        date: "9 ноември 2025",
        content: `Тестна содржина

Поддржани се повеќе параграфи.

Ова е тестна објава на блог.`,
      },
      bs: {
        title: "Testni Naslov",
        excerpt: "Testni opis objave na blogu...",
        date: "9. novembar 2025.",
        content: `Testni sadržaj

Podržano je više pasusa.

Ovo je testna objava na blogu.`,
      },
      be: {
        title: "Тэставы Загаловак",
        excerpt: "Тэставае апісанне запісу ў блогу...",
        date: "9 лістапада 2025",
        content: `Тэставы змест

Падтрымліваецца некалькі абзацаў.

Гэта тэставы запіс у блогу.`,
      },
      is: {
        title: "Prófunartitill",
        excerpt: "Prófunarlýsing á bloggfærslu...",
        date: "9. nóvember 2025",
        content: `Prófunarefni

Margar málsgreinar eru studdar.

Þetta er prófunarbloggfærsla.`,
      },
      ga: {
        title: "Teideal Tástála",
        excerpt: "Cur síos tástála ar an bpostáil bhlag...",
        date: "9 Samhain 2025",
        content: `Ábhar tástála

Tacaítear le hailt iolracha.

Is postáil bhlag tástála í seo.`,
      },
      cy: {
        title: "Teitl Prawf",
        excerpt: "Disgrifiad prawf o'r blogiad...",
        date: "9 Tachwedd 2025",
        content: `Cynnwys prawf

Cefnogir paragraffau lluosog.

Dyma bostiad blog prawf.`,
      },
      mt: {
        title: "Titlu tat-Test",
        excerpt: "Deskrizzjoni tat-test tal-post tal-blog...",
        date: "9 ta' Novembru 2025",
        content: `Kontenut tat-test

Paragrafi multipli huma appoġġjati.

Dan huwa post tal-blog tat-test.`,
      },

      // ============ ASIA - EAST ============
      zh: {
        title: "测试标题",
        excerpt: "博客文章的测试描述...",
        date: "2025年11月9日",
        content: `测试内容

支持多个段落。

这是一篇测试博客文章。`,
      },
      "zh-TW": {
        title: "測試標題",
        excerpt: "部落格文章的測試描述...",
        date: "2025年11月9日",
        content: `測試內容

支援多個段落。

這是一篇測試部落格文章。`,
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

      // ============ ASIA - SOUTH ============
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
      gu: {
        title: "પરીક્ષણ શીર્ષક",
        excerpt: "બ્લોગ પોસ્ટનું પરીક્ષણ વર્ણન...",
        date: "9 નવેમ્બર 2025",
        content: `પરીક્ષણ સામગ્રી

બહુવિધ ફકરાઓ સમર્થિત છે.

આ એક પરીક્ષણ બ્લોગ પોસ્ટ છે.`,
      },
      kn: {
        title: "ಪರೀಕ್ಷಾ ಶೀರ್ಷಿಕೆ",
        excerpt: "ಬ್ಲಾಗ್ ಪೋಸ್ಟ್‌ನ ಪರೀಕ್ಷಾ ವಿವರಣೆ...",
        date: "ನವೆಂಬರ್ 9, 2025",
        content: `ಪರೀಕ್ಷಾ ವಿಷಯ

ಬಹು ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗಳನ್ನು ಬೆಂಬಲಿಸಲಾಗಿದೆ.

ಇದು ಪರೀಕ್ಷಾ ಬ್ಲಾಗ್ ಪೋಸ್ಟ್.`,
      },
      ml: {
        title: "ടെസ്റ്റ് ശീർഷകം",
        excerpt: "ബ്ലോഗ് പോസ്റ്റിന്റെ ടെസ്റ്റ് വിവരണം...",
        date: "നവംബർ 9, 2025",
        content: `ടെസ്റ്റ് ഉള്ളടക്കം

ഒന്നിലധികം ഖണ്ഡികകൾ പിന്തുണയ്ക്കുന്നു.

ഇത് ഒരു ടെസ്റ്റ് ബ്ലോഗ് പോസ്റ്റാണ്.`,
      },
      pa: {
        title: "ਟੈਸਟ ਸਿਰਲੇਖ",
        excerpt: "ਬਲੌਗ ਪੋਸਟ ਦਾ ਟੈਸਟ ਵੇਰਵਾ...",
        date: "9 ਨਵੰਬਰ 2025",
        content: `ਟੈਸਟ ਸਮੱਗਰੀ

ਕਈ ਪੈਰਾਗ੍ਰਾਫ਼ ਸਮਰਥਿਤ ਹਨ।

ਇਹ ਇੱਕ ਟੈਸਟ ਬਲੌਗ ਪੋਸਟ ਹੈ।`,
      },
      or: {
        title: "ପରୀକ୍ଷା ଶିରୋନାମା",
        excerpt: "ବ୍ଲଗ୍ ପୋଷ୍ଟର ପରୀକ୍ଷା ବର୍ଣ୍ଣନା...",
        date: "ନଭେମ୍ବର 9, 2025",
        content: `ପରୀକ୍ଷା ବିଷୟବସ୍ତୁ

ଏକାଧିକ ଅନୁଚ୍ଛେଦ ସମର୍ଥିତ।

ଏହା ଏକ ପରୀକ୍ଷା ବ୍ଲଗ୍ ପୋଷ୍ଟ।`,
      },
      as: {
        title: "পৰীক্ষা শিৰোনাম",
        excerpt: "ব্লগ পোষ্টৰ পৰীক্ষা বিৱৰণ...",
        date: "৯ নৱেম্বৰ ২০২৫",
        content: `পৰীক্ষা সমল

একাধিক অনুচ্ছেদ সমৰ্থিত।

এইটো এটা পৰীক্ষা ব্লগ পোষ্ট।`,
      },
      ne: {
        title: "परीक्षण शीर्षक",
        excerpt: "ब्लग पोस्टको परीक्षण विवरण...",
        date: "नोभेम्बर ९, २०२५",
        content: `परीक्षण सामग्री

धेरै अनुच्छेदहरू समर्थित छन्।

यो एक परीक्षण ब्लग पोस्ट हो।`,
      },
      si: {
        title: "පරීක්ෂණ මාතෘකාව",
        excerpt: "බ්ලොග් සටහනේ පරීක්ෂණ විස්තරය...",
        date: "නොවැම්බර් 9, 2025",
        content: `පරීක්ෂණ අන්තර්ගතය

බහු ඡේද සහාය දක්වයි.

මෙය පරීක්ෂණ බ්ලොග් සටහනකි.`,
      },

      // ============ ASIA - SOUTHEAST ============
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
      km: {
        title: "ចំណងជើងសាកល្បង",
        excerpt: "ការពិពណ៌នាសាកល្បងនៃប្លុកប្រកាស...",
        date: "ថ្ងៃទី 9 ខែវិច្ឆិកា ឆ្នាំ 2025",
        content: `មាតិកាសាកល្បង

វាគ្រាំទ្រកថាខណ្ឌច្រើន។

នេះគឺជាប្លុកប្រកាសសាកល្បង។`,
      },
      lo: {
        title: "ຫົວຂໍ້ທົດສອບ",
        excerpt: "ຄຳອະທິບາຍທົດສອບຂອງໂພສບລັອກ...",
        date: "9 ພະຈິກ 2025",
        content: `ເນື້ອຫາທົດສອບ

ຮອງຮັບຫຼາຍວັກ.

ນີ້ແມ່ນໂພສບລັອກທົດສອບ.`,
      },

      // ============ ASIA - CENTRAL & CAUCASUS ============
      mn: {
        title: "Туршилтын Гарчиг",
        excerpt: "Блогийн нийтлэлийн туршилтын тайлбар...",
        date: "2025 оны 11-р сарын 9",
        content: `Туршилтын агуулга

Олон догол мөр дэмжигдсэн.

Энэ бол туршилтын блогийн нийтлэл.`,
      },
      ka: {
        title: "სატესტო სათაური",
        excerpt: "ბლოგის პოსტის სატესტო აღწერა...",
        date: "9 ნოემბერი, 2025",
        content: `სატესტო შინაარსი

მრავალი აბზაცი მხარდაჭერილია.

ეს არის სატესტო ბლოგის პოსტი.`,
      },
      hy: {
        title: "Փորադdelays Վdelays",
        excerpt: "Բdelays delays delays delays...",
        date: "Նdelays 9, 2025",
        content: `Тdelays delays\n\nМdelays delays delays.\n\nСdelays delays delays delays.`,
      },
      az: {
        title: "Test Başlığı",
        excerpt: "Bloq yazısının test təsviri...",
        date: "9 Noyabr 2025",
        content: `Test məzmunu

Bir neçə paraqraf dəstəklənir.

Bu bir test bloq yazısıdır.`,
      },
      uz: {
        title: "Sinov Sarlavhasi",
        excerpt: "Blog postining sinov tavsifi...",
        date: "2025-yil 9-noyabr",
        content: `Sinov tarkibi

Bir nechta paragraflar qo'llab-quvvatlanadi.

Bu sinov blog posti.`,
      },
      kk: {
        title: "Сынақ Тақырыбы",
        excerpt: "Блог жазбасының сынақ сипаттамасы...",
        date: "2025 жылғы 9 қараша",
        content: `Сынақ мазмұны

Бірнеше абзац қолдау көрсетіледі.

Бұл сынақ блог жазбасы.`,
      },
      ky: {
        title: "Сыноо Аталышы",
        excerpt: "Блог постунун сыноо сүрөттөмөсү...",
        date: "2025-жылдын 9-ноябры",
        content: `Сыноо мазмуну

Бир нече абзац колдоого алынат.

Бул сыноо блог посту.`,
      },
      tg: {
        title: "Унвони санҷишӣ",
        excerpt: "Тавсифи санҷишии мақолаи блог...",
        date: "9 ноябри 2025",
        content: `Мундариҷаи санҷишӣ

Якчанд банд дастгирӣ мешаванд.

Ин як мақолаи блоги санҷишӣ аст.`,
      },
      tk: {
        title: "Synag Ady",
        excerpt: "Blog ýazgysynyň synag beýany...",
        date: "9-njy noýabr 2025",
        content: `Synag mazmuny

Birnäçe abzas goldanýar.

Bu synag blog ýazgysy.`,
      },

      // ============ MIDDLE EAST ============
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
      ur: {
        title: "ٹیسٹ عنوان",
        excerpt: "بلاگ پوسٹ کی ٹیسٹ تفصیل...",
        date: "۹ نومبر ۲۰۲۵",
        content: `ٹیسٹ مواد

متعدد پیراگراف سپورٹڈ ہیں۔

یہ ایک ٹیسٹ بلاگ پوسٹ ہے۔`,
      },
      ku: {
        title: "Sernavê Ceribandinê",
        excerpt: "Danasîna ceribandinê ya posta blogê...",
        date: "9ê Mijdarê 2025",
        content: `Naveroka ceribandinê

Gelek paragraf têne piştgirî kirin.

Ev posta blogeheke ceribandinê ye.`,
      },
      ps: {
        title: "د ازموینې سرلیک",
        excerpt: "د بلاګ پوسټ د ازموینې توضیحات...",
        date: "۹ نومبر ۲۰۲۵",
        content: `د ازموینې منځپانګه

ډیری پاراګرافونه ملاتړ کیږي.

دا د ازموینې بلاګ پوسټ دی.`,
      },

      // ============ AFRICA ============
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
      yo: {
        title: "Akọle Ìdánwò",
        excerpt: "Àpèjúwe ìdánwò ti ifiweranṣẹ́ blog...",
        date: "9 Oṣù Kọkànlá 2025",
        content: `Àkóónú ìdánwò

A ṣe àtìlẹ́yìn fún àwọn paragraf púpọ̀.

Èyí jẹ́ ifiweranṣẹ́ blog ìdánwò.`,
      },
      ig: {
        title: "Aha Nnwale",
        excerpt: "Nkọwa nnwale nke ozi blọọgụ...",
        date: "9 Nọvemba 2025",
        content: `Ọdịnaya nnwale

A na-akwado ọtụtụ paragraf.

Nke a bụ ozi blọọgụ nnwale.`,
      },
      zu: {
        title: "Isihloko Sokuhlola",
        excerpt: "Incazelo yokuhlola yeposti yebhulogi...",
        date: "9 uLwezi 2025",
        content: `Okuqukethwe kokuhlola

Izigaba eziningi ziyasekelwa.

Lena yiposti yebhulogi yokuhlola.`,
      },
      xh: {
        title: "Isihloko Sovavanyo",
        excerpt: "Inkcazelo yovavanyo yeposti yebhlog...",
        date: "9 Novemba 2025",
        content: `Umxholo wovavanyo

Izicatshulwa ezininzi ziyaxhaswa.

Le yiposti yebhlog yovavanyo.`,
      },
      af: {
        title: "Toets Titel",
        excerpt: "Toets beskrywing van die blogpos...",
        date: "9 November 2025",
        content: `Toets inhoud

Veelvuldige paragrawe word ondersteun.

Hierdie is 'n toets blogpos.`,
      },
      so: {
        title: "Cinwaanka Tijaabada",
        excerpt: "Sharraxaadda tijaabada ee qoraalka blogka...",
        date: "9 Nofeembar 2025",
        content: `Nuxurka tijaabada

Cutubyo badan ayaa la taageeraa.

Tani waa qoraal blog tijaabo ah.`,
      },
      rw: {
        title: "Umutwe w'Igerageza",
        excerpt: "Ibisobanuro by'igerageza bya blog post...",
        date: "9 Ugushyingo 2025",
        content: `Ibikubiyemo igerageza

Interuro nyinshi zishyigikiwe.

Iyi ni blog post y'igerageza.`,
      },
      mg: {
        title: "Lohateny Fitsapana",
        excerpt: "Famaritana fitsapana ny lahatsoratra blog...",
        date: "9 Novambra 2025",
        content: `Votoaty fitsapana

Andalana maromaro no tohana.

Ity dia lahatsoratra blog fitsapana.`,
      },
      sn: {
        title: "Musoro Wekuyedza",
        excerpt: "Tsananguro yekuyedza yeblog post...",
        date: "9 Mbudzi 2025",
        content: `Zvirimo zvekuyedza

Ndima dzakawanda dzinotsigirwa.

Iyi iblog post yekuyedza.`,
      },
    },
  },
];
