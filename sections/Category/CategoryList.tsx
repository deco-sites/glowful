import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Category {
  label: string;
  href?: string;
  imageDesktop?: ImageWidget;
  imageMobile?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  /**
   * @format color
   */
  backgroundColor?: string;
  header?: {
    /**
     * @format html
     */
    title?: HTMLWidget;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText({
  tag,
  label,
  description,
  alignment,
  textColor,
}: {
  tag?: string;
  label?: string;
  description?: string;
  alignment?: "center" | "left";
  textColor?: string;
}) {
  return (
    <div
      class={`flex flex-col ${alignment === "center" ? "text-center" : "text-left"
        }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && (
        <h3
          class="text-[20px] md:text-[28px] text-base-content font-fraunces"
          style={{ color: textColor }}
        >
          {label}
        </h3>
      )}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        label: "Feminino",
        href: "/feminino",
        buttonText: "Conheça",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="py-[40px] lg:py-[90px] lg:ml-[10%] xl:ml-[7%] 2xl:ml-[14%] flex items-center flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[75px] text-base-content"
      style={{
        "background-color": props.backgroundColor,
      }}
    >
      <div class="max-w-[300px] px-[24px]">
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
          black
        />
      </div>

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-[0] pl-[24px] relative"
      >
        <Slider.PrevButton class="w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 left-[20px] lg:left-0 transform -translate-y-1/2 z-[3]">
          <Icon
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.PrevButton>
        <Slider class="lg:overflow-hidden flex justify-between carousel carousel-center sm:carousel-end gap-[20px] lg:gap-[24px] 2xl:gap-[28px] col-span-full row-start-2 row-end-5">
          {list.map(
            ({ label, href, imageDesktop, imageMobile, buttonText }, index) => (
              <Slider.Item
                index={index}
                class="m-[8px] lg:m-0 flex flex-col gap-4 carousel-item relative group rounded-[20px] shadow-md lg:hover:scale-[1.022] transition-all duration-300 lg:w-56 max-w-[350px] 2xl:w-[350px]"
              >
                <a
                  href={href}
                  class="flex flex-col gap-4 w-[296px] lg:w-full lg:h-auto"
                >
                  {imageDesktop && imageMobile && (
                    <figure>
                      <Image
                        class="card w-full h-full lg:block hidden"
                        src={imageDesktop}
                        alt={label || ""}
                        width={350}
                        height={350}
                        loading="lazy"
                      />
                      <Image
                        class="card w-full h-full lg:hidden block"
                        src={imageMobile}
                        alt={label || ""}
                        width={210}
                        height={270}
                        loading="lazy"
                      />
                    </figure>
                  )}
                </a>

                <div class="absolute top-[83%] lg:group-hover:top-[33%] w-full h-fit lg:h-full flex flex-col items-center gap-9 transition-all duration-300 z-[2]">
                  {label && (
                    <p class="text-[24px] lg:text-xl xl:text-[1.25rem] 2xl:text-[2rem] tracking-[1.6px] text-white-lily text-center uppercase font-bold">
                      {label}
                    </p>
                  )}
                  {buttonText && (
                    <a
                      href={href}
                      class="hidden lg:block w-fit bg-[#FFF] rounded-full border-none text-[#000] text-sm xl:text-base uppercase lg:px-8 lg:py-3 px-[60px] py-[18px] xl:px-[40px] xl:py-[16px] font-bold tracking-[1px] hover:bg-cherry-pop hover:text-white-lily hover:border-none transition-all duration-300"
                    >
                      {buttonText}
                    </a>
                  )}
                </div>

                <div class="absolute w-full h-full transition-all duration-300 rounded-[20px] lg:group-hover:bg-[#00000050] z-[1]" />
              </Slider.Item>
            )
          )}
        </Slider>
        <Slider.NextButton class="w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 right-[20px] lg:right-[6%] transform -translate-y-1/2 z-[1]">
          <Icon
            size={24}
            id="ChevronRight"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.NextButton>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default CategoryList;
