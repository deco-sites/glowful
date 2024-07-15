
/**
 * @titleBy title
 */
export interface Props {
    title: string;
    /**
     * @description Description
     * @format html
     */
    content: string;
}

export default function CardStep({ props, index }: { props: Props, index: number }) {

    const { title, content } = props

    return (
        <div class="flex flex-row flex-wrap lg:flex-col gap-4 justify-start items-center px-4 lg:px-0 w-full lg:justify-center lg:max-w-[405px]">
            <span class="rounded-full border bordered w-[50px] h-[50px] border-[#000] flex justify-center items-center font-bold text-[#CE0F69] text-2xl lg:text-[28px] lg:text-center">
                {index}
            </span>
            <h4 class="uppercase font-bold text-base w-[calc(100%-50px-1rem)] lg:w-full lg:text-lg lg:text-center">{title}</h4>
            <span class="text-base lg:text-center lg:max-w-80" dangerouslySetInnerHTML={{ __html: content }}></span>
        </div>
    )
}