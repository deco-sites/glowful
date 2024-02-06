import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  inventoryLevel: number;
  price: number;
}

function ChangeQuantityProduct({ inventoryLevel, price }: Props) {
  const { quantityProduct } = useUI();

  return (
    <div class="max-w-[312px] flex justify-between items-center">
      <div class="flex items-center gap-[8px]">
        <button
          onClick={() =>
            (quantityProduct.value =
              quantityProduct.value != 1 ? quantityProduct.value - 1 : 1)
          }
        >
          <Icon id="Sub" size={20} strokeWidth={1} class="text-[#4A4A4A]" />
        </button>
        <span class="font-fraunces">{quantityProduct.value}</span>
        <button
          onClick={() =>
            (quantityProduct.value =
              inventoryLevel > quantityProduct.value
                ? quantityProduct.value + 1
                : inventoryLevel)
          }
        >
          <Icon id="Add" size={20} strokeWidth={1} class="text-[#4A4A4A]" />
        </button>
      </div>

      <p class="text-[20px] font-semibold leading-normal">
        {`R$${(price * quantityProduct.value).toFixed(2).replace(".", ",")}`}
      </p>
    </div>
  );
}

export default ChangeQuantityProduct;
