import { useState } from "preact/hooks";

export interface Props {
  description: any;
}

export default function DescriptionReadMore({ description }: Props) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(
    description.substr(0, 600) + "..."
  );

  // const handleToggleDescription = () => {
  //   setShowFullDescription(!showFullDescription);
  //   if (!showFullDescription) {
  //     setCurrentDescription(description);
  //   } else {
  //     setCurrentDescription(description.substr(0, 600) + "...");
  //   }
  // };

  const handleReadMore = () => {
    if (currentDescription.length >= description.length) {
      setCurrentDescription(
        description.substr(
          0,
          currentDescription.length + (description.length - 600) / 2
        )
      );
    } else {
      setCurrentDescription(
        description.substr(
          0,
          currentDescription.length + (description.length - 600) / 2
        )
      );
    }
  };

  const handleReadLess = () => {
    setCurrentDescription(description.substr(0, 600) + "...");
  };

  return (
    <div class="w-fit flex flex-col px-[24px] lg:px-0">
      <div
        class={`w-full max-w-[100%] text-[16px] leading-[150%] text-[#101820] `}
        dangerouslySetInnerHTML={{
          __html: currentDescription,
        }}
      />
      {currentDescription.length < description.length ? (
        <button
          onClick={handleReadMore}
          class="w-fit border-b border-cherry-pop block text-cherry-pop text-[16px] font-medium tracking-[0.32px]"
        >
          Ler mais +
        </button>
      ) : (
        <button
          onClick={handleReadLess}
          class="w-fit border-b border-cherry-pop block text-cherry-pop text-[16px] font-medium tracking-[0.32px]"
        >
          Ler menos -
        </button>
      )}
    </div>
  );
}
