import Icon from "../../components/ui/Icon.tsx";
import SectionDifference from "../../components/ui/SectionDifference.tsx";
import type { Props as PropsDifference } from "$store/components/ui/SectionDifference.tsx"
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";

function Dots({ sections }: Props) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
                }}
            />
            <ul class="carousel justify-center col-span-full z-10 row-start-4 items-center gap-2">
                {sections.map((_, index) => (
                    <li class="carousel-item">
                        <Slider.Dot index={index} bgWhite={false} classes="disabled:w-[55px] w-[35px]">
                        </Slider.Dot>
                    </li>
                ))}
            </ul >
        </>
    );
}

function Buttons() {
    return (
        <>
            <div class="flex items-center justify-center z-20 col-start-1 row-start-4 rounded-full bg-[#CE0F69] w-[32px] h-[32px] relative top-[25%] left-[45%]">
                <Slider.PrevButton class="btn btn-circle bg-transparent border-0">
                    <Icon
                        class="text-base-100"
                        size={24}
                        id="ChevronLeft"
                        strokeWidth={3}
                    />
                </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-center z-20 col-start-3 row-start-4 rounded-full bg-[#CE0F69] w-[32px] h-[32px] relative top-[25%] right-[-10%]">
                <Slider.NextButton class="btn btn-circle bg-transparent border-0">
                    <Icon
                        class="text-base-100"
                        size={24}
                        id="ChevronRight"
                        strokeWidth={3}
                    />
                </Slider.NextButton>
            </div>
        </>
    );
}

export interface Props {
    sections: PropsDifference[];
}


export default function Differences({ sections }: Props) {

    const id = useId();

    return (
        <>

            <div
                id={id}
                class="grid grid-cols-[75px_1fr_75px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] lg:hidden py-8"
            >
                <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
                    {sections.map((section, index) => (
                        <Slider.Item index={index} class="carousel-item w-full">
                            <SectionDifference props={section} />
                        </Slider.Item>
                    ))}
                </Slider>

                {sections?.length > 1 && (
                    <>
                        <Buttons />

                        <Dots sections={sections} />
                    </>
                )}

                <SliderJS rootId={id} infinite />
            </div>
            <div class="hidden lg:flex flex-col py-11 lg:mx-[120px]">
                {sections.map((section, index) => (
                    <SectionDifference props={section} />
                ))}
            </div>
        </>
    )
}