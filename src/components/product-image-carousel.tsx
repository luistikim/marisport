"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export type ProductGalleryImage = {
  src: string;
  alt: string;
};

type ProductImageCarouselProps = {
  images: ProductGalleryImage[];
  productName: string;
};

export function ProductImageCarousel({
  images,
  productName,
}: ProductImageCarouselProps) {
  const safeImages = useMemo(
    () =>
      images
        .filter((image) => Boolean(image.src))
        .map((image, index) => ({
          src: image.src,
          alt: image.alt?.trim() || `${productName} imagem ${index + 1}`,
        })),
    [images, productName],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [carouselRef, carouselApi] = useEmblaCarousel({
    loop: safeImages.length > 1,
    align: "start",
  });
  const [lightboxRef, lightboxApi] = useEmblaCarousel({
    loop: safeImages.length > 1,
    align: "center",
  });

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    function onSelect() {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    }

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!lightboxApi || !isLightboxOpen) {
      return;
    }

    lightboxApi.scrollTo(selectedIndex, true);
  }, [isLightboxOpen, lightboxApi, selectedIndex]);

  useEffect(() => {
    if (!lightboxApi) {
      return;
    }

    function onSelect() {
      setSelectedIndex(lightboxApi.selectedScrollSnap());
    }

    lightboxApi.on("select", onSelect);
    lightboxApi.on("reInit", onSelect);

    return () => {
      lightboxApi.off("select", onSelect);
      lightboxApi.off("reInit", onSelect);
    };
  }, [lightboxApi]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen, lightboxApi, selectedIndex, safeImages.length]);

  if (!safeImages.length) {
    return null;
  }

  function openLightbox(index: number) {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  }

  function closeLightbox() {
    setIsLightboxOpen(false);
  }

  function goPrev() {
    if (!lightboxApi) {
      return;
    }

    lightboxApi.scrollPrev();
  }

  function goNext() {
    if (!lightboxApi) {
      return;
    }

    lightboxApi.scrollNext();
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden rounded-[2rem]">
            <div className="flex touch-pan-y">
              {safeImages.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative min-w-0 flex-[0_0_100%] overflow-hidden bg-[#f4fbef] outline-none"
                  aria-label={`Abrir imagem ${index + 1} de ${safeImages.length} em tela cheia`}
                >
                  <div className="relative aspect-[4/5] sm:aspect-[16/10]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 80vw"
                      priority={index === 0}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {safeImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => carouselApi?.scrollPrev()}
                className="absolute left-3 top-1/2 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 p-3 text-surface-strong shadow-[0_12px_30px_rgba(19,38,59,0.12)] transition hover:bg-white"
                aria-label="Imagem anterior"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => carouselApi?.scrollNext()}
                className="absolute right-3 top-1/2 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 p-3 text-surface-strong shadow-[0_12px_30px_rgba(19,38,59,0.12)] transition hover:bg-white"
                aria-label="Próxima imagem"
              >
                <ChevronRightIcon />
              </button>
            </>
          ) : null}
        </div>

        {safeImages.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safeImages.map((image, index) => (
              <button
                key={`${image.src}-thumb-${index}`}
                type="button"
                onClick={() => carouselApi?.scrollTo(index)}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl border transition ${
                  index === selectedIndex
                    ? "border-accent shadow-[0_0_0_2px_rgba(125,187,56,0.24)]"
                    : "border-[#d8e4db] opacity-75 hover:opacity-100"
                }`}
                aria-label={`Ir para a imagem ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 ${
          isLightboxOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isLightboxOpen}
        onClick={closeLightbox}
      >
        <div
          className={`relative w-full max-w-6xl transition-all duration-300 ${
            isLightboxOpen ? "scale-100 translate-y-0" : "scale-[0.98] translate-y-2"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/90 text-surface-strong shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition hover:bg-white"
            aria-label="Fechar imagem"
          >
            <CloseIcon />
          </button>

          {safeImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 p-3 text-surface-strong shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition hover:bg-white"
                aria-label="Imagem anterior"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 p-3 text-surface-strong shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition hover:bg-white"
                aria-label="Próxima imagem"
              >
                <ChevronRightIcon />
              </button>
            </>
          ) : null}

          <div ref={lightboxRef} className="overflow-hidden rounded-[2rem]">
            <div className="flex touch-pan-y">
              {safeImages.map((image, index) => (
                <div key={`${image.src}-lightbox-${index}`} className="min-w-0 flex-[0_0_100%]">
                  <div className="relative mx-auto aspect-[4/5] max-h-[82vh] w-full max-w-4xl bg-black sm:aspect-[16/10]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-4xl items-center justify-between gap-3 text-white">
            <p className="text-sm font-semibold">
              {selectedIndex + 1} de {safeImages.length}
            </p>
            <p className="text-sm text-white/70">Clique fora da imagem ou pressione ESC para fechar</p>
          </div>
        </div>
      </div>
    </>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 6 6 18" />
      <path d="M6 6 18 18" />
    </svg>
  );
}
