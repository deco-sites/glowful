import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  /**
   * @format color
   */
  textColor?: string;
  image?: ImageWidget;
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
    description?: HTMLWidget;
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
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
        textColor: "#101820",
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
      class="container py-8 flex flex-col gap-8 lg:gap-10 text-base-content lg:py-10"
      style={{
        "background-color": props.backgroundColor,
      }}
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headeçrAlignment || "center"}
        black
      />

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {list.map(
            ({ tag, label, description, href, image, buttonText, textColor }, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
              >
                <a
                  href={href}
                  class="flex flex-col gap-4 lg:w-[280px] w-40 lg:h-auto"
                >
                  {image && (
                    <figure>
                      <Image
                        class="card w-full rounded-none"
                        src={image}
                        alt={description || label || tag}
                        width={160}
                        height={195}
                        loading="lazy"
                      />
                    </figure>
                  )}
                  {layout.categoryCard?.textPosition === "top" && (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                      textColor={textColor}
                    />
                  )}
                  {layout.categoryCard?.textPosition === "bottom" && (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
                </a>
                {buttonText && (
                  <a href={href} class="btn">
                    {buttonText}
                  </a>
                )}
              </Slider.Item>
            )
          )}
        </Slider>

        <div class="w-full pl-5 pt-[30px] flex gap-3 justify-center items-center col-start-1 col-end-3 row-start-5">
          <div class="relative sm:block z-10 ">
            <Slider.PrevButton class="btn btn-circle btn-outline border-0 bg-base-100">
              <Icon
                size={24}
                id="ChevronLeft"
                strokeWidth={3}
                class="text-cherry-pop"
              />
            </Slider.PrevButton>
          </div>

          <div class="flex justify-center gap-[8px]">
            {list?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="w-[32px] h-[8px] rounded " />
                </Slider.Dot>
              </li>
            ))}
          </div>

          <div class="relative sm:block z-10 ">
            <Slider.NextButton class="btn btn-circle btn-outline  border-0 bg-base-100">
              <Icon
                size={24}
                id="ChevronRight"
                strokeWidth={3}
                class="text-cherry-pop"
              />
            </Slider.NextButton>
          </div>
        </div>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default CategoryList;
