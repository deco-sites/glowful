import Image from "apps/website/components/Image.tsx";
import HeaderLogo from "$store/components/ui/SectionHeaderLogo.tsx";
import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  title?: string;
  description?: string;
  images?: Image[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
  quoteLeft: ImageWidget;
  quoteRight: ImageWidget;
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
  const { title, description, images, layout, quoteLeft, quoteRight } = props;
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
    <div class="w-full py-8 flex flex-col gap-[75px] lg:gap-[100px] lg:py-[90px] lg:px-0">
      <HeaderLogo
        title={title}
        description={description}
        quoteLeft={quoteLeft}
        quoteRight={quoteRight}
      />
      <div class="w-full text-center items-center bg-[#F4F4F4] py-[16px] px-4">
        {list.map((element) => (
          <div class="w-36 lg:w-40 h-17 lg:h-20 px-4 lg:px-6 py-6 lg:py-4 inline-block align-middle">
            <div class="flex w-full h-full items-center justify-center">
              <Image
                width={300}
                height={300}
                src={element.image}
                alt={element.altText || ""}
                class="max-w-full max-h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Logos;
