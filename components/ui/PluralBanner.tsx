import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  bannerSize: "large" | "medium";
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

function PluralBanner({ image, bannerSize = "large" }: Props) {
  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={360}
          height={190}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={bannerSize === "large" ? 400 : 288}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image.desktop} alt={image?.alt} />
      </Picture>
    </div>
  );
}

export default PluralBanner;
