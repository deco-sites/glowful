import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };

  /**
   * @format html
   */
  title: string;
  benefits: {
    image?: ImageWidget;
    title: string;
    description: string;
  }[];
}

const DEFAULT_PROPS: Props = {
  title: "",
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
  benefits: {
    title: "",
    description: "",
  },
};

export default function ImageAndText(props: Props) {
  const { title, image, benefits } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="container">
      <div class="pb-[32px] md:pb-[70px] card lg:card-side rounded grid grid-cols-1 justify-between lg:grid-cols-[50%_40%]">
        <figure class="relative flex items-center justify-center">
          <Picture class="flex items-center justify-center">
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
              class="w-full object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>

        <div class="card-body gap-0">
          <div
            class="card-title textHighlight pb-[32px] lg:pb-[5
            0px] text-center"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <div class="grid grid-cols-2 gap-[16px] lg:gap-[24px]">
            {benefits.map((benefit) => (
              <div class="flex flex-col gap-[16px] items-center text-center">
                <img src={benefit.image} width={46} height={46} />
                <p class="text-[14px] font-semibold text-deep-beauty">
                  {benefit.title}
                </p>
                <span class="text-[14px] text-deep-beauty">
                  {benefit.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
