
export interface Props {
    title: string;
    subTitle: string;
}

export default function HeroSignature({ title, subTitle }: Props) {
    return (
        <div class="w-full h-full flex justify-center items-start md:items-center gap-6 px-6 py-[70px] lg:py-24 flex-col bg-gradient-to-r from-[-10%] from-[#f498b6] via-[#ce0f6b] via-50% to-[#fbae9f] to-100% md:mt-[45px]">
            <h2 class="uppercase font-bold text-[#FFBE9F] text-base font-redhat text-start md:text-center md:text-xl">
                {title}
            </h2>
            <h3 class="text-[#fff] text-2xl font-fraunces text-start md:text-center md:text-3xl lg:text-4xl">
                {subTitle}
            </h3>
        </div>
    )
}