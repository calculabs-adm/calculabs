"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface CalculatorCardProps {
  icon: string;
  name: string;
  categoryName: string;
  subcategoryName: string;
  href: string;
}

function CalculatorCard({
  icon,
  name,
  categoryName,
  subcategoryName,
  href,
}: CalculatorCardProps) {
  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2">
      <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 h-full flex flex-col">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-slate-800 text-base mb-1 line-clamp-2">
          {name}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {categoryName}
          {subcategoryName && ` • ${subcategoryName}`}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Abrir Calculadora
        </Link>
      </div>
    </div>
  );
}

interface LatestCalculatorsCarouselProps {
  calculators: Array<{
    name: string;
    slug: string;
    categorySlug: string;
    categoryName: string;
    subcategorySlug: string;
    subcategoryName: string;
    categoryIcon: string;
  }>;
}

export default function LatestCalculatorsCarousel({
  calculators,
}: LatestCalculatorsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [maxRolls, setMaxRolls] = useState(8);

  const totalItems = calculators.length;
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
        setItemsPerView(4);
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
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  if (calculators.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Últimas Calculadoras adicionadas
        </h2>
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Calculadora anterior"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Próxima calculadora"
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
          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.slug}
              icon={calc.categoryIcon}
              name={calc.name}
              categoryName={calc.categoryName}
              subcategoryName={calc.subcategoryName}
              href={`/${calc.categorySlug}/${calc.subcategorySlug}/${calc.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
