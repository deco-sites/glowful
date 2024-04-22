import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "./Icon.tsx";

export interface Props {
    title: string;
    /**
     * @format html
     */
    content: string;
    itens: string[];
    image: {
        src: ImageWidget;
        alt: string
    }
    layout?: "imagem na direita" | "imagem na esquerda"
}

const DESKTOP_DIRECTION = {
    "imagem na direita": "lg:flex-row-reverse",
    "imagem na esquerda": "lg:flex-row",
};

const PADDING_LEFT = {
    "imagem na direita": "lg:pl-0",
    "imagem na esquerda": "lg:pl-11 xl:pl-16",
};

const JUSTIFY_IMG = {
    "imagem na direita": "justify-end",
    "imagem na esquerda": "justify-start",
};

export default function SectionDifference({ props }: { props: Props }) {

    const { title, content, itens, image, layout } = props

    return (
        <div class={`flex flex-col justify-center items-center gap-6 ${DESKTOP_DIRECTION[layout ?? "imagem na direita"]} lg:container lg:py-11 lg:px-0 xl:gap-9 lg:justify-between`}>
            <div class={`w-full lg:w-2/4 ${JUSTIFY_IMG[layout ?? "imagem na direita"]} flex`}>

                <Picture class={"w-full"}>
                    <Source
                        media="(max-width: 767px)"
                        src={image.src}
                        width={360}
                        height={230}
                    />
                    <Source
                        media="(min-width: 1024px)"
                        src={image.src}
                        width={610}
                        height={370}
                    />
                    <img
                        class="w-full lg:max-w-[610px]"
                        src={image.src}
                        alt={image.alt}
                        decoding="async"
                        loading="lazy"
                    />
                </Picture>
            </div>
            <div class={`flex flex-col items-start justify-center gap-4 px-6 pb-20 lg:pb-0 lg:w-2/4 lg:h-auto lg:px-0 ${PADDING_LEFT[layout ?? "imagem na direita"]} xl:gap-12 ` }>
                <h4 class="text-[28px] font-fraunces text-black xl:text-[2.7rem] lg:max-w-[500px]">
                    {title}
                </h4>
                <span class="text-base text-[#000] lg:max-w-[500px]" dangerouslySetInnerHTML={{ __html: content }}>

                </span>
                <ul class="flex flex-col gap-5 lg:gap-9 lg:max-w-[500px]">
                    {itens.map((item) => (
                        <li class="uppercase text-sm font-medium text-[#000] flex flex-row gap-2"><Icon id="check" size={22} strokeWidth={1} /> <span>{item}</span></li>
                    ))}

                </ul>

            </div>
        </div>
    )
}