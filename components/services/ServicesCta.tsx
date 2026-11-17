import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { ButtonLink, Container, TechGrid } from "@/components/ui/primitives";
import { SignalWaves } from "@/components/ui/SignalWaves";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Motion";

export function ServicesCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-14 sm:px-14 sm:py-16">
            <div className="absolute inset-0 -z-10 bg-navy-900/50" />
            <TechGrid className="opacity-80" />
            <SignalWaves className="absolute -right-24 top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2" rings={6} />
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl font-bold leading-tight !text-white sm:text-4xl">
                ¿No sabes qué necesitas? Hacemos el diagnóstico por ti
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Cuéntanos qué está pasando y vamos a revisar tu red, cámaras o accesos para proponerte la solución
                adecuada.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={buildWhatsAppUrl(WA_MESSAGES.diagnosis)} variant="whatsapp" size="lg">
                  <WhatsAppIcon className="h-5 w-5" /> Escríbenos por WhatsApp
                </ButtonLink>
                <ButtonLink href="/contacto" variant="ghost-light" size="lg">
                  Ir a contacto <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
