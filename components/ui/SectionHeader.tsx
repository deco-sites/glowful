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
          class={`flex flex-col gap-6 lg:gap-4 2xl:gap-6 m-auto lg:m-0 ${props.black ? "max-w-[650px]" : "max-w-[380px]"
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
              class={` text-base 2xl:text-xl ${props.black ? "text-center " : "text-white-lily lg:text-start"
                }${props.alignment === "left" ? "lg:text-left" : "lg:text-center"
                } text-center
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
