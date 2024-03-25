import Icon from "$store/components/ui/Icon.tsx";
import { useState, useEffect, useRef } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  discountButton: string;
  /**
   * @format html
   */
  title: string;
  /**
   * @format html
   */
  description: string;
  form: {
    firstInput: string;
    secondInput: string;

    /**
     * @format html
     */
    textHelper: string;

    button?: {
      text: string;
      /**
       * @format color
       */
      backgroundColor: string;
      /**
       * @format color
       */
      textColor: string;
    };
  };
  image: {
    /**
     * @title Image
     * @description Recomend image size 356 × 475px
     */
    src: ImageWidget;
    alt: string;
  };
}

export function PopupIcon({
  discountButton = "DESCONTO AQUI",
  position = "right-0 bottom-0",
}: {
  discountButton: string;
  position: string;
}) {
  const { displayPopup } = useUI();

  return (
    <button
      onClick={() => (displayPopup.value = true)}
      class={`fixed flex items-center justify-center p-[12px] transition-all duration-300 ease-out rounded-[14px] lg:w-[70px] lg:h-[70px] w-[54px] h-[54px] hover:scale-[1.15] text-[16px] lg:text-[20px] font-bold uppercase text-center text-white-lily leading-[120%] tracking-[1px]  bg-red-500 bg-cherry-pop z-40 shadow-md ${
        position ? position : "right-0 bottom-0"
      }`}
    >
      {discountButton}
    </button>
  );
}

export default function Popup({
  title,
  description,
  form,
  image,
  discountButton,
}: Props) {
  const { displayPopup } = useUI();
  const [animationPopup, setAnimationPopup] = useState(false);
  const popupRenderedRef = useRef(false);

  useEffect(() => {
    function handleClick(event: any) {
      const from = event.relatedTarget || event.toElement;
      if (!from || from.nodeName == "HTML") {
        displayPopup.value = true;
        setAnimationPopup(true);
      }
    }
    document.addEventListener("mouseclick", handleClick);
  }, [displayPopup.value]);

  const handleUserActivity = () => {
    if (!displayPopup.value) {
      displayPopup.value = false;
      setAnimationPopup(true);
    }
  };

  const handleScroll = () => {
    const secondSectionOffset = 650;

    const windowScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (
      windowScrollPosition >= secondSectionOffset &&
      !displayPopup.value &&
      !popupRenderedRef.current
    ) {
      displayPopup.value = true;
      setAnimationPopup(true);
      popupRenderedRef.current = true;
    }
  };

  const closeModal = () => {
    setAnimationPopup(false);
    displayPopup.value = false;
  };

  useEffect(() => {
    self.addEventListener("mousemove", handleUserActivity);
    self.addEventListener("keydown", handleUserActivity);
    self.addEventListener("scroll", handleScroll);

    return () => {
      self.removeEventListener("mousemove", handleUserActivity);
      self.removeEventListener("keydown", handleUserActivity);
      self.removeEventListener("scroll", handleScroll);
    };
  }, [displayPopup.value]);

  return (
    <>
      <PopupIcon
        discountButton={discountButton}
        position="right-[16px] bottom-[28px] lg:right-[24px] lg:bottom-[30px]"
      />
      <div
        className={`w-full h-full fixed top-0 left-0 z-50 bg-[#00000050] ${
          displayPopup.value ? "" : "hidden"
        } `}
      >
        <div className={"w-full h-full flex justify-center items-center px-4"}>
          <div
            className={`bg-white-lily flex flex-row justify-between w-full max-w-[312px] lg:max-w-[850px] box-content items-center rounded-lg gap-2 relative p-[24px] lg:p-0 ${
              animationPopup ? "animate-shake-in" : "animate-shake-out"
            }`}
          >
            <div
              onClick={closeModal}
              className="rotate-45 w-[30px] h-[30px] rounded-full flex justify-center items-center absolute top-[16px] right-[16px] bg-white z-50 cursor-pointer"
            >
              <Icon id="Plus" size={32} strokeWidth={1} />
            </div>

            <div class="pt-[30px] flex flex-col gap-[16px] lg:max-w-[315px] lg:m-[90px] lg:pt-0">
              {title && (
                <div
                  class="textHighlight popup text-center w-full pr-4"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}

              {description && (
                <div
                  class="text-deep-beauty leading-[130%] text-center pb-[14px] w-full lg:text-[20px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}

              {form && (
                <form action="/" class="flex flex-col gap-4 ">
                  <div class="flex flex-col gap-4">
                    <input
                      class="input input-bordered lg:w-80 bg-transparent border-1 border-[#101820] placeholder:text-[#878787] text-[16px] font-redhat"
                      type="text"
                      placeholder={form.firstInput}
                    />
                    <input
                      class="input input-bordered lg:w-80 bg-transparent border-1 border-[#101820] placeholder:text-[#878787] text-[16px] font-redhat"
                      type="text"
                      placeholder={form.secondInput}
                    />
                    {form.textHelper && (
                      <div class="flex items-center gap-[9px]">
                        <input
                          type="checkbox"
                          class="checkbox border-[#101820] h-[16px] w-[16px]"
                        />

                        <div
                          class="text-[#101820] text-[12px] lg:text-[14px]"
                          dangerouslySetInnerHTML={{ __html: form.textHelper }}
                        />
                      </div>
                    )}

                    {form?.button?.text && (
                      <button
                        class={`btn px-[40px] mt-[14px] rounded-full border-0 uppercase text-[16px] lg:text-[18px] tracking-[1px] font-bold`}
                        style={{
                          background: form?.button?.backgroundColor
                            ? form?.button?.backgroundColor
                            : "#101820",
                          color: form?.button?.textColor
                            ? form?.button?.textColor
                            : "#FFFFFF",
                        }}
                        type="submit"
                      >
                        {form?.button?.text}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            <div
              className={
                "hidden lg:flex lg:items-end w-2/5 h-full absolute bottom-[0px] right-[0px]"
              }
            >
              <Image
                className={"object-cover w-full"}
                src={image.src}
                alt={image.alt}
                width={370}
                height={550}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
