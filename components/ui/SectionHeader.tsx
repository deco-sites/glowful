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
          class={`flex flex-col gap-[24px]  m-auto lg:m-0 ${
            props.black ? "max-w-[650px]" : "max-w-[380px]"
          } ${props.alignment === "left" ? "text-left" : "text-center"}`}
        >
          {props.title && (
            <div
              class={`textHighlight text-[28px] lg:text-[32px] ${
                props.black ? "text-center" : "text-white-lily lg:text-start"
              } text-center leading-8 lg:leading-10
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  }
                `}
              dangerouslySetInnerHTML={{ __html: props.title }}
            />
          )}
          {props.description && (
            <h2
              class={` text-[16px] lg:text-[18px] ${
                props.black ? "text-center" : "text-white-lily lg:text-start"
              } text-center  text-
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-primary-content" : "text-neutral"
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
