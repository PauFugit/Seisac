import { ArrowRight } from "lucide-react";
import { ButtonLink, Container, TechGrid } from "@/components/ui/primitives";
import { SignalWaves } from "@/components/ui/SignalWaves";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-900 pt-24">
      <TechGrid />
      <SignalWaves className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2" rings={6} />
      <Container className="text-center">
        <p className="eyebrow text-cyan-300">Error 404 · Sin señal</p>
        <h1 className="mt-4 text-4xl font-extrabold !text-white sm:text-6xl">Esta página no tiene cobertura</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-slate-200">
          El enlace que buscas no existe o fue movido. Te llevamos de vuelta a una zona con buena señal.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/" size="lg">
            Volver al inicio <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
