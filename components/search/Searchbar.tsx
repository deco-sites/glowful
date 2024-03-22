/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useRef, useState } from "preact/compat";
import { formatPrice } from "$store/sdk/format.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
}

function Searchbar({
  placeholder = "O que você está procurando?",
  action = "/s",
  name = "q",
}: Props) {
  const id = useId();
  const { displaySearchPopup, displaySearchDrawer, quantityInstallments } =
    useUI();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dataSuggestions, setDataSuggestions] = useState([]);
  const [dataProducts, setDataProducts] = useState({
    categories: [],
    items: [],
  });
  const [notFound, setNotFound] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  // deno-lint-ignore no-explicit-any
  function handleSearch(e: any) {
    if (e === "") {
      setSearchEmpty(true);

      Promise.all([
        fetch(
          `https://searchserverapi.com/getresults?api_key=4Z7U1B1F2c&items=false&q=&suggestions=true&suggestionsMaxResults=4`
        ),
        fetch(
          `https://searchserverapi.com/getresults?api_key=4Z7U1B1F2c&queryBy[title]=&maxResults=4&categories=true&categoriesMaxResults=8`
        ),
      ])
        .then(([response1, response2]) =>
          Promise.all([response1.json(), response2.json()])
        )
        .then(([data1, data2]) => {
          if (data1.suggestions.length > 0 || data2.totalItems > 0) {
            setDataProducts({
              categories: data2.categories,
              items: data2.items,
            });
            setDataSuggestions(data1.suggestions);
          } else {
            setNotFound(true);
            setDataSuggestions([]);
            setDataProducts({
              categories: [],
              items: [],
            });
          }
        });
      return;
    } else {
      setSearchEmpty(false);

      Promise.all([
        fetch(
          `https://searchserverapi.com/getresults?api_key=4Z7U1B1F2c&items=false&q=${e}&suggestions=true&suggestionsMaxResults=4`
        ),
        fetch(
          `https://searchserverapi.com/getresults?api_key=4Z7U1B1F2c&queryBy[title]=${e}&maxResults=4&categories=true&categoriesMaxResults=8&sortBy=title`
        ),
      ])
        .then(([response1, response2]) =>
          Promise.all([response1.json(), response2.json()])
        )
        .then(([data1, data2]) => {
          if (data1.suggestions.length > 0 || data2.totalItems > 0) {
            setDataProducts({
              categories: data2.categories,
              items: data2.items,
            });
            setDataSuggestions(data1.suggestions);
          } else {
            setNotFound(true);
            setDataSuggestions([]);
            setDataProducts({
              categories: [],
              items: [],
            });
          }
        });
    }
  }

  console.log(notFound);

  return (
    <div class="w-full grid gap-8 px-4 lg:p-10 lg:rounded-b-[8px] py-6 overflow-y-hidden lg:h-fit lg:max-w-[1130px]">
      <div class="flex">
        <form id={id} action={action} class="join border w-full">
          <Button
            type="submit"
            class="join-item btn-square bg-transparent border-none"
            aria-label="Search"
            for={id}
            tabIndex={-1}
          >
            <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />
          </Button>
          <input
            ref={searchInputRef}
            id="search-input"
            class="input join-item flex-grow pl-0"
            name={name}
            onChange={(e) => handleSearch(e.currentTarget.value)}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              // setQuery(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
        </form>
        <Button
          type="button"
          class="join-item btn-ghost btn-square inline-flex lg:hidden"
          onClick={() => {
            displaySearchPopup.value = false;
            displaySearchDrawer.value = false;
          }}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      </div>

      {dataSuggestions.length > 0 ||
      dataProducts.items?.length > 0 ||
      dataProducts.categories?.length > 0 ? (
        <div class="overflow-x-scroll lg:overflow-hidden h-[calc(100vh-130px)] md:h-fit">
          <div class="flex gap-[30px] md:gap-[30px] xl:gap-[60px] lg:justify-between">
            <div class="flex flex-col gap-[30px] md:gap-[40px] w-full lg:max-w-[240px]">
              {dataSuggestions.length > 0 && (
                <div class="flex flex-col gap-[24px] md:gap-[30px] w-full">
                  <span
                    class="font-medium text-[18px] md:text-[20px] leading-[24px]"
                    role="heading"
                    aria-level={3}
                  >
                    {searchEmpty ? "TERMOS POPULARES" : "TERMOS BUSCADOS"}
                  </span>
                  <ul
                    id="search-suggestion"
                    class="flex flex-col gap-[20px] md:gap-[30px]"
                  >
                    {dataSuggestions.map((term) => (
                      <li>
                        <a
                          href={`/s?q=${term}`}
                          class="flex gap-[20px] items-center"
                        >
                          <span>
                            <Icon
                              id="MagnifyingGlass"
                              size={20}
                              strokeWidth={0.02}
                            />
                          </span>
                          <span>{term}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dataProducts.items?.length > 0 && (
                <div class="flex flex-col md:hidden gap-[24px]">
                  <span
                    class="font-medium text-[18px] leading-[24px]"
                    role="heading"
                    aria-level={3}
                  >
                    {searchEmpty ? "PRODUTOS POPULARES" : "PRODUTOS"}
                  </span>
                  {dataProducts.items.map((product: any) => (
                    <a href={product.link} class="flex gap-[20px] items-center">
                      <img
                        class="object-cover w-full h-full rounded-[8px] max-w-[122px] max-h-[109px]"
                        loading="lazy"
                        src={product.image_link}
                      />
                      <div class="flex flex-col justify-center gap-3">
                        <div>
                          <span class="text-[14px] leading-[17px]">
                            {product.tags ?? product.tags[0]}
                          </span>
                          <p class="leading-[21px] font-semibold">
                            {product.title}
                          </p>
                        </div>
                        <div>
                          <p class="text-[18px] text-[#CE0F69] leading-[21px] font-semibold">
                            {formatPrice(product.price)}
                          </p>
                          <p class="text-[14px] leading-[17px]">
                            {quantityInstallments.value +
                              "x " +
                              formatPrice(
                                product.price / Number(quantityInstallments)
                              )}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {dataProducts.categories?.length > 0 &&
                dataProducts.items?.length > 0 && (
                  <div class="flex flex-col gap-[24px] md:gap-[30px] w-full">
                    <span
                      class="font-medium text-[18px] md:text-[20px] leading-[24px]"
                      role="heading"
                      aria-level={3}
                    >
                      {searchEmpty ? "CATEGORIAS POPULARES" : "CATEGORIAS"}
                    </span>
                    <ul
                      id="search-suggestion"
                      class="flex gap-3 md:flex-wrap md:gap-x-[12px] md:gap-y-[20px] w-full overflow-y-scroll md:overflow-auto"
                    >
                      {dataProducts.categories.map((category: any) => (
                        <li class="rounded-[20px] px-5 py-3.5 md:px-[18px] md:py-[12px] bg-[#CE0F69] md:bg-[#E4E4E4] hover:bg-[#CE0F69] transition-colors font-bold text-[20px] md:text-[16px] leading-[26px] md:leading-[20px] text-white-lily md:text-[#000] hover:text-white-lily">
                          <a href={`/${category.title.toLowerCase()}`}>
                            <span>{category.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            {dataProducts.items?.length > 0 && (
              <div class="hidden md:flex flex-col gap-[24px]">
                <span
                  class="font-medium text-[20px] leading-[24px]"
                  role="heading"
                  aria-level={3}
                >
                  {searchEmpty ? "PRODUTOS POPULARES" : "PRODUTOS"}
                </span>
                <div class="grid grid-cols-2 gap-y-[20px] xl:gap-y-[50px] gap-x-[30px] xl:gap-x-[70px]">
                  {dataProducts.items.map((product: any) => (
                    <a
                      href={product.link}
                      class="flex gap-[20px] items-start w-full"
                    >
                      <img
                        class="object-cover w-full h-full rounded-[8px] max-w-[150px] max-h-[134px]"
                        loading="lazy"
                        src={product.image_link}
                      />
                      <div class="flex flex-col justify-center gap-3">
                        <div>
                          <span class="text-[14px] leading-[17px]">
                            {product.tags ?? product.tags[0]}
                          </span>
                          <p class="leading-[23px] font-semibold text-[18px]">
                            {product.title}
                          </p>
                        </div>
                        <div>
                          <p class="text-[20px] text-[#CE0F69] leading-[21px] font-semibold">
                            {formatPrice(product.price)}
                          </p>
                          <p class="text-[14px] leading-[17px]">
                            {quantityInstallments.value +
                              "x " +
                              formatPrice(
                                product.price / Number(quantityInstallments)
                              )}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : notFound === true ? (
        <p class="w-full text-center">Nenhum produto encontrado...</p>
      ) : null}
    </div>
  );
}

export default Searchbar;
