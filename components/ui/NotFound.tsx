import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt: string;
  };
  title?: string;
  description?: string;
  link: {
    text: string;
    href: string;
  };
}

function Alert({ image, title, description, link }: Props) {
  return (
    <div class="container pt-[80px] pb-[80px] relative lg:py-[160px]">
      <div
        className={
          "px-[45px] mb-[16px] lg:mb-0 w-full h-full max-h-[500px] mx-auto flex items-center justify-center"
        }
      >
        <figure class="relative max-w-[1000px]">
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image.mobile}
              width={270}
              height={110}
            />
            <Source
              media="(min-width: 768px)"
              src={image.desktop ? image.desktop : image.mobile}
              width={500}
              height={202}
            />
            <img
              class="w-full  object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image.mobile}
              alt={image.alt}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
      </div>
      <div class="px-[32px] flex flex-col gap-[60px] w-full lg:max-w-[777px] mx-auto lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
        <h1 class="text-[32px] lg:text-[64px] text-center italic font-fraunces font-bold text-transparent bg-clip-text bg-gradient-to-r  from-[#D62C79] to-[#E4A1AE] ">
          {title}
        </h1>
        <p class="text-center leading-[150%] lg:text-[24px]">{description}</p>
        <a
          href={link.href}
          class="btn px-[40px] border-0 max-w-[250px] m-auto text-white-lily text-uppercase text-[14px] tracking-[1px] font-medium bg-gradient-to-r from-[#CE0F69] to-[#FF9EBC] transition-colors duration-300 lg:hover:border-transparent"
        >
          {link.text}
        </a>
      </div>
    </div>
  );
}

export default Alert;
