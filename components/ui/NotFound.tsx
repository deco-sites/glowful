import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  highlight?: string;
  title?: string;
  description?: string;
  link: {
    text: string;
    href: string;
  };
}

function Alert({ highlight, title, description, link }: Props) {
  return (
    <div class="container pt-[90px] pb-[90px] relative lg:py-[200px]">
      <div class="px-[32px] flex flex-col items-center text-center w-full mx-auto max-w-[650px]">
        {highlight && (
          <p class="font-fraunces text-[20px] lg:text-[28px] font-bold leading-[100%] text-deep-beauty">
            {highlight}
          </p>
        )}
        {title && (
          <h1 class="pt-[16px] pb-[50px] text-[24px] lg:text-[40px] text-deep-beauty">
            {title}
          </h1>
        )}
        {description && (
          <p class="pb-[60px] text-[#ccc] leading-[150%] lg:text-[22px]">
            {description}
          </p>
        )}
        {link.text && link.href && (
          <a
            href={link.href}
            class="btn px-[60px] py-[18px] border-0 rounded-full m-auto uppercase text-[14px] lg:text-[16px] tracking-[1px] font-bold transition-colors duration-300 text-white-lily bg-deep-beauty hover:bg-cherry-pop"
          >
            {link.text}
          </a>
        )}
      </div>
    </div>
  );
}

export default Alert;
