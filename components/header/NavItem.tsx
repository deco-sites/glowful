import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import { useUI } from "$store/sdk/useUI.ts";

function NavItem({
  item,
  colorIcon = "#FFF",
}: {
  item: SiteNavigationElement;
  colorIcon: string;
}) {
  const { displayTop } = useUI();
  const { url, name, children } = item;
  const image = item?.image;

  return (
    <li class="group flex items-center">
      <a href={url} class="px-4 py-3">
        <span
          class={`text-[14px] font-bold tracking-[2px] text-[${colorIcon}] group-hover/hover:text-[#101820] group-hover:text-[#D62C79]`}
        >
          {name}
        </span>
      </a>

      {children && children.length > 0 && (
        <div
          class={`fixed hidden py-5 2xl:py-[40px] mt-12 2xl:mt-20 hover:flex group-hover:flex bg-[#FFF] shadow-glowful border-t border-b-2 border-base-200 
          w-full m-auto left-1/2 ${
            displayTop.value ? "top-[45px]" : "top-[0]"
          } transform -translate-x-1/2`}
        >
          <div class={`container flex items-start w-[95%] mx-auto px-6 xl:px-[54px] xl:max-w-[1408px] gap-[60px] justify-center`}>
          <ul class="w-[calc(50%-24px)] flex items-start justify-between">
            {children.map((node) => (
              <li class="max-w-[260px] ">
                <p class="text-deep-beauty text-base 2xl:text-lg font-bold">
                  <span>{node.name}</span>
                </p>

                <ul class="flex flex-col gap-2.5 mt-2.5 2xl:gap-6 2xl:mt-6">
                  {node.children?.map((leaf) => (
                    <li>
                      <a class="" href={leaf.url}>
                        <span class="text-deep-beauty hover:text-[#D62C79] text-sm 2xl:text-lg ">
                          {leaf.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div class="flex gap-4 2xl:gap-8 w-1/2 justify-end">
            {image &&
              image.map((image: any) => (
                <Image
                  src={image.url}
                  alt={image.alternateName}
                  width={280}
                  height={320}
                  loading="lazy"
                  class={`w-[calc(50%-8px)] max-w-[280px]`}
                />
              ))}
          </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
