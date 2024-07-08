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
    <div class="bg-[#E4E4E4]">
      <div class="container lg:gap-[100px] flex justify-center flex-col items-center gap-[50px] lg:flex-row w-full text-center  py-[50px] lg:py-10 px-8">
        <Image
          className="object-contain w-full h-full max-w-40 m-h-[82px] lg:max-w-[219px]"
          src={mainImage}
          alt={mainImageAltText || ""}
          data-test={list[0]}
          width={120}
          height={56}
          loading="lazy"
        />
        <div class="flex flex-row flex-wrap gap-[30px] lg:gap-[70px] lg:justify-evenly justify-center items-center lg:pl-6">
          {list.map((element) => (
            <Image
              className="object-contain max-w-fit max-h-[46px] lg:max-h-12"
              src={element.image}
              alt={element.altText || ""}
              width={120}
              height={45}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Logos;
