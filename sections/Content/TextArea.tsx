import Breadcrumb from "deco-sites/glowful/components/ui/Breadcrumb.tsx";
import { BreadcrumbList } from "apps/commerce/types.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  title: string;
  /**
   * @format html
   */
  content: string;
  breadcrumb: BreadcrumbList;
}

function Logos(props: SectionProps<ReturnType<typeof loader>>) {
  return (
    <div class="px-[24px] pt-3 pb-14 lg:pb-20 lg:pt-10 w-full m-auto max-w-[680px]">
      <div class={"flex justify-start lg:place-content-center"}>
        <div class="breadcrumbs p-4 pl-0 pb-10 lg:mb-[64px] lg:p-0">
          <ul>
            <li class="before:!text-[#878787] before:!opacity-100 before:!w-[9px] before:!h-[9px] before:rounded-[1px] last:before:border-t-[2px] last:before:border-r-[2px]">
              <a
                class={`text-[#878787] font-semibold`}
                href={"/"}
              >
                Home
              </a>
            </li>
            <li class="before:!text-[#878787] before:!opacity-100 before:!w-[9px] before:!h-[9px] before:rounded-[1px] last:before:border-t-[2px] last:before:border-r-[2px]">
              <a
                class={`text-[#CE0F69] font-bold`}
                href={props.isTermsPage ? "/termos-e-condicoes" : "/politicas-de-privacidade"}
              >
                {props.isTermsPage ? "Termos e Condições" : "Políticas de Privacidade"}
              </a>
            </li>
          </ul>
        </div> 
      </div>
      {props.title && (
        <h1 class="mb-[60px] mx-auto lg:mb-[90px] text-center text-[22px] max-w-[85%] lg:text-[28px] text-deep-beauty font-medium leading-[130%] lg:leading-[100%] tracking-[1.1px] lg:tracking-[2.24px]">
          {props.title}
        </h1>
      )}
      <div
        class="text-deep-beauty leading-[150%] textArea"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const isTermsPage = new URLPattern({ pathname: "/termos-e-condicoes" }).test(req.url)

  return { isTermsPage, ...props };
};

export default Logos;
