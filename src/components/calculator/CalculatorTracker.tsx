"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

interface CalculatorTrackerProps {
  calculadoraNome: string;
  calculadoraCategoria: string;
  calculadoraSubcategoria: string;
}

/**
 * Client component that tracks calculator page views
 * This component should be used within the calculator page
 */
export default function CalculatorTracker({
  calculadoraNome,
  calculadoraCategoria,
  calculadoraSubcategoria,
}: CalculatorTrackerProps) {
  useEffect(() => {
    // Track the calculator view event
    track("calculadora_visualizada", {
      calculadora_nome: calculadoraNome,
      calculadora_categoria: calculadoraCategoria,
      calculadora_subcategoria: calculadoraSubcategoria,
    });
  }, [calculadoraNome, calculadoraCategoria, calculadoraSubcategoria]);

  // This component doesn't render anything
  return null;
}
