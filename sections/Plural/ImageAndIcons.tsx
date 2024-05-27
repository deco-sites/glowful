import { Picture } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";

interface Benefits {
  image?: ImageWidget;
  title?: string;
  description?: string;
}

export interface ImageAndIcons {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

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

const DEFAULT_PROPS = {
  imagesAndIcons: [
    {
      matcher: "/*",

      image: {
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        altText: "a",
      },
      subTitle: "As",
      title: "Woman",

      benefits: [
        {
          image:
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
          title: "Lorem",
          description: "Ipsum",
        },
      ],
    },
  ],
};

function ImageAndIcons(props: SectionProps<ReturnType<typeof loader>>) {
  const imageAndIcons = props;

  if (!imageAndIcons.imageAndIcon) {
    return null;
  }

  if (!imageAndIcons.isFiltered) {
    return null;
  }

  const { imageAndIcon } = imageAndIcons;
  const { subTitle, title, image, benefits } = imageAndIcon;

  return (
    <div class="container max-w-[1240px]  py-[80px] lg:pb-[120px] lg:pt-[60px] lg:px-0 card lg:card-side rounded grid grid-cols-1 justify-between lg:grid-cols-[50%_45%] xl:grid-cols-[55%_40%] gap-[5%] z-[-1]">
      {image && (
        <figure class="!hidden lg:!block relative max-h-[820px] max-w-[600px] ">
          <Picture>
            <img
              class="object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image.desktop}
              alt={image.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
      )}

      <div class="px-[24px] lg:px-0 flex flex-col gap-[32px] sm:gap-[30px] lg:row-start-1 lg:col-start-2">
        <div class="flex flex-col gap-[16px] xl:gap-[20px]">
          {subTitle && (
            <p class="text-[16px] leading-[20px] tracking-[1.28px] text-deep-beauty">
              {subTitle}
            </p>
          )}

          {title && (
            <div
              class="text-[28px] text-start leading-[130%] font-fraunces"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>

        <div class="flex flex-col gap-[24px] sm:gap-[20px] lg:p-0">
          {benefits &&
            benefits.map((benefit) => (
              <>
                <div class="flex flex-row items-start gap-[16px] ">
                  <img
                    src={benefit.image}
                    width={24}
                    height={24}
                    class="mt-[2px] lg:mt-[8px]"
                    alt={benefit.title}
                    loading="lazy"
                  />

                  <div class="flex flex-col items-start gap-[16px] sm:gap-[14px]">
                    <p class="text-[20px] sm:text-[26px] font-fraunces text-[#333]">
                      {benefit.title}
                    </p>
                    <span class="text-[16px] text-[#000] leading-[150%]">
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

export interface Props {
  imagesAndIcons?: ImageAndIcons[];
}

export const loader = (props: Props, req: Request) => {
  const { imagesAndIcons } = { ...DEFAULT_PROPS, ...props };

  const imageAndIcon = imagesAndIcons.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  const isFiltered = new URLPattern({ pathname: "/*?filter" }).test(req.url)

  return { imageAndIcon, isFiltered };
};

export default ImageAndIcons;
