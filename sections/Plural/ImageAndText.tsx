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
    /**
     * @format color
     */
    color?: string;
  };

  styles?: {
    invertImage?: boolean;
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
  styles: {
    invertImage: false,
  },
};

export default function ImageAndText(props: Props) {
  const { link, text, title, description, image, styles } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="container px-[24px]">
      <div
        class={`py-[32px] md:py-[70px] card lg:card-side rounded flex justify-between flex-col gap-[30px] lg:gap-[50px] ${
          styles?.invertImage ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <figure class={`relative w-fit h-fit`}>
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={360}
              height={268}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={670}
              height={500}
            />
            <img
              class="w-full object-cover max-w-[670px]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
        <div class="card-body p-0 gap-0 w-full max-w-[430px]">
          <span class="pb-[16px] pt-[30px] md:pt-0">{text}</span>
          <div
            class="card-title textHighlight pb-[32px]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p class="pb-[40px] ">{description}</p>
          <div class="card-actions justify-center lg:justify-start">
            {link && (
              <a
                class={`btn bg-transparent text-[${
                  link?.color ? link?.color : "#fff"
                }] border-[${
                  link?.color ? link?.color : "#fff"
                }] text-sm font-normal tracking-[1px] hover:bg-white-lily hover:brightness-75 hover:border-brightness-75 hover:font-bold`}
                href={link?.href}
              >
                {link?.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
