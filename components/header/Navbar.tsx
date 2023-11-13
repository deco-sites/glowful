import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect } from "preact/hooks";

export interface Props {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logoBranco: { src: string; alt: string };
  logoPreto: { src: string; alt: string };
  platform: any;
}

function Navbar({ items, searchbar, logoPreto, logoBranco, platform }: Props) {
  const { displayTop, displayHover, scrollDirection } = useUI();

  const pathname = window.location.pathname;
  useEffect(() => {

    let lastScrollY = 0;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        scrollDirection.value = "down";
      } else if (scrollY < lastScrollY) {
        scrollDirection.value = "up";
      }
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  let logo = logoBranco;
  let display = "";
  let colorIcon = "#FFF";
  let backgroundColor;

  if (displayTop.value) {
    logo = logoBranco;
    display = "visible";
    colorIcon = "#FFF";
    backgroundColor = "";
  } else {
    logo = logoPreto;
    display = "none";
    colorIcon = "#101820";
    backgroundColor = "#FFF";
  }

  if (pathname !== "/") {
    displayTop.value = false
  }

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class={`md:hidden flex flex-row justify-between items-center w-full pl-2 pr-6 gap-2 ${display} bg-[${backgroundColor}] md:hover:visible md:hover:bg-white-lily`}
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logoBranco.src}
              alt={logoBranco.alt}
              width={126}
              height={16}
              class={displayTop.value === true ? "" : "hidden"}
            />
            <Image
              src={logoPreto.src}
              alt={logoPreto.alt}
              width={126}
              height={16}
              class={displayTop.value === false ? "" : "hidden"}
            />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id="User"
              size={24}
              strokeWidth={0.4}
              class={`text-[${colorIcon}]`}
            />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
        </div>
      </div>

      {/* Desktop Version */}
      <div
        class={`hidden md:flex flex-row justify-between items-center w-full pl-2 pr-6 h-[50px] z-[999] md:${display} bg-[${backgroundColor}] hover:bg-white-lily group/hover`}
        onMouseEnter={() => (displayHover.value = true)}
        onMouseLeave={() => (displayHover.value = false)}
      >
        <div class="flex-none w-44">
          {logo && (
            <a
              href="/"
              aria-label="Store logoBranco && logoPreto"
              class="block px-4 py-3 w-[160px]"
            >
              <Image
                src={logoBranco.src}
                alt={logoBranco.alt}
                width={126}
                height={16}
                class={
                  displayTop.value === true && displayHover.value === false
                    ? ""
                    : "hidden"
                }
              />
              <Image
                src={logoPreto.src}
                alt={logoPreto.alt}
                width={126}
                height={16}
                class={
                  displayTop.value === false || displayHover.value === true
                    ? ""
                    : "hidden"
                }
              />
            </a>
          )}
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => (
            <NavItem item={item} colorIcon={colorIcon} />
          ))}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id="User"
              size={24}
              strokeWidth={0.4}
              class={`text-[${colorIcon}] group-hover/hover:text-[#101820]`}
            />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
