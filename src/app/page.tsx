import Image from "next/image";
import Link from "next/link";
import { LookbookGallery } from "@/components/lookbook-gallery";
import {
  brandPillars,
  brandChannels,
  communityMoments,
  contactPhone,
  editorialHighlights,
  featuredProducts,
  instagramLink,
  mensLooks,
  outfitGroups,
  outfitCollections,
  productFlatlays,
  productGrid,
  whatsappLink,
} from "@/data/site";

export default function Home() {
  return (
    <main>
      <section className="brand-wave px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Performance wear
            </span>
            <h1 className="text-balance max-w-3xl text-5xl font-black uppercase leading-none text-white sm:text-6xl lg:text-7xl">
              Roupa esportiva com energia para academia e corrida.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-100 sm:text-lg">
              A Mari Sport e uma marca de roupa esportiva criada para quem busca
              looks para academia, corrida e rotina ativa com mais conforto,
              estilo e presenca. Nossos conjuntos fitness, tops, leggings,
              shorts, camisetas dry fit, bermudas masculinas e pecas esportivas
              unem performance, caimento e identidade visual em uma experiencia
              moderna e responsiva.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/produtos"
                className="rounded-full bg-accent px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-surface-strong shadow-[0_18px_40px_rgba(135,255,0,0.3)] transition-transform hover:-translate-y-0.5"
              >
                Ver produtos
              </Link>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/14 bg-white/8 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/14"
              >
                Comprar no WhatsApp
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute -right-2 bottom-10 h-32 w-32 rounded-full bg-white/12 blur-3xl" />
            <div className="sport-card brand-outline relative overflow-hidden rounded-[2rem] p-5 text-white">
              <div className="hero-grid rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <div className="mb-6 rounded-[1.4rem] bg-white/6 p-4">
                  <Image
                    src="/logo-marisport.png"
                    alt="Mari Sport"
                    width={520}
                    height={220}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
                  Identidade Mari Sport
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="glass-surface rounded-[1.5rem] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-200">
                      Escudo da marca
                    </p>
                    <p className="mt-3 text-2xl font-bold">
                      Forca, movimento e seguranca como assinatura visual.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-accent to-[#c7ff64] p-5 text-surface-strong">
                    <p className="text-xs uppercase tracking-[0.18em]">
                      Cor destaque
                    </p>
                    <p className="mt-3 text-2xl font-black">
                      Verde neon para imprimir energia e atitude.
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-[#edf3f4] p-5 text-surface-strong">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4f6b74]">
                    Nova direcao visual
                  </p>
                  <p className="mt-3 text-3xl font-black uppercase leading-tight">
                    Strong look, active spirit
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-700">
                    O site agora pode evoluir em cima da paleta real da marca:
                    azul petroleo, branco e verde neon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {brandChannels.map((channel) => (
              <article
                key={channel.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/8 p-6 text-white shadow-[0_16px_40px_rgba(19,38,59,0.12)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
                  {channel.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-100">
                  {channel.text}
                </p>
                <Link
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-5 inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/14"
                >
                  {channel.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
                Produtos em destaque
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Pecas para treinar e correr com estilo.
              </h2>
            </div>
            <Link
              href="/produtos"
              className="text-sm font-bold uppercase tracking-[0.16em] text-accent"
            >
              Ver catalogo completo
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#5b757e] shadow-[0_14px_40px_rgba(19,38,59,0.12)]"
              >
                <div className="relative h-56 overflow-hidden p-6 text-white">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.palette}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(135,255,0,0.14),transparent_30%)]" />
                  <div className="hero-grid absolute inset-0 opacity-35" />
                  <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.2em]">
                    {product.category}
                  </p>
                  <h3 className="mt-3 max-w-[12rem] text-3xl font-black uppercase leading-tight">
                    {product.name}
                  </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7 text-slate-100">
                    {product.description}
                  </p>
                  <div className="mt-5 flex items-center justify-end">
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                    >
                      Pedir
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
                Looks em movimento
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                A marca funciona melhor quando aparece em uso real.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-200">
              O feed mostra corrida, treino, rua e presenca visual. Trouxe isso
              para a Home para deixar o site mais vivo e mais proximo da marca.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {editorialHighlights.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_18px_50px_rgba(19,38,59,0.14)]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-black uppercase">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
                Pecas em destaque
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Visualize as pecas sem look montado.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-200">
              Uma vitrine limpa para destacar modelagem, combinacao de cores e
              tipo de conjunto, sem exibir preco.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {productFlatlays.map((item) => (
              <article
                key={item.src}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#edf3f4] shadow-[0_18px_50px_rgba(19,38,59,0.12)]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-surface-strong">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-surface-strong">
                      {item.color}
                    </span>
                    <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black uppercase">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
                Clientes e looks reais
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Carrossel com pecas separadas por cor e tipo.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-200">
              Deslize para ver combinacoes usadas por clientes e entender como
              cada conjunto aparece na pratica.
            </p>
          </div>

          <LookbookGallery collections={outfitCollections} />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/8 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Separado por cor
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {outfitGroups.colors.map((group) => (
                  <div
                    key={group.name}
                    className="rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-3"
                  >
                    <p className="text-sm font-bold uppercase text-white">
                      {group.name}
                    </p>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-slate-200">
                      {group.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-[#263537] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Separado por tipo
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {outfitGroups.types.map((group) => (
                  <div
                    key={group.name}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3"
                  >
                    <p className="text-sm font-bold uppercase text-white">
                      {group.name}
                    </p>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-slate-200">
                      {group.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="masculino" className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto space-y-6 max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-[#263537] p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.22)]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
                Linha masculina
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight">
                A Mari Sport tambem veste o movimento masculino.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Corrida, treino e rotina ativa com pecas funcionais, leves e com
                identidade esportiva alinhada ao restante da marca.
              </p>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Consultar linha masculina
              </Link>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_18px_50px_rgba(19,38,59,0.14)]">
              <div className="grid gap-0 md:grid-cols-[0.72fr_1fr]">
                <div className="relative min-h-[320px] bg-black">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="/WhatsApp Video 2026-03-15 at 21.01.14.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="p-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                    Destaque em video
                  </p>
                  <h3 className="mt-4 text-3xl font-black uppercase leading-tight">
                    Detalhes da bermuda masculina em movimento.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-200">
                    O video entra como prova de produto, mostrando textura,
                    caimento e acabamento da bermuda durante o uso real.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-surface-strong">
                      Masculino
                    </span>
                    <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                      Bermuda performance
                    </span>
                    <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                      Video real
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {mensLooks.map((look) => (
              <article
                key={look.src}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_18px_50px_rgba(19,38,59,0.12)]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={look.src}
                    alt={look.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 text-white">
                  <h3 className="text-xl font-black uppercase leading-tight">
                    {look.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {look.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-surface-strong p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.2)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              Sobre a marca
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-tight">
              A Mari Sport veste a forca do movimento.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Nascemos para entregar moda esportiva feminina com visual forte,
              conforto real e acabamento pensado para rotina de treino, corrida
              e bem-estar.
            </p>
            <Link
              href="/sobre"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
            >
              Conhecer a marca
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {brandPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6 shadow-[0_14px_30px_rgba(19,38,59,0.06)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                  {pillar.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-100">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/8 p-8 text-white shadow-[0_18px_50px_rgba(19,38,59,0.12)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            Moda fitness com identidade
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
              <p className="text-base leading-8 text-slate-100">
                Quem procura roupa esportiva feminina para academia, conjuntos
                fitness para treino, tops esportivos, leggings com boa modelagem,
                short fitness feminino e roupas para corrida encontra na Mari
                Sport uma proposta focada em versatilidade e impacto visual. A
                marca trabalha colecoes com combinacoes de cor, looks reais e
                pecas pensadas para uso diario.
              </p>
              <p className="text-base leading-8 text-slate-100">
                Alem da linha feminina, a Mari Sport tambem apresenta roupa
                esportiva masculina com shorts, camisetas dry fit e bermudas
                performance para corrida e treino. O objetivo do site e mostrar
                produtos, inspirar composicoes e facilitar o contato direto para
                atendimento, catalogo e compra pelo WhatsApp no numero
                {` ${contactPhone}`}.
              </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#d8ff9e_0%,#87ff00_48%,#5fe000_100%)] p-8 text-surface-strong shadow-[0_20px_60px_rgba(135,255,0,0.24)]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em]">
                Atendimento rapido
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
                Fale com a Mari Sport e monte seu pedido pelo WhatsApp.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {productGrid.slice(0, 4).map((item) => (
                <div key={item.name} className="rounded-[1.4rem] bg-white/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    {item.badge}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase leading-5">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#263537] p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.18)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
              Instagram oficial
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl">
              Acompanhe a Mari Sport de perto no Instagram.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-slate-300">
              Use o perfil para ver novidades, looks, lancamentos e a energia
              visual da marca em tempo real.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.12)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-200">
              @mari_sportfit
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              Siga, interaja e use o Instagram como ponto rapido para conhecer a
              identidade da marca e entrar em contato.
            </p>
            <Link
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full border border-white/14 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/14"
            >
              Abrir Instagram
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
                Comunidade e eventos
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                A Mari Sport tambem se apresenta como experiencia.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-200">
              O Instagram deixa claro que a marca nao vive so de produto: ela
              tambem aparece em encontros, auloes, treinos e relacionamento.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {communityMoments.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#263537] shadow-[0_18px_50px_rgba(19,38,59,0.16)]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-black uppercase">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
