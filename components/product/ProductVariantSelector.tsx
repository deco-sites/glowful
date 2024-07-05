import { useState } from "preact/hooks";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { relative } from "$store/sdk/url.ts";

export interface Props {
  product: Product;
}

interface SelectedOption {
  value: string;
  link: string;
}

interface SelectedOptions {
  [name: string]: SelectedOption;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const [handleDropdown, setHandleDropdown] = useState<boolean>(false);
  const { quantityProduct } = useUI();

  // Estado para armazenar as opções selecionadas
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => {
      // Inicializa as opções selecionadas com o primeiro valor de cada categoria
      const initialSelectedOptions: SelectedOptions = {};

      Object.keys(possibilities).forEach((name) => {
        const [firstValue, firstLink] = Object.entries(possibilities[name])[0];
        initialSelectedOptions[name] = { value: firstValue, link: firstLink };
      });

      return initialSelectedOptions;
    },
  );

  const handleOptionSelect = (name: string, value: string, link: string) => {
    setSelectedOptions({ ...selectedOptions, [name]: { value, link } });
    quantityProduct.value = 1;
  };

  return (
    <ul className="flex flex-col gap-[24px]">
      {/* Renderizar apenas sabores e tamanhos */}
      <li className="flex items-center gap-2">
        {/* Renderizar sabor */}
        {possibilities["Sabor"] && (
          <div className="flex items-center lg:pl-0">
            <span className="text-[14px] mr-3 lg:mr-[50px]">Sabor:</span>

            <div class="relative w-fit">
              <label class=" peer relative flex h-[42px] min-w-[160px] max-w-[300px] flex-row items-center justify-between bg-[#F4F4f4] rounded-[50px] border-2 border-[#CCCCCC] px-[16px] py-[12px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={handleDropdown}
                  name="todo[1]"
                  class="peer invisible"
                  onChange={() => setHandleDropdown(true)}
                />

                <span class="left-0 z-10 -ml-4 mr-[10px] w-full overflow-hidden text-nowrap font-bold before:absolute before:left-0 before:-z-10 before:h-5 before:w-7 before:bg-white">
                  {selectedOptions["Sabor"]?.value}
                </span>

                <div class="h-2 w-2 -rotate-45 border-l-2 border-b-2 border-red-500 duration-300 ease-in-out before:absolute before:bottom-0 before:h-2 before:w-2 before:bg-white peer-checked:rotate-[135deg]">
                </div>
              </label>

              <div class="absolute top-full hidden w-full flex-col gap-[2px] border-2 border-[#F4F4F4] bg-[#F4F4F4] peer-has-[:checked]:flex">
                {Object.entries(possibilities["Sabor"]).map(([value, link]) => {
                  const relativeLink = relative(link);

                  return (
                    <button
                      f-partial={relativeLink}
                      f-client-nav
                      key={value}
                      class="text-left font-bold h-full w-full bg-white-lily px-[16px] py-[10px] text-[#878787] hover:bg-[#CE0F69] hover:text-white-lily"
                      onClick={() => {
                        handleOptionSelect("Sabor", value, link);
                        setHandleDropdown(false);
                      }}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </li>

      {/* Renderizar tamanho */}
      <li className="flex items-center gap-2 lg:pl-0 w-full">
        {possibilities["Tamanho"] && (
          <div className="flex flex-col lg:items-center lg:flex-row gap-[16px] lg:gap-[14px] w-full">
            <span className="text-[14px] lg:text-[16px] mr-2">Tamanho:</span>
            <div className="bg-[#F4F4F4] rounded-[50px] flex overflow-hidden w-full">
              {Object.entries(possibilities["Tamanho"]).map(([value, link]) => {
                const relativeLink = relative(link);

                return (
                  <button
                    f-partial={relativeLink}
                    f-client-nav
                    key={value}
                    className={`py-[11px] lg:py-[10px] px-[20px] w-full text-[14px] outline-none ${
                      selectedOptions["Tamanho"]?.value === value
                        ? "bg-[#111] text-[#fff] rounded-[50px]"
                        : "bg-[#F4F4F4] text-[#111]"
                    } border-[#CCC]`}
                    onClick={() => {
                      handleOptionSelect("Tamanho", value, link);
                    }}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </li>
    </ul>
  );
}

export default VariantSelector;
