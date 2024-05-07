import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import SearchButton from "./Buttons/Search.tsx";
import CartButton from "./Buttons/Cart/shopify.tsx";
import { navbarHeight } from "./constants.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logoBranco: {
    src: string;
    alt: string;
    /** @format color */
    textColor?: string;
  };
  logoPreto: {
    src: string;
    alt: string;
    /** @format color */
    textColor?: string;
  };
  platform: any;
}

function Navbar({ items, searchbar, logoPreto, logoBranco, platform }: Props) {
  const { displayTop, displayHover, scrollDirection } = useUI();
  const [displayNavbar, setDisplayNavbar] = useState("visible");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const pathname = window.location.pathname;

  useEffect(() => {
    let lastScrollY = 0;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        scrollDirection.value = "down";
        setDisplayNavbar("invisible");
      } else if (scrollY < lastScrollY) {
        scrollDirection.value = "up";
        setDisplayNavbar("visible");
      }
      lastScrollY = scrollY;
    };

    self.addEventListener("scroll", updateScrollDirection);
    return () => {
      self.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    if (mousePosition.y < 50) {
      setDisplayNavbar("visible");
      scrollDirection.value = "up";
    }

    self.addEventListener("mousemove", handleMouseMove);
    return () => {
      self.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition.y]);

  let logo = logoBranco;
  let colorIcon = logoBranco.textColor ?? "#FFF";
  let backgroundColor;

  if (displayTop.value) {
    logo = logoBranco;
    colorIcon = logoBranco.textColor ?? "#FFF";
    backgroundColor = "";
  } else {
    logo = logoPreto;
    colorIcon = logoPreto.textColor ?? "#101820";
    backgroundColor = "#FFF";
  }

  if (pathname !== "/") {
    logo = logoPreto;
    colorIcon = logoPreto.textColor ?? "#101820";
    backgroundColor = "#FFF";
    setDisplayNavbar("visible");
  }

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: "60px" }}
        class={`lg:hidden flex flex-row justify-between items-center w-full pl-2 pr-6 gap-2 ${displayNavbar} bg-[${backgroundColor}] md:hover:visible md:hover:bg-white-lily py-4`}
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: "60px" }}
            aria-label="Store logo"
          >
            <Image
              src={logoBranco.src}
              alt={logoBranco.alt}
              width={126}
              height={16}
              class={
                displayTop.value === true &&
                pathname === "/"
                  ? ""
                  : "hidden"}
            />
            <Image
              src={logoPreto.src}
              alt={logoPreto.alt}
              width={126}
              height={16}
              class={
                displayTop.value === false ||
                pathname !== "/"
                  ? ""
                  : "hidden"}
            />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton colorIcon={colorIcon} />
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
          {platform === "shopify" && <CartButton colorIcon={colorIcon} />}
        </div>
      </div>

      {/* Desktop Version */}
      <div
        class={`shadow-sm idden lg:flex 2xl:min-h-[86px] lg:min-h-[60px] ${displayNavbar} bg-[${backgroundColor}] hover:bg-white-lily hover:visible group/hover`}
        onMouseEnter={() => {
          displayHover.value = true;
          setDisplayNavbar("visible");
        }}
        onMouseLeave={() => (displayHover.value = false)}
      >
        <div
          class={`container 2xl:min-h-[86px] w-[95%] px-2 xl:px-9 mx-auto xl:max-w-[1408px] lg:min-h-[60px] inis flex flex-row justify-between items-center z-[999] h-full`}
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
                    displayTop.value === true &&
                    displayHover.value === false &&
                    pathname === "/"
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
                    displayTop.value === false ||
                    displayHover.value === true ||
                    pathname !== "/"
                      ? ""
                      : "hidden"
                  }
                />
              </a>
            )}
          </div>
          <ul class="2xl:min-h-[86px] lg:min-h-[60px] flex-auto flex justify-center">
            {items.map((item) => (
              <NavItem item={item} colorIcon={colorIcon} />
            ))}
          </ul>
          <div class="flex-none w-fit flex items-center justify-end gap-2">
            <SearchButton colorIcon={colorIcon} />
            <Searchbar searchbar={searchbar} />
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButton colorIcon={colorIcon} />}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
