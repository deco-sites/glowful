import Breadcrumb from "deco-sites/glowful/components/ui/Breadcrumb.tsx";
import { BreadcrumbList } from "apps/commerce/types.ts";

export interface Props {
  title: string;
  /**
   * @format html
   */
  content: string;
  breadcrumb: BreadcrumbList;
}

function Logos(props: Props) {
  return (
    <div class="px-[24px] py-[60px] lg:py-[90px] w-full m-auto max-w-[680px]">
      <div class={"flex place-content-center"}>
        <Breadcrumb itemListElement={props?.breadcrumb?.itemListElement} /> 
      </div>
      {props.title && (
        <h1 class="mb-[60px] lg:mb-[90px] text-center text-[22px] lg:text-[28px] text-deep-beauty font-medium leading-[130%] lg:leading-[100%] tracking-[1.1px] lg:tracking-[2.24px]">
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

export default Logos;
