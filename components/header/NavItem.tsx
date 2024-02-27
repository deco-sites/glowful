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
          class={`text-[14px] font-medium tracking-[2px] text-[${colorIcon}] group-hover/hover:text-[#101820] group-hover:text-[#D62C79]`}
        >
          {name}
        </span>
      </a>

      {children && children.length > 0 && (
        <div
          class={`fixed hidden py-[70px] hover:flex group-hover:flex bg-[#FFF] shadow-glowful items-start justify-center gap-[50px] border-t border-b-2 border-base-200 
          w-full m-auto left-1/2 ${
            displayTop.value ? "top-[45px]" : "top-[0]"
          } transform -translate-x-1/2`}
          style={{ marginTop: "80px" }}
        >
          <ul class="flex items-start justify-center gap-10">
            {children.map((node) => (
              <li class="max-w-[260px] ">
                <p class="text-deep-beauty text-[18px] font-bold">
                  <span>{node.name}</span>
                </p>

                <ul class="flex flex-col gap-6 mt-6">
                  {node.children?.map((leaf) => (
                    <li>
                      <a class="" href={leaf.url}>
                        <span class="text-deep-beauty hover:text-[#D62C79] text-[18px] ">
                          {leaf.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div class="flex gap-[32px]">
            {image &&
              image.map((image: any) => (
                <Image
                  src={image.url}
                  alt={image.alternateName}
                  width={280}
                  height={320}
                  loading="lazy"
                />
              ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
