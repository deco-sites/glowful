import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };
  highlight?: string;
  title?: string;
  description?: string;
  link: {
    text: string;
    href: string;
  };
}

function NotFound({ highlight, title, description, link, image }: Props) {
  return (
    <div class="relative pt-[60px] lg:p-0 flex flex-col lg:flex-row  items-center">
      <div class="px-[24px] pb-[60px] lg:px-0 flex flex-col items-center lg:items-start text-center lg:text-start  w-full mx-auto max-w-[500px]">
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
            class="btn px-[60px] py-[18px] border-0 rounded-full uppercase text-[14px] lg:text-[16px] tracking-[1px] font-bold transition-colors duration-300 text-white-lily bg-deep-beauty hover:bg-cherry-pop"
          >
            {link.text}
          </a>
        )}
      </div>

      <figure class={`relative w-fit h-fit`}>
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={image?.mobile}
            width={360}
            height={340}
          />
          <Source
            media="(min-width: 768px)"
            src={image?.desktop ? image?.desktop : image?.mobile}
            width={700}
            height={823}
          />
          <img
            class="w-full object-cover max-w-[530px]"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image?.mobile}
            alt={image?.altText}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </figure>
    </div>
  );
}

export default NotFound;
