'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

export interface TyazucaProduct {
  id: string;
  name: string;
  displayName?: string;
  tag?: string;
  tagType?: 'green' | 'orange' | 'default';
  description: string;
  price: string;
  priceNum: number;
  arcColor: string;
  themeColor?: string;
  accentBg: string;
  image: string;
}

export const TYAZUCA_PRODUCTS: TyazucaProduct[] = [
  {
    id: 'azuca_raffaello',
    name: 'RAFFAELLO',
    displayName: 'RAFFAELLO',
    tag: 'POPULAR',
    tagType: 'green',
    description: 'Fresas frescas con crema Velvet y Raffaello',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#8A1C22',
    themeColor: '#8A1C22',
    accentBg: '#5c1318',
    image: '/raffaello.jpg',
  },
  {
    id: 'azuca_paccari',
    name: 'PACCARI',
    displayName: 'PACCARI',
    tag: '',
    tagType: 'default',
    description: 'Fresas cremosas con chocolate Paccari',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#3D1E12',
    themeColor: '#3D1E12',
    accentBg: '#2a140c',
    image: '/paccari.jpg',
  },
  {
    id: 'azuca_franui',
    name: 'FRANUI',
    displayName: 'STRAWBERRY & FRANUI',
    tag: 'NUEVO',
    tagType: 'green',
    description: 'Fresas con crema Velvet y Franui',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#6B1323',
    themeColor: '#6B1323',
    accentBg: '#470c17',
    image: '/franui.jpg',
  },
  {
    id: 'azuca_kinder_bueno',
    name: 'KINDER BUENO',
    displayName: 'KINDER BUENO',
    tag: '',
    tagType: 'default',
    description: 'Fresas frescas con crema Velvet y Kinder Bueno',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#593720',
    themeColor: '#593720',
    accentBg: '#3d2415',
    image: '/kinder-bueno.jpg',
  },
  {
    id: 'azuca_mango_raffaello',
    name: 'MANGO & RAFFAELLO',
    displayName: 'MANGO & RAFFAELLO',
    tag: 'EDICIÓN LIMITADA',
    tagType: 'orange',
    description: 'Mango fresco con crema Velvet y Raffaello',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#C87A19',
    themeColor: '#C87A19',
    accentBg: '#8c520a',
    image: '/mango-raffaello.jpg',
  },
];

interface TyazucaSectionProps {
  onAddToCart?: (product: TyazucaProduct) => void;
  className?: string;
}

