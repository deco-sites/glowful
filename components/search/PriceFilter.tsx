import Icon from "$store/components/ui/Icon.tsx";

export default function PriceFilter() {
  const searchParams = new URLSearchParams(window.location.search);
  const gte = searchParams.get("filter.v.price.gte");
  const lte = searchParams.get("filter.v.price.lte");

  const removeFilter = () => {
    const filteredParams = new URLSearchParams(searchParams);
    filteredParams.delete("filter.v.price.gte");
    filteredParams.delete("filter.v.price.lte");

    const urlWithoutPrices = `${
      location.pathname
    }?${filteredParams.toString()}`;

    window.location.href = urlWithoutPrices;
  };

  return gte && lte ? (
    <button
      className="rounded-[16px] bg-[#F4F4F4] text-[14px] text-[#666] flex items-center gap-[8px] px-[16px] py-[8px]"
      onClick={() => removeFilter()}
    >
      R$ {gte} - R$ {lte}
      <div className="rotate-45 w-[20px] h-[20px]">
        <Icon id="Plus" size={20} strokeWidth={1} />
      </div>
    </button>
  ) : null;
}
