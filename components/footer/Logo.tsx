import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-[24px] md:max-w-[310px]">
          <div class="w-[230px] max-h-16">
            <img
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={230}
              height={54}
            />
          </div>
          <div class="text-[14px] text-[#878787]">{logo?.description}</div>
        </div>
      )}
    </>
  );
}
