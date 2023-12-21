import Image from "apps/website/components/Image.tsx";
import HeaderLogo from "$store/components/ui/SectionHeaderLogo.tsx";
import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  mainImage: ImageWidget;
  mainImageAltText: string;
  images?: Image[];
}

const IMAGES = [
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
  },
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
  },
];

function Logos(props: Props) {
  const { images, mainImage, mainImageAltText } = props;
  const list = useMemo(
    () =>
      images && images.length > 0
        ? images
        : Array(20)
            .fill(null)
            .map((_, i) => IMAGES[i % 2]),
    []
  );

  return (
    <div class="bg-[#f4f4f4]">
      <div class="container lg:gap-[100px] flex justify-between flex-col items-center gap-[50px] lg:flex-row w-full text-center  py-[50px] lg:py-[40px] px-[32px] ">
        <img
          className="object-contain w-full h-full max-w-[258px] m-h-[82px]"
          src={mainImage}
          alt={mainImageAltText || ""}
        />
        <div class="flex flex-row flex-wrap gap-[30px] lg:gap-[70px] lg:justify-between justify-center items-center">
          {list.map((element) => (
            <img
              className="object-contain max-w-fit max-h-[46px] lg:max-h-[63px]"
              src={element.image}
              alt={element.altText || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Logos;
