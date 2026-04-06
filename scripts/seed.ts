import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "../src/sanity/lib/env.ts";
import { categoryData } from "../src/data/categories.ts";
import { contactData } from "../src/data/contact.ts";
import {
  brandChannels,
  brandPillars,
  brandStoryMoments,
  coupleStory,
  trustSignals,
  whyChooseMariSport,
} from "../src/data/about.ts";
import { getProductVariants, productGrid } from "../src/data/product.ts";
import {
  homeAbout,
  homeBenefits,
  homeCatalog,
  homeContact,
  homeCta,
  homeHero,
  homeTrust,
} from "../src/data/home.ts";
import {
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
} from "../src/data/site.ts";

type SanityImageField = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

type SeedDoc = Record<string, unknown> & {
  _id: string;
  _type: string;
};

const publicDir = path.resolve(process.cwd(), "public");
const assetCache = new Map<string, Promise<SanityImageField | null>>();
const writeToken = process.env.SANITY_WRITE_TOKEN?.trim() ?? "";
const sanityWriteConfigured = Boolean(sanityProjectId && sanityDataset && writeToken);
const sanityWriteClient = sanityWriteConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      token: writeToken,
      useCdn: false,
      perspective: "published",
    })
  : null;

function requireWriteClient() {
  if (!sanityWriteConfigured || !sanityWriteClient) {
    throw new Error(
      "Configure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET e SANITY_WRITE_TOKEN antes de rodar o seed.",
    );
  }

  return sanityWriteClient;
}

function toFilePath(relativePath: string) {
  return path.join(publicDir, relativePath.replace(/^\//, ""));
}

async function uploadImageByFilename(relativePath?: string) {
  if (!relativePath) {
    return null;
  }

  const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

  const cached = assetCache.get(normalizedPath);
  if (cached) {
    return cached;
  }

  const promise = (async () => {
    const client = requireWriteClient();
    const filename = path.basename(normalizedPath);
    const localPath = toFilePath(normalizedPath);

    if (!fs.existsSync(localPath)) {
      console.warn(`Imagem nao encontrada: ${normalizedPath}`);
      return null;
    }

    const existingAsset = await client.fetch<{ _id: string } | null>(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
      { filename },
    );

    const assetId =
      existingAsset?._id ??
      (
        await client.assets.upload("image", fs.createReadStream(localPath), {
          filename,
        })
      )._id;

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetId,
      },
    } satisfies SanityImageField;
  })();

  assetCache.set(normalizedPath, promise);
  return promise;
}

function createImageReference(image: SanityImageField | null | undefined) {
  return image ?? undefined;
}

function slugReference(id: string) {
  return { _type: "reference", _ref: id };
}

async function seedSiteSettings() {
  const client = requireWriteClient();

  const doc: SeedDoc = {
    _id: "configuracaoSite",
    _type: "configuracaoSite",
    siteName,
    siteDescription,
    siteKeywords,
    siteUrl,
  };

  await client.createOrReplace(doc);
}

async function seedContact() {
  const client = requireWriteClient();

  const doc: SeedDoc = {
    _id: "contato",
    _type: "contato",
    whatsappPhone: contactData.whatsappPhone,
    whatsappMessage: contactData.whatsappMessage,
    contactPhone: contactData.contactPhone,
    contactEmail: contactData.contactEmail,
    instagramHandle: contactData.instagramHandle,
    instagramUrl: contactData.instagramUrl,
    atendimentoTitle: "Atendimento",
    atendimentoDescription:
      "A Mari Sport usa o WhatsApp como canal principal para enviar fotos, explicar tamanhos e indicar a melhor opcao para o seu estilo.",
    atendimentoSchedule: "Seg a sab, das 9h as 18h",
    atendimentoCoverage: "Atendimento online para todo o Brasil",
  };

  await client.createOrReplace(doc);
}

async function seedCategories() {
  const client = requireWriteClient();

  const docs: SeedDoc[] = [
    {
      _id: "categoria-feminino",
      _type: "categoria",
      title: categoryData.feminine.title,
      slug: { current: categoryData.feminine.id },
      description: categoryData.feminine.description,
      order: 1,
    },
    {
      _id: "categoria-masculino",
      _type: "categoria",
      title: categoryData.masculine.title,
      slug: { current: categoryData.masculine.id },
      description: categoryData.masculine.description,
      order: 2,
    },
  ];

  for (const doc of docs) {
    await client.createOrReplace(doc);
  }
}

