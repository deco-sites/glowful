import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  logo?: {
    image: ImageWidget;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="w-[112px] max-h-[16px]">
          <Image
            loading="lazy"
            src={logo?.image}
            alt="Logo glowful"
            width={112}
            height={16}
          />
        </div>
      )}
    </>
  );
}
