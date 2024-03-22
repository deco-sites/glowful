import { navbarHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup, displayTop } = useUI();
  const pathname = window.location.pathname;

  if (!searchbar) {
    return null;
  }

  let heightCalc = navbarHeight;

  if (pathname === "/") {
    heightCalc = displayTop ? `calc(${navbarHeight} + 40px` : navbarHeight;
  } else {
    heightCalc = navbarHeight;
  }

  return (
    <Modal
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => (displaySearchPopup.value = false)}
    >
      <div
        class="absolute top-0 bg-base-100 container lg:h-fit lg:!max-w-[1130px]"
        style={{
          marginTop: heightCalc,
        }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>
  );
}

export default SearchbarModal;
