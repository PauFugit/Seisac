import { pageMetadata } from "@/lib/seo";
import { PageBanner } from "@/components/services/PageBanner";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Motion";

export const metadata = pageMetadata({
  title: "Contacto",
  description:
    "Cotiza redes, cámaras de seguridad o control de accesos con SEISAC. Escríbenos por WhatsApp al +56 9 6226 2519 o completa el formulario.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageBanner
        size="sm"
        crumb="Contacto"
        eyebrow="Hablemos"
        title="Contáctanos"
        description="Cuéntanos qué necesitas y te respondemos a la brevedad. Si prefieres, escríbenos directo por WhatsApp."
      />
      <section aria-label="Formulario y datos de contacto" className="bg-slate-50 py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Envíanos un mensaje</h2>
            <ContactForm variant="full" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-[3.75rem]">
            <ContactInfo className="lg:sticky lg:top-28" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
