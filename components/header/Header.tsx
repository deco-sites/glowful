import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "../../islands/Alert.tsx";
import Navbar from "../../islands/Header/Navbar.tsx";
import { headerHeight } from "./constants.ts";
import type { SectionProps } from "deco/types.ts";

export interface Props {
  alerts?: {
    alert: string;
    /** @format color */
    background?: string;
    /** @format color */
    color?: string;
  }[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo Branco */
  logoBranco: { src: ImageWidget; alt: string; textColor?: string };

  /** @title Logo Preto */
  logoPreto: { src: ImageWidget; alt: string; textColor?: string };
}


function Header(Props: SectionProps<ReturnType<typeof loader>>) {
  const { alerts, searchbar, navItems, logoBranco, logoPreto, isHome } = Props
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header class={
      isHome
        ? "mb-11 lg:mb-[34px] 2xl:mb-11"
        : "mb-[104px] lg:mb-[94px] 2xl:mb-[130px]"
    } >
      <Drawers menu={{ items }} searchbar={searchbar} platform={platform} logoPreto={logoPreto}>
        <div className="fixed w-full z-50"> 
          <Alert alerts={alerts} />
          <Navbar
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            platform={platform}
            logoPreto={logoPreto}
            logoBranco={logoBranco}
          />
        </div>
      </Drawers>
    </header>
  );
}

export const loader = (props: Props, req: Request) => {

  const isHome = new URLPattern({ pathname: "/" }).test(req.url)


  return { isHome, ...props };
};

export default Header;