export default function TyazucaSection({ onAddToCart, className = '' }: TyazucaSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetail, setIsDetail] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const total = TYAZUCA_PRODUCTS.length;
  const currentProduct = TYAZUCA_PRODUCTS[currentIndex];
  const activeProduct = currentProduct;
  const activeIndex = currentIndex;
  const isDetailView = isDetail;

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const prevProduct = TYAZUCA_PRODUCTS[prevIndex];
  const nextProduct = TYAZUCA_PRODUCTS[nextIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Gestor de arrastre/swipe en móviles
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 40 && Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      if (info.offset.x < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Controles por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isDetail) handleNext();
      if (e.key === 'ArrowLeft' && !isDetail) handlePrev();
      if (e.key === 'Escape' && isDetail) setIsDetail(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isDetail]);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(currentProduct);
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  const renderTag = (product: TyazucaProduct) => {
    if (!product.tag) return null;
    const isGreen = product.tagType === 'green';
    const isOrange = product.tagType === 'orange';

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
          isGreen
            ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
            : isOrange
            ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
            : 'bg-purple-900/10 text-[#5B4B8A] border border-[#5B4B8A]/30'
        }`}
      >
        {product.tag}
      </span>
    );
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 180,
    damping: 22,
  };

  return (
    <section
      className={`relative w-full min-h-[640px] sm:min-h-[750px] lg:min-h-[820px] bg-[#FAF7F2] overflow-hidden select-none flex flex-col justify-between pt-3 pb-4 sm:py-6 px-3 sm:px-6 md:px-8 transition-colors duration-700 ${className}`}
      aria-label="Catálogo TYAZUCA 3D"
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. ENCABEZADO MINIMALISTA DE LA SECCIÓN (Sin redundancia)
      ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        animate={{
          opacity: isDetail ? 0.15 : 1,
          y: isDetail ? -18 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="relative z-30 text-center max-w-xl mx-auto pt-2 pb-2"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold block mb-1">
          LÍNEA DULCE &amp; FRUTAS VELVET
        </span>
        <p className="text-lg font-medium text-[#1E222D]">
          Frutas que puedes llevar a tu manera
        </p>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          2. FONDO DINÁMICO & TÍTULO GIGANTE DISPLAY (VISTA DETALLE)
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none flex items-start sm:items-center justify-center pt-24 sm:pt-0 z-10 overflow-hidden"
          >
            <motion.h2
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 0.07, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-7xl md:text-[130px] lg:text-[170px] font-black tracking-tighter text-[#2B1627] text-center uppercase whitespace-nowrap select-none font-serif leading-none"
            >
              {currentProduct.displayName || currentProduct.name}
            </motion.h2>

            <div
              className="absolute w-[320px] sm:w-[540px] h-[320px] sm:h-[540px] rounded-full blur-[90px] sm:blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: currentProduct.arcColor }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          3. ESCENARIO DEL CARRUSEL INTERACTIVO & VASOS 3D (SWIPE TÁCTIL)
      ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        drag={!isDetail ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={handleDragEnd}
        className="relative flex-1 w-full flex items-center justify-center my-auto min-h-[360px] sm:min-h-[440px] touch-pan-y"
      >
        <div className="relative w-full max-w-5xl h-[360px] sm:h-[440px] flex items-center justify-center">

          {/* VASO IZQUIERDO (Anterior) */}
          <AnimatePresence>
            {!isDetail && (
              <motion.button
                key={`prev-${prevProduct.id}`}
                onClick={handlePrev}
                aria-label={`Ver producto anterior: ${prevProduct.name}`}
                initial={{ opacity: 0, scale: 0.5, x: -280, y: 80 }}
                animate={{
                  opacity: 0.85,
                  scale: 0.66,
                  rotate: -14,
                  x: typeof window !== 'undefined' && window.innerWidth < 640 ? -130 : -260,
                  y: typeof window !== 'undefined' && window.innerWidth < 640 ? 50 : 80,
                }}
                exit={{ opacity: 0, scale: 0.4, x: -320 }}
                transition={springTransition}
                whileHover={{ scale: 0.74, opacity: 1 }}
                className="absolute z-20 cursor-pointer focus:outline-none group"
                style={{
                  filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
                }}
              >
                <div className="relative w-[150px] sm:w-[210px] md:w-[250px] aspect-[4/5] rounded-[26px] sm:rounded-[34px] overflow-hidden">
                  <img
                    src={prevProduct.image}
                    alt={prevProduct.name}
                    className="w-full h-full object-cover rounded-[26px] sm:rounded-[34px] pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-3 text-center">
                    <span className="inline-block bg-[#2B1627]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {prevProduct.name}
                    </span>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* VASO CENTRAL (Activo / Detalle) */}
          <motion.div
            layout
            key={`center-${currentProduct.id}`}
            transition={springTransition}
            className="relative z-30 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => {
              if (!isDetail) setIsDetail(true);
            }}
          >
            <motion.div
              animate={
                isDetail
                  ? {
                      y: typeof window !== 'undefined' && window.innerWidth < 640 ? [0, -6, 0] : [0, -8, 0],
                      rotate: 0,
                    }
                  : {
                      y: [0, -10, 0],
                      rotate: -7,
                    }
              }
              transition={{
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
                rotate: springTransition,
              }}
              whileHover={
                !isDetail
                  ? {
                      scale: 1.12,
                      rotate: -3,
                    }
                  : {}
              }
              className="relative transition-shadow duration-500"
              style={{
                filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
              }}
            >
              <div
                className={`relative overflow-hidden rounded-[28px] sm:rounded-[36px] transition-all duration-500 ${
                  isDetail
                    ? 'w-[200px] sm:w-[280px] md:w-[340px] aspect-[4/5]'
                    : 'w-[170px] sm:w-[240px] md:w-[280px] aspect-[4/5]'
                }`}
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover rounded-[28px] sm:rounded-[36px] pointer-events-none select-none transition-transform duration-700"
                />

                {!isDetail && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute inset-x-0 bottom-3 sm:bottom-4 flex justify-center"
                  >
                    <span className="bg-[#2B1627]/90 text-white text-[9px] sm:text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1 border border-white/20 active:scale-95 transition-transform">
                      <span>✨ VER DETALLES</span>
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* VASO DERECHO (Siguiente) */}
          <AnimatePresence>
            {!isDetail && (
              <motion.button
                key={`next-${nextProduct.id}`}
                onClick={handleNext}
                aria-label={`Ver producto siguiente: ${nextProduct.name}`}
                initial={{ opacity: 0, scale: 0.5, x: 280, y: 80 }}
                animate={{
                  opacity: 0.85,
                  scale: 0.66,
                  rotate: 14,
                  x: typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : 260,
                  y: typeof window !== 'undefined' && window.innerWidth < 640 ? 50 : 80,
                }}
                exit={{ opacity: 0, scale: 0.4, x: 320 }}
                transition={springTransition}
                whileHover={{ scale: 0.74, opacity: 1 }}
                className="absolute z-20 cursor-pointer focus:outline-none group"
                style={{
                  filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
                }}
              >
                <div className="relative w-[150px] sm:w-[210px] md:w-[250px] aspect-[4/5] rounded-[26px] sm:rounded-[34px] overflow-hidden">
                  <img
                    src={nextProduct.image}
                    alt={nextProduct.name}
                    className="w-full h-full object-cover rounded-[26px] sm:rounded-[34px] pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-3 text-center">
                    <span className="inline-block bg-[#2B1627]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {nextProduct.name}
                    </span>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            INFO LATERAL / BOTTOM SHEET EN MODO DETALLE
        ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-40 flex flex-col justify-end md:justify-between items-center pointer-events-none"
            >
              {/* Tarjeta inferior estilo Sheet en móvil / Lateral en desktop */}
              <div className="pointer-events-auto w-full md:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-5 md:px-14 py-4 md:py-0 bg-white/95 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none rounded-t-[32px] md:rounded-none shadow-2xl md:shadow-none border-t border-white/80 md:border-none">
                
                {/* Indicador de arrastre táctil para móvil */}
                <div
                  onClick={() => setIsDetail(false)}
                  className="w-10 h-1 bg-black/15 rounded-full mb-3 md:hidden cursor-pointer active:scale-90 transition-transform"
                  title="Cerrar detalle"
                />

                {/* Lado Izquierdo: Tag + Nombre + Descripción */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="text-center md:text-left max-w-xs md:max-w-sm mb-3 md:mb-0"
                >
                  <div className="mb-2">{renderTag(currentProduct)}</div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2B1627] tracking-tight leading-tight mb-1.5 font-serif">
                    {currentProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[#4A1942] font-semibold leading-relaxed">
                    {currentProduct.description}
                  </p>
                </motion.div>

                {/* Lado Derecho: Precio + Botón + Cerrar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="w-full md:w-auto flex flex-col items-center md:items-end gap-2.5 sm:gap-4"
                >
                  <div className="flex items-center justify-between md:justify-end w-full gap-3 sm:gap-4">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#7B5B7B] block">
                        Precio
                      </span>
                      <span className="text-2xl sm:text-4xl font-black text-[#2B1627] tracking-tight font-serif leading-none">
                        {currentProduct.price}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdd}
                      className={`flex-1 md:flex-initial py-3.5 px-7 rounded-full font-black text-xs sm:text-sm tracking-widest uppercase text-white shadow-xl flex items-center justify-center gap-2 transition-colors duration-300 ${
                        addedAnimation ? 'bg-emerald-600' : 'bg-[#5B4B8A] hover:bg-[#493b6e]'
                      }`}
                      style={{
                        boxShadow: '0 10px 24px rgba(91,75,138,0.35)',
                      }}
                    >
                      {addedAnimation ? (
                        <>
                          <span>✓</span>
                          <span>¡AGREGADO!</span>
                        </>
                      ) : (
                        <>
                          <span className="text-base leading-none">+</span>
                          <span>AGREGAR</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDetail(false)}
                    className="w-full md:w-auto text-center text-[10px] sm:text-xs font-black tracking-wider text-[#7B5B7B] hover:text-[#2B1627] uppercase py-1.5 px-3 rounded-full hover:bg-black/5 active:scale-95 transition-all"
                  >
                    <span>← VOLVER AL MENÚ</span>
                  </button>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLECHAS DE NAVEGACIÓN */}
        {!isDetail && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Producto anterior"
              className="absolute left-1 sm:left-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/85 text-[#2B1627] shadow-lg backdrop-blur-md flex items-center justify-center border border-white font-black text-base sm:text-lg active:scale-90 transition-transform"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Producto siguiente"
              className="absolute right-1 sm:right-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/85 text-[#2B1627] shadow-lg backdrop-blur-md flex items-center justify-center border border-white font-black text-base sm:text-lg active:scale-90 transition-transform"
            >
              →
            </button>
          </>
        )}
      </motion.div>

      {/* CÍRCULO RESPONSIVE: 240vw en móvil para que cubra todo hasta abajo y mantenga la curva de PC */}
      <motion.div
        animate={{
          backgroundColor: activeProduct.themeColor || activeProduct.arcColor,
          y: isDetailView ? "100%" : "0%",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[33%] md:top-[42%] left-1/2 -translate-x-1/2 w-[240vw] h-[240vw] sm:w-[160vw] sm:h-[160vw] md:w-[115vw] md:h-[115vw] rounded-full z-10 flex items-center justify-center shadow-[0_-20px_60px_rgba(0,0,0,0.15)] pointer-events-none"
      >
        <motion.svg
          animate={{ rotate: activeIndex * -25 }}
          transition={{ type: "spring", stiffness: 45, damping: 18 }}
          viewBox="0 0 1200 1200"
          className="w-full h-full opacity-25 md:opacity-[0.16] overflow-visible select-none"
        >
          <defs>
            {/* Radio 545 para que en móvil el texto asome justo por el borde superior del círculo */}
            <path
              id="perfectCircleArc"
              d="M 55,600 A 545,545 0 1,1 1145,600 A 545,545 0 1,1 55,600"
              fill="transparent"
            />
          </defs>
          <text className="fill-white text-[48px] md:text-[68px] font-serif uppercase tracking-[0.16em]">
            <textPath href="#perfectCircleArc" startOffset="0%">
              • FRUTAS FRESCAS • CREMA VELVET • TYAZUCA • FRUTAS FRESCAS • CREMA VELVET • TYAZUCA • FRUTAS FRESCAS • CREMA VELVET •
            </textPath>
          </text>
        </motion.svg>
      </motion.div>

      {/* Paginación táctil (Capa 35) */}
      {!isDetailView && (
        <div className="relative z-35 pb-3 sm:pb-5 pointer-events-auto flex items-center justify-center gap-2 sm:gap-2.5">
          {TYAZUCA_PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir al vaso ${prod.name}`}
              className={`transition-all duration-300 rounded-full h-2.5 ${
                idx === activeIndex
                  ? 'w-8 bg-white shadow-md'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
