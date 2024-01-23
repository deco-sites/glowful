import { useState } from "preact/hooks";

interface Props {
  descriptionOne: any;
  descriptionTwo: any;
}

export default function DescriptionAboutCategory({
  descriptionOne,
  descriptionTwo,
}: Props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div class="w-fit flex flex-col lg:flex-row lg:gap-[60px] gap-[20px] px-[24px] lg:px-0">
      {descriptionOne && (
        <div
          class="w-full max-w-[100%] lg:max-w-[320px] text-[16px] leading-[150%] text-[#101820]"
          dangerouslySetInnerHTML={{ __html: descriptionOne }}
        />
      )}
      {descriptionTwo && (
        <>
          <div
            class={`block lg:hidden w-full max-w-[100%] lg:max-w-[320px] text-[16px] leading-[150%] text-[#101820] `}
            dangerouslySetInnerHTML={{
              __html: showFullDescription
                ? descriptionTwo
                : descriptionTwo.substr(0, 80) + "...",
            }}
          />

          <div
            class={`hidden lg:block w-full max-w-[100%] lg:max-w-[320px] text-[16px] leading-[150%] text-[#101820] `}
            dangerouslySetInnerHTML={{
              __html: descriptionTwo,
            }}
          />

          <button
            onClick={handleToggleDescription}
            class="w-fit underline block lg:hidden text-cherry-pop text-[16px] tracking-[0.32px]"
          >
            {showFullDescription ? "Ler menos -" : "Ler mais +"}
          </button>
        </>
      )}
    </div>
  );
}
