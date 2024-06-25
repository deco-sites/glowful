import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  images?: {
    image?: ImageWidget;
    alt?: string;
    link?: string;
  }[];
}

export default function Social({ images }: Props) {
  return (
    <>
      {images && images.length > 0 && (
        <div class="flex flex-col gap-4">
          <ul class={`flex gap-[32px] flex-wrap items-center`}>
            {images.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.alt} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <Image
                      loading="lazy"
                      src={item.image}
                      alt={item.alt}
                      width={27}
                      height={24}
                      class="object-contain w-full h-full max-w-[27px] max-h-[27px]"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
