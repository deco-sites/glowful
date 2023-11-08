interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description ? (
        <div
          class={`flex flex-col gap-[24px] max-w-[380px] m-auto lg:m-0 ${
            props.alignment === "left" ? "text-left" : "text-center"
          }`}
        >
          {props.title && (
            <h1
              class={`text-[28px] lg:text-[32px] text-white-lily text-center lg:text-start leading-8 lg:leading-10
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-3xl" : "lg:text-4xl"}
                `}
            >
              {props.title}
            </h1>
          )}
          {props.description && (
            <h2
              class={` text-[18px] text-white-lily text-center lg:text-start text-
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-primary-content" : "text-neutral"
                  }
                  ${
                    props.fontSize === "Normal"
                      ? "lg:text-xl"
                      : "lg:text-[18px]"
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
