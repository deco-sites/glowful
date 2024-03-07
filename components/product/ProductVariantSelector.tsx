import { useState } from "preact/hooks";
import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useUI } from "$store/sdk/useUI.ts";

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
          <div className="flex items-center">
            <span className="text-[16px] font-fraunces font-semibold mr-2">
              Sabor:
            </span>
            <select
              className="py-[12px] px-[16px] pr-[24px] bg-[#F4F4F4] rounded-[50px] border border-[#CCC] font-bold outline-none text-[#111]"
              value={selectedOptions["Sabor"]?.value || ""}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                const link = possibilities["Sabor"][value];
                if (link !== undefined) {
                  handleOptionSelect("Sabor", value, link);
                }
              }}
            >
              {Object.entries(possibilities["Sabor"]).map(
                ([value, link]) => (
                  <option className="font-bold" key={value} value={value}>
                    {value}
                  </option>
                ),
              )}
            </select>
          </div>
        )}
      </li>

      {/* Renderizar tamanho */}
      <li className="flex items-center gap-2">
        {possibilities["Tamanho"] && (
          <div className="flex items-center">
            <span className="text-[16px] font-fraunces font-semibold mr-2">
              Tamanho:
            </span>
            <div className="bg-[#F4F4F4] rounded-[50px] flex overflow-hidden">
              {Object.entries(possibilities["Tamanho"]).map(
                ([value, link]) => (
                  <button
                    key={value}
                    className={`py-[12px] px-[56px] font-bold outline-none ${
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
                ),
              )}
            </div>
          </div>
        )}
      </li>
    </ul>
  );
}

export default VariantSelector;
