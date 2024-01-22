import { Picture, Source } from "apps/website/components/Picture.tsx";
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

  /**
   * @format html
   */
  title: string;

  benefits?: Array<Benefits>;

  buttonText?: string;
  href?: string;
}

export default function ImageAndText(props: Props) {
  const { title, image, benefits, href, buttonText } = {
    ...props,
  };

  return (
    <div class="lg:bg-[#F4F4F4]">
      <div class="py-[40px] lg:py-0 lg:px-0 lg:ml-[2%]  xl:ml-[10%] card lg:card-side rounded grid grid-cols-1 justify-betweenx lg:grid-cols-[50%_48%] xl:grid-cols-[58%_40%] justify-items-center">
        <figure class=" relative items-center justify-centera justify-self-end max-h-[750px] ">
          <Picture class="hidden lg:flex items-center justify-center">
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

        <div class="lg:py-[80px] px-[24px] lg:px-0 flex flex-col items-center gap-[28px] lg:gap-[80px] lg:row-start-1 lg:col-start-1 lg:max-w-[616px]">
          <div
            class="card-title textIconHighLight text-[24px] tracking-[1.2px] uppercase font-medium lg:text-[32px] text-center justify-center"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <div class="flex flex-col lg:flex-row lg:flex-wrap gap-[40px] xl:gap-[40px] md:gap-[20px] px-[20px] py-[30px]  lg:p-0  bg-[#F4F4F4] rounded-[15px]">
            {benefits &&
              benefits.map((benefit) => (
                <>
                  {/* MOBILE */}
                  <div class="flex lg:hidden flex-col gap-[12px]">
                    <div class="flex gap-[20px] items-center">
                      <img src={benefit.image} width={32} height={32} />
                      <p class="text-[16px] font-semibold tracking-[0.8px] leading-[130%] text-deep-beauty">
                        {benefit.title}
                      </p>
                    </div>
                    <span class="text-[14px] text-deep-beauty">
                      {benefit.description}
                    </span>
                  </div>

                  {/* DESKTOP */}
                  <div class="hidden lg:flex items-start  gap-[24px] lg:max-w-[260px]">
                    <img src={benefit.image} width={32} height={32} />
                    <div class="flex flex-col gap-[16px]">
                      <p class="text-[22px] font-semibold tracking-[1.1px] leading-[130%] text-deep-beauty">
                        {benefit.title}
                      </p>
                      <span class="text-[16px] text-deep-beauty leading-[140%]">
                        {benefit.description}
                      </span>
                    </div>
                  </div>
                </>
              ))}
          </div>

          {href && buttonText && (
            <a
              href={href}
              class="w-fit bg-cherry-pop rounded-full border-none text-white-lily text-sm uppercase px-[60px] py-[18px] font-bold tracking-[1px] hover:bg-white-lily hover:text-cherry-pop hover:border-none transition-all duration-300"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
