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
      <Link
        href={href}
        className="block bg-[#f8f8f8] border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 h-full"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">
              {name}
            </h3>
            <p className="text-xs text-slate-500">
              {categoryName}
              {subcategoryName && ` • ${subcategoryName}`}
            </p>
          </div>
          <span className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg whitespace-nowrap">
            Abrir
          </span>
        </div>
      </Link>
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
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Calculadora anterior"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200"
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
