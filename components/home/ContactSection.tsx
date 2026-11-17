import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Container, SectionTitle } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Motion";

export function ContactSection() {
  return (
    <section aria-labelledby="home-contact-title" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            id="home-contact-title"
            eyebrow="Contacto"
            title="Cuéntanos qué necesitas"
            description="Déjanos tus datos y te respondemos a la brevedad, o escríbenos directo por WhatsApp."
          />
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm variant="compact" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <ContactInfo className="h-full" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
