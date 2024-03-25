import { navbarHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup, displayTop } = useUI();
  const pathname = window.location.pathname;
  const newNavbarHeight = Number(navbarHeight.split("px")[0]);
  const [heightCalc, setHeightCalc] = useState(newNavbarHeight);

  if (!searchbar) {
    return null;
  }

  useEffect(() => {
    if (pathname === "/") {
      setHeightCalc(displayTop.value ? newNavbarHeight + 40 : newNavbarHeight);
    } else {
      setHeightCalc(newNavbarHeight);
    }
  }, [displayTop.value]);

  return (
    <Modal
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => (displaySearchPopup.value = false)}
    >
      <div
        class="absolute top-0 bg-base-100 container lg:h-fit lg:!max-w-[1130px]"
        style={{
          marginTop: `${heightCalc}px`,
        }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>
  );
}

export default SearchbarModal;