function toSanityProductDoc(product: (typeof productGrid)[number], image: SanityImageField | null): SeedDoc {
  const isFeminino = product.category === "Feminino";
  const categoryId = isFeminino ? "categoria-feminino" : "categoria-masculino";
  const variants = (product.variants?.length ? product.variants : getProductVariants(product)).map(
    (variant, index) => ({
      size: variant.size ?? undefined,
      color: variant.color ?? undefined,
      stock:
        typeof variant.stock === "number"
          ? variant.stock
          : product.statusLabel === "Disponivel agora"
            ? Math.max(1, 5 - (index % 3))
            : 0,
    }),
  );

  return {
    _id: `produto-${product.id}`,
    _type: "produto",
    name: product.name,
    slug: { current: product.id },
    badge: product.badge,
    shortDescription: product.description,
    fullDescription: product.description,
    unitPrice: product.unitPrice,
    originalPrice: product.originalPrice ?? null,
    image: createImageReference(image),
    category: slugReference(categoryId),
    variants,
    sizes: product.sizes ?? variants.map((variant) => variant.size).filter(Boolean),
    colors: product.colors ?? variants.map((variant) => variant.color).filter(Boolean),
    statusLabel: product.statusLabel,
    featured: Boolean(product.featured),
    order:
      product.id === "conjunto-top-cropped"
        ? 1
        : product.id === "conjunto-power-set"
          ? 2
          : product.id === "top-sprint-pulse"
            ? 3
            : product.id === "camiseta-dry-active"
              ? 4
              : product.id === "short-energy-move"
                ? 5
                : 6,
  };
}

async function seedProducts() {
  const client = requireWriteClient();

  for (const product of productGrid) {
    const image = await uploadImageByFilename(product.imageSrc);
    const doc = toSanityProductDoc(product, image);
    await client.createOrReplace(doc);
  }
}

async function seedAbout() {
  const client = requireWriteClient();

  const imagePaths = [
    "/perfil.jpeg",
    "/WhatsApp Image 2026-03-15 at 21.01.08.jpeg",
    "/WhatsApp Image 2026-03-15 at 21.01.08.jpeg",
  ];

  const images = await Promise.all(imagePaths.map((imagePath) => uploadImageByFilename(imagePath)));

  const doc: SeedDoc = {
    _id: "sobreMarca",
    _type: "sobreMarca",
    coupleStory,
    brandPillars,
    brandStoryMoments: brandStoryMoments.map((item, index) => ({
      ...item,
      image: createImageReference(images[index]),
    })),
    brandChannels,
    trustSignals,
    whyChooseMariSport,
  };

  await client.createOrReplace(doc);
}

async function seedHome() {
  const client = requireWriteClient();

  const doc: SeedDoc = {
    _id: "home",
    _type: "home",
    heroEyebrow: homeHero.eyebrow,
    heroTitle: homeHero.title,
    heroDescription: homeHero.description,
    heroPrimaryCtaLabel: homeHero.primaryCta.label,
    heroPrimaryCtaHref: homeHero.primaryCta.href,
    heroSecondaryCtaLabel: homeHero.secondaryCta.label,
    heroSecondaryCtaHref: homeHero.secondaryCta.href,
    heroStats: homeHero.stats,
    identityEyebrow: homeHero.identityEyebrow,
    identityTitle: homeHero.identityTitle,
    identityDescription: homeHero.identityDescription,
    conversionEyebrow: homeHero.conversionEyebrow,
    conversionDescription: homeHero.conversionDescription,
    benefitsEyebrow: homeBenefits.eyebrow,
    benefitsTitle: homeBenefits.title,
    benefitsDescription: homeBenefits.description,
    benefitsItems: homeBenefits.items,
    catalogEyebrow: homeCatalog.eyebrow,
    catalogTitle: homeCatalog.title,
    catalogCtaLabel: homeCatalog.ctaLabel,
    aboutEyebrow: homeAbout.eyebrow,
    aboutTitle: homeAbout.title,
    aboutDescription: homeAbout.description,
    whyChooseTitle: homeAbout.whyChooseTitle,
    trustEyebrow: homeTrust.eyebrow,
    trustTitle: homeTrust.title,
    contactEyebrow: homeContact.eyebrow,
    contactTitle: homeContact.title,
    contactDescription: homeContact.description,
    contactWhatsappDescription: homeContact.whatsappDescription,
    contactEmailDescription: homeContact.emailDescription,
    ctaEyebrow: homeCta.eyebrow,
    ctaTitle: homeCta.title,
    ctaDescription: homeCta.description,
    ctaPrimaryCtaLabel: homeCta.primaryCta.label,
    ctaPrimaryCtaHref: homeCta.primaryCta.href,
    ctaSecondaryCtaLabel: homeCta.secondaryCta.label,
    ctaSecondaryCtaHref: homeCta.secondaryCta.href,
  };

  await client.createOrReplace(doc);
}

async function run() {
  if (!sanityWriteConfigured) {
    throw new Error(
      "Defina NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET e SANITY_WRITE_TOKEN antes de rodar npm run seed.",
    );
  }

  console.log("Iniciando seed do Sanity para Mari Sport...");

  await seedSiteSettings();
  await seedContact();
  await seedCategories();
  await seedProducts();
  await seedAbout();
  await seedHome();

  console.log("Seed concluido com sucesso.");
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
