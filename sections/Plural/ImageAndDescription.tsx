import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import DescriptionAboutCategory from "$store/islands/DescriptionAboutCategory.tsx";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };

  /**
   * @format html
   */
  descriptionOne: string;
  /**
   * @format html
   */
  descriptionTwo: string;

  styles?: {
    invertImage?: boolean;
  };
}

export default function ImageAndDescription(props: Props) {
  const { descriptionOne, descriptionTwo, image, styles } = {
    ...props,
  };

  return (
    <div class="container ">
      <div
        class={`lg:py-[90px] lg:card lg:card-side lg:rounded-none rounded flex justify-between flex-col lg:gap-[50px] ${
          styles?.invertImage ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <figure class={`relative w-full lg:w-fit h-fit`}>
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={360}
              height={270}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={530}
              height={430}
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

        <div class="max-w-[630px] pb-[32px] pt-[40px] lg:p-0">
          <DescriptionAboutCategory
            descriptionOne={descriptionOne}
            descriptionTwo={descriptionTwo}
          />
        </div>
      </div>
    </div>
  );
}
