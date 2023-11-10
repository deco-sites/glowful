import Icon from "$store/components/ui/Icon.tsx";
import { useState, useEffect, useRef } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
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
    };
  };
  discountButton: string;
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
    <div
      class={`fixed flex items-center justify-center rounded-full w-[80px] h-[80px] bg-red-500 bg-gradient-to-r from-[#D62C79] to-[#E4A1AE] z-50 ${
        position ? position : "right-0 bottom-0"
      }`}
    >
      <button
        onClick={() => (displayPopup.value = true)}
        class="h-full w-full text-[14px] font-extrabold uppercase tracking-[1px] text-center text-white-lily"
      >
        {discountButton}
      </button>
    </div>
  );
}

export default function Popup({ title, description, form, image }: Props) {
  const { displayPopup } = useUI();

  useEffect(() => {
    function handleClick(event: any) {
      const from = event.relatedTarget || event.toElement;
      if (!from || from.nodeName == "HTML") {
        displayPopup.value = true;
      }
    }
    document.addEventListener("mouseclick", handleClick);
  }, [displayPopup.value]);

  let inactivityTimer: any;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      displayPopup.value = true;
    }, 20000); // 20 segundos em milissegundos
  };

  const handleUserActivity = () => {
    if (!displayPopup.value) {
      displayPopup.value = false;
      resetInactivityTimer();
    }
  };

  const handleScroll = () => {
    if (!displayPopup.value) {
      displayPopup.value = false;
      resetInactivityTimer();
    }
  };

  useEffect(() => {
    self.addEventListener("mousemove", handleUserActivity);
    self.addEventListener("keydown", handleUserActivity);
    self.addEventListener("scroll", handleScroll);

    resetInactivityTimer();

    return () => {
      self.removeEventListener("mousemove", handleUserActivity);
      self.removeEventListener("keydown", handleUserActivity);
      self.removeEventListener("scroll", handleScroll);
      clearTimeout(inactivityTimer);
    };
  }, [displayPopup.value]);

  return (
    <>
      <PopupIcon
        discountButton="15% OFF AQUI"
        position="right-[16px] bottom-[28px] lg:right-[24px] lg:bottom-[30px]"
      />
      <div
        className={`w-full h-full fixed top-0 left-0 z-50 bg-[#00000050] ${
          displayPopup.value ? "" : "hidden"
        } `}
      >
        <div className={"w-full h-full flex justify-center items-center px-4"}>
          <div
            className={
              "bg-white-lily flex flex-row justify-between items-end w-full max-w-[312px] lg:max-w-[850px] box-content items-center rounded-lg gap-2 relative p-[24px] lg:p-0"
            }
          >
            <div
              onClick={() => (displayPopup.value = false)}
              className="rotate-45 w-[30px] h-[30px] rounded-full flex justify-center items-center absolute top-[16px] right-[16px] bg-white"
            >
              <Icon id="Plus" size={32} strokeWidth={1} />
            </div>

            <div class="pt-[60px] flex flex-col gap-[16px] lg:max-w-[315px] lg:m-[90px] lg:pt-0">
              {title && (
                <div
                  class="textHighlight popup text-center w-full pl-4"
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
                      class="input input-bordered lg:w-80 bg-transparent border-1 border-[#101820] placeholder:text-[#101820] text-[16px] font-redhat"
                      type="text"
                      placeholder={form.firstInput}
                    />
                    <input
                      class="input input-bordered lg:w-80 bg-transparent border-1 border-[#101820] placeholder:text-[#101820] text-[16px] font-redhat"
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
                          class="text-sm text-[#101820] lg:text-[12px] lg:text-[14px]"
                          dangerouslySetInnerHTML={{ __html: form.textHelper }}
                        />
                      </div>
                    )}
                    <button
                      class={`btn px-[40px] mt-[14px] border-0 text-white-lily text-uppercase text-[14px] lg:text-[16px] tracking-[1px] font-medium bg-[#CE0F69]`}
                      type="submit"
                    >
                      {form?.button?.text}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className={"hidden lg:flex lg:items-end w-2/4 h-full"}>
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
