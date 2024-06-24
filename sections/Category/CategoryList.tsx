import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

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
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
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
      class="py-[60px] lg:py-12 2xl:py-[90px] lg:ml-[10%] xl:ml-[7%] 2xl:ml-[14%] flex items-center flex-col lg:flex-row gap-8 lg:gap-0 2xl:containerLeftCategory text-base-content"
      style={{
        "background-color": props.backgroundColor,
      }}
    >
      <div class="max-w-[300px] px-6 lg:pl-0">
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
          black
        />
      </div>

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-[0] pl-6 relative"
      >
        <Slider.PrevButton class="disabled:opacity-0 w-8 h-8 lg:w-9 lg:h-9 2xl:w-[50px] 2xl:h-[50px] min-h-8 btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 left-5 lg:left-0 transform -translate-y-1/2 z-[3]">
          <Icon
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.PrevButton>
        <Slider class="lg:overflow-hidden lg:py-1.5 flex justify-between carousel carousel-center sm:carousel-end gap-4 lg:gap-6 2xl:gap-7 col-span-full row-start-2 row-end-5">
          {list.map(
            ({ label, href, imageDesktop, imageMobile, buttonText }, index) => (
              <Slider.Item
                index={index}
                class="m-2 lg:m-0 flex w-[210px] flex-col gap-4 carousel-item relative group rounded-[20px] shadow-md lg:hover:scale-[1.022] transition-all duration-300 lg:w-56 xl:w-[27.6%] max-w-[350px] 2xl:w-[28%]"
              >
                <a
                  href={href}
                  class="flex flex-col gap-4 w-[210px] lg:w-full lg:h-auto"
                >
                  {imageDesktop && imageMobile && (
                    <Picture>
                      <Source
                        media="(max-width: 767px)"
                        fetchPriority={"auto"}
                        src={imageMobile}
                        width={210}
                        height={270}
                      />
                      <Source
                        media="(min-width: 768px)"
                        fetchPriority={"auto"}
                        src={imageDesktop}
                        width={350}
                        height={350}
                      />
                      <img
                        class="object-cover w-full h-full rounded-[20px]"
                        loading={"lazy"}
                        src={imageDesktop}
                        alt={label || ""}
                      />
                    </Picture>
                  )}
                </a>

                <div class="absolute top-[83%] lg:group-hover:top-[33%] w-full h-fit lg:h-full flex flex-col items-center gap-9 transition-all duration-300 z-[2]">
                  {label && (
                    <p class="text-2xl lg:text-xl xl:text-[1.25rem] 2xl:text-[2rem] tracking-[1.6px] text-white-lily text-center uppercase font-bold">
                      {label}
                    </p>
                  )}
                  {buttonText && (
                    <a
                      href={href}
                      class="hidden lg:block w-fit bg-white-lily rounded-full border-none text-[#000] text-sm 2xl:text-base uppercase lg:px-6 lg:py-2.5 px-[60px] py-[18px] 2xl:px-10 2xl:py-4 font-bold tracking-[1px] hover:bg-cherry-pop hover:text-white-lily hover:border-none transition-all duration-300"
                    >
                      {buttonText}
                    </a>
                  )}
                </div>

                <div class="hidden lg:block absolute w-full h-full transition-all duration-300 rounded-[20px] lg:group-hover:bg-[#00000050] z-[1]" />
              </Slider.Item>
            ),
          )}
        </Slider>
        <Slider.NextButton class="disabled:opacity-0 w-8 h-8 lg:w-9 lg:h-9 2xl:w-[50px] 2xl:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 right-5 lg:right-[6%] transform -translate-y-1/2 z-[1]">
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
