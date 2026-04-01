"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  summary: string;
}

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
      <Link
        href={`/conhecimento/${article.slug}`}
        className="block bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 h-full"
      >
        <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          {article.summary.length > 120
            ? `${article.summary.slice(0, 120)}...`
            : article.summary}
        </p>
        <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
          Ler artigo
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  );
}

interface LatestArticlesCarouselProps {
  articles: Article[];
}

export default function LatestArticlesCarousel({
  articles,
}: LatestArticlesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [maxRolls, setMaxRolls] = useState(8);

  const totalItems = articles.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
        setMaxRolls(4);
      } else if (width < 1024) {
        setItemsPerView(2);
        setMaxRolls(3);
      } else {
        setItemsPerView(3);
        setMaxRolls(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  if (articles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Aprenda com nossos guias completos
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Conteúdo prático para ajudar você a tomar decisões melhores no dia a dia.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div></div> {/* Spacer */}
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Artigo anterior"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Próximo artigo"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-hidden mx-[-8px]">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/conhecimento"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg"
        >
          Ver todos os artigos
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}