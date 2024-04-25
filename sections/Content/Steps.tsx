import type { Props as StepsProps } from "$store/components/Steps/CardStep.tsx"
import CardStep from "../../components/Steps/CardStep.tsx";
import Icon from "../../components/ui/Icon.tsx";


/**
 * @titleBy title
 */
export interface Props {
    title: string;
    steps: StepsProps[];
    button: {
        label: string;
        href: string;
    }

}

export default function Steps({ title, button, steps }: Props) {
    return (
        <div class="flex flex-col justify-center items-start px-8 py-10 gap-8 lg:py-[5.5rem] lg:gap-16 lg:items-center ">
            <h3 class="text-3xl lg:text-4xl text-start md:text-center font-fraunces">{title}</h3>
            <div class="flex flex-col lg:flex-row justify-start items-center gap-8 lg:gap-6 w-full lg:justify-center">
                {steps.map((step, index) => (
                    <>
                        <CardStep props={step} index={index + 1} />
                        {(index + 1) !== steps.length && (
                            <Icon id="Arrow" width={20} height={16} class="hidden lg:flex min-w-[20px]" />
                        )}
                    </>
                ))}
            </div>
            <a
                href={button.href}
                class="w-fit bg-cherry-pop lg:bg-deep-beauty rounded-full border-none text-white-lily text-sm uppercase px-6 py-[18px] font-bold tracking-[1px] hover:bg-white-lily hover:text-cherry-pop hover:border-none transition-all duration-300 self-center"
            >
                {button.label}
            </a>
        </div>
    )
}