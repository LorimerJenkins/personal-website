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
      en: {
        title: "Test Title",
        excerpt: "Test description of the blog post...",
        date: "November 9th, 2025",
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
      ja: {
        title: "テストタイトル",
        excerpt: "ブログ投稿のテスト説明...",
        date: "2025年11月9日",
        content: `テストコンテンツ

複数の段落がサポートされています。

これはテストブログ投稿です。`,
      },
      zh: {
        title: "测试标题",
        excerpt: "博客文章的测试描述...",
        date: "2025年11月9日",
        content: `测试内容

支持多个段落。

这是一篇测试博客文章。`,
      },
      ar: {
        title: "عنوان تجريبي",
        excerpt: "وصف تجريبي لمقالة المدونة...",
        date: "٩ نوفمبر ٢٠٢٥",
        content: `محتوى تجريبي

يتم دعم فقرات متعددة.

هذه مقالة مدونة تجريبية.`,
      },
    },
  },
];
