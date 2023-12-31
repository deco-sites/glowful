import Logo from "$store/components/footer/Logo.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export type Props = {
  content: {
    label: string;
    href: string;
  }[];
  logo: {
    image: ImageWidget;
  };
};

export default function ExtraLinks({ content, logo }: Props) {
  return (
    <>
      {content && content?.length > 0 && (
        <div class="flex flex-col lg:flex-row lg:justify-between gap-[64px] lg:gap-10 lg:w-full">
          <div class="flex flex-col lg:flex-row lg:order-2 lg:items-center lg:gap-1">
            <p class="text-[#878787] mb-[8px] lg:mb-0 lg:text-[16px]">
              Todos os direitos reservados:
            </p>
            {content.map((item) => (
              <a
                class="link text-[18px] lg:text-[16px] leading-[30px] text-white-lily col-auto lg:before:content-['|'] lg:before:mr-1 lg:before:text-[#878787]"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div class="flex flex-col items-start lg:items-center gap-[16px] lg:flex-row lg:gap-[24px]">
            <Logo logo={logo} />

            <p class="text-[#878787] lg:order-1 lg:text-[18px]">
              Copyright © 2024 Seviva Glowful
            </p>
          </div>
        </div>
      )}
    </>
  );
}
