"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type OutfitCollection = {
  id: string;
  title: string;
  color: string;
  type: string;
  person: string;
  cover: string;
  images: string[];
};

type LookbookGalleryProps = {
  collections: OutfitCollection[];
};

export function LookbookGallery({ collections }: LookbookGalleryProps) {
  const [activeGroup, setActiveGroup] = useState<OutfitCollection | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!activeGroup) {
      return;
    }

    const imageCount = activeGroup.images.length;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGroup(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === imageCount - 1 ? 0 : current + 1,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === 0 ? imageCount - 1 : current - 1));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGroup]);

  function openGroup(collection: OutfitCollection) {
    setActiveGroup(collection);
    setActiveIndex(0);
  }

  function goNext() {
    if (!activeGroup) {
      return;
    }
    setActiveIndex((current) =>
      current === activeGroup.images.length - 1 ? 0 : current + 1,
    );
  }

  function goPrev() {
    if (!activeGroup) {
      return;
    }
    setActiveIndex((current) =>
      current === 0 ? activeGroup.images.length - 1 : current - 1,
    );
  }

  return (
    <>
      <div className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
        {collections.map((look) => (
          <button
            key={look.id}
            type="button"
            onClick={() => openGroup(look)}
            className="snap-start shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#263537] text-left shadow-[0_18px_50px_rgba(19,38,59,0.16)] transition-transform hover:-translate-y-1 w-[84vw] sm:w-[340px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={look.cover}
                alt={look.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 84vw, 340px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-surface-strong">
                    {look.color}
                  </span>
                  <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    {look.type}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black uppercase text-white">
                  {look.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-200">
                  {look.person} · {look.images.length} foto
                  {look.images.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeGroup ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/82 p-4">
          <button
            type="button"
            aria-label="Fechar galeria"
            onClick={() => setActiveGroup(null)}
            className="absolute right-4 top-4 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white"
          >
            Fechar
          </button>

          <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#1e2a2c] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black/20">
                <Image
                  src={activeGroup.images[activeIndex]}
                  alt={`${activeGroup.title} ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="text-white">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong">
                    {activeGroup.color}
                  </span>
                  <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                    {activeGroup.type}
                  </span>
                </div>
                <h3 className="mt-4 text-3xl font-black uppercase">
                  {activeGroup.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-300">
                  {activeGroup.person}
                </p>
                <p className="mt-6 text-base leading-8 text-slate-200">
                  Navegue pelas imagens deste agrupamento para ver o mesmo look
                  em angulos diferentes e entender melhor o caimento real.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-surface-strong"
                  >
                    Proxima
                  </button>
                </div>

                <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                  {activeGroup.images.map((image, index) => (
                    <button
                      key={`${activeGroup.id}-${image}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border ${
                        index === activeIndex
                          ? "border-accent"
                          : "border-white/10"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${activeGroup.title} miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
