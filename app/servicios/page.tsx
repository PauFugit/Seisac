import { SERVICE_CATEGORIES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { ServicesBanner } from "@/components/services/ServicesBanner";
import { ServiceCategory } from "@/components/services/ServiceCategory";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ProcessBand } from "@/components/home/ProcessBand";

export const metadata = pageMetadata({
  title: "Servicios",
  description:
    "WiFi, enlaces punto a punto, cableado estructurado, antenas satelitales, cámaras de seguridad IP y 4K, video porteros, chapas inteligentes y portones eléctricos. Servicio a domicilio.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <ServicesBanner />
      {SERVICE_CATEGORIES.map((c, i) => (
        <ServiceCategory key={c.id} category={c} index={i} />
      ))}
      <ProcessBand id="como-trabajamos" />
      <ServicesCta />
    </>
  );
}
