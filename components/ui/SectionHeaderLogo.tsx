import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  title?: string;
  description?: string;
  quoteLeft?: ImageWidget;
  quoteRight?: ImageWidget;
}

function HeaderLogo(props: Props) {
  return (
    <>
      {props.title || props.description ? (
        <div
          class={`flex flex-col gap-[24px] w-full items-center m-auto lg:m-0`}
        >
          {props.title && (
            <h1 class="text-[28px] max-w-[530px] lg:max-w-[600px] lg:text-[32px] text-deep-beauty text-center leading-8 lg:leading-10 relative">
              <>
                <Image
                  width={90}
                  height={90}
                  src={props.quoteLeft}
                  alt=""
                  loading="lazy"
                  class="absolute left-0 lg:left-[-45px] top-[-65px] lg:top-[-50px]"
                />
                {props.title}
                <Image
                  width={90}
                  height={90}
                  src={props.quoteRight}
                  alt=""
                  loading="lazy"
                  class="absolute right-0 lg:right-[-45px] bottom-[-65px] lg:bottom-[-50px]"
                />
              </>
            </h1>
          )}
          {props.description && (
            <h2 class="text-[18px] max-w-[670px] text-deep-beauty text-center text-leading-6 lg:leading-8">
              {props.description}
            </h2>
          )}
        </div>
      ) : null}
    </>
  );
}

export default HeaderLogo;
