import type { ImageWidget } from "apps/admin/widgets.ts";

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
          <img
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
