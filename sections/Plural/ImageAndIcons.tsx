import { Picture } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Benefits {
  image?: ImageWidget;
  title?: string;
  description?: string;
}

export interface Props {
  image: {
    desktop?: ImageWidget;
    altText?: string;
  };

  subTitle: string;
  /**
   * @format html
   */
  title: string;

  benefits?: Array<Benefits>;
}

export default function ImageAndIcons(props: Props) {
  const { subTitle, title, image, benefits } = {
    ...props,
  };

  return (
    <div class="py-[40px] lg:pb-[120px] lg:pt-[60px] lg:px-0 card lg:card-side rounded grid grid-cols-1 justify-center lg:grid-cols-[50%_50%] gap-[5%]">
      <figure class="!hidden lg:!flex relative items-center justify-center max-w-[700px] justify-self-end">
        <Picture class="items-center justify-center">
          <img
            class="w-full object-cover"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image.desktop}
            alt={image.altText}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </figure>

      <div class="px-[24px] lg:px-0 flex flex-col gap-[32px] lg:gap-[40px] lg:row-start-1 lg:col-start-2 lg:max-w-[520px]">
        <div class="flex flex-col gap-[16px] lg:gap-[24px]">
          {subTitle && (
            <p class="text-[16px] lg:text-[18px] leading-[20px] tracking-[1.28px] text-deep-beauty">
              {subTitle}
            </p>
          )}

          {title && (
            <div
              class="text-[28px] lg:text-[32px] text-start leading-[130%] font-fraunces"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>

        <div class="flex flex-col gap-[24px] lg:p-0">
          {benefits &&
            benefits.map((benefit) => (
              <>
                <div class="flex flex-row items-start gap-[16px] ">
                  <img
                    src={benefit.image}
                    width={24}
                    height={24}
                    class="mt-[4px]"
                    alt={benefit.title}
                    loading="lazy"
                  />

                  <div class="flex flex-col items-start gap-[16px]">
                    <p class="text-[20px]  lg:text-[32px] font-fraunces text-[#333]">
                      {benefit.title}
                    </p>
                    <span class="text-[16px] lg:text-[18px] text-[#000] leading-[150%]">
                      {benefit.description}
                    </span>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
