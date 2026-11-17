import type { ServiceCategory as Category } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Motion";
import { ServiceCard } from "./ServiceCard";

export function ServiceCategory({ category, index }: { category: Category; index: number }) {
  const alt = index % 2 === 1;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className={`scroll-mt-24 py-20 sm:py-24 ${alt ? "bg-slate-50" : "bg-white"}`}
    >
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-blue-600">
              <span className="font-display text-sm tracking-normal text-slate-500">0{index + 1}</span>
              <span className="h-px w-8 bg-blue-600/50" aria-hidden="true" />
              {category.eyebrow}
            </p>
            <h2 id={`${category.id}-title`} className="mt-4 flex items-center gap-4 text-3xl font-bold sm:text-4xl">
              <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white sm:grid">
                <Icon name={category.icon} className="h-6 w-6" />
              </span>
              {category.name}
            </h2>
          </div>
          <p className="text-slate-600 sm:text-lg lg:col-span-5">{category.intro}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {category.services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={0.05 * (i % 3)} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
