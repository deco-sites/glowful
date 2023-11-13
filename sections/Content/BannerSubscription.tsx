import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    desktop?: ImageWidget;
    altText: string;
  };

  /**
   * @format color
   */
  backgroundColor?: string;

  /**
   * @format html
   */
  title?: string;
  description?: string;
  /**
   * @format color
   */
  textColor?: string;
  link?: {
    text: string;
    href: string;
  };
}

const DEFAULT_PROPS: Props = {
  textColor: "#FFF",
  backgroundColor: "#9063CD",
  link: {
    href: "#",
    text: "CONHECER AS VANTAGENS",
  },
  image: {
    desktop:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
};

export default function BannerSubscription(props: Props) {
  const { link, title, description, textColor, backgroundColor, image } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div
      class={`my-[32px] lg:my-[70px]}`}
      style={{ background: backgroundColor }}
    >
      <div class="container card lg:card-side rounded grid grid-cols-1 lg:grid-cols-[50%_40%] justify-between">
        <div class="card-body gap-[46px]  lg:max-w-[586px] py-[40px]">
          <div
            class={`textFont text-[44px] font-semibold text-center leading-8 lg:leading-10`}
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: props?.title }}
          />
          <p class="text-center text-[18px]" style={{ color: textColor }}>
            {description}
          </p>
          <div class="card-actions justify-center">
            <a
              class="btn bg-transparent"
              style={{ color: textColor, borderColor: textColor }}
              href={link?.href}
            >
              {link?.text}
            </a>
          </div>
        </div>

        <figure class="relative !hidden lg:!flex lg:!items-end">
          <Picture style={{height: "fit-content"}}>
            <Source
              media="(min-width: 768px)"
              src={image?.desktop}
              width={360}
              height={250}
            />
            <img
              class="w-full object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.desktop}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
      </div>
    </div>
  );
}
