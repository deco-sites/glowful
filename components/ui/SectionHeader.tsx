interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
  black?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description ? (
        <div
          class={`flex flex-col gap-[24px]  m-auto lg:m-0 ${props.black ? "max-w-[650px]" : "max-w-[380px]"
            } ${props.alignment === "left" ? "lg:text-left" : "lg:text-center"
            } text-center`}
        >
          {props.title && (
            <div
              class={`font-medium tracking-[1.6px] uppercase textCategoryHighlight text-[28px] lg:text-3xl xl:text-[32px] ${props.black ? "text-center" : "text-white-lily lg:text-start"
                } ${props.alignment === "left" ? "lg:text-left" : "lg:text-center"
                } text-center leading-8 lg:leading-10
                  ${props.colorReverse
                  ? "text-primary-content"
                  : "text-base-content"
                }
                `}
              dangerouslySetInnerHTML={{ __html: props.title }}
            />
          )}
          {props.description && (
            <h2
              class={` text-[16px] lg:text-[17px] xl:text-[20px] ${props.black ? "text-center " : "text-white-lily lg:text-start"
                }${props.alignment === "left" ? "lg:text-left" : "lg:text-center"
                } text-center
                  leading-6 lg:leading-8
                  ${props.colorReverse
                  ? "text-primary-content"
                  : "text-[#000000]"
                }
                `}
            >
              {props.description}
            </h2>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Header;
