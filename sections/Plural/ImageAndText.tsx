import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };

  text?: string;
  /**
   * @format html
   */
  title: string;
  description?: string;
  link?: {
    text: string;
    href: string;
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  link: {
    href: "#",
    text: "Ver agora",
  },
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
};

export default function ImageAndText(props: Props) {
  const { link, text, title, description, image } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="container">
      <div class="pb-[32px] md:pb-[70px] card lg:card-side rounded grid grid-cols-1 justify-between lg:grid-cols-[50%_40%]">
        <figure class="relative">
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={150}
              height={150}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={384}
              height={227}
            />
            <img
              class="w-full  object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
        <div class="card-body gap-0">
          <span class="pb-[16px] pt-[30px] md:pt-0">{text}</span>
          <div
            class="card-title textHighlight pb-[32px]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p class="pb-[40px]">{description}</p>
          <div class="card-actions justify-center lg:justify-start">
            <a
              class="btn bg-transparent text-[#fff] text-sm font-normal tracking-[1px] border-white-lily hover:bg-white-lily hover:text-cherry-pop hover:border-white-lily hover:font-bold"
              href={link?.href}
            >
              {link?.text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
