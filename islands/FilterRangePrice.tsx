import { useState, useEffect } from "preact/hooks";

function FilterRangePrice() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const handleMinChange = (event: any) => {
    setMin(Number(event.target.value));
  };

  const handleMaxChange = (event: any) => {
    setMax(Number(event.target.value));
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const priceGte = urlSearchParams.get("filter.v.price.gte");
    const priceLte = urlSearchParams.get("filter.v.price.lte");
    setMin(priceGte ? parseInt(priceGte as string) : 0);
    setMax(priceLte ? parseInt(priceLte as string) : 0);
  }, []);

  const generateUrl = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addedFilters = new Set();

    urlSearchParams.forEach((value, key) => {
      if (
        !key.startsWith("filter.v.price.") &&
        key !== "filter.v.option.componentes"
      ) {
        addedFilters.add(key);
      }
    });

    urlSearchParams.delete("startCursor");
    urlSearchParams.delete("page");

    urlSearchParams.delete("filter.v.price.gte");
    urlSearchParams.delete("filter.v.price.lte");

    if (min) {
      urlSearchParams.set("filter.v.price.gte", min.toString());
    }

    if (max) {
      urlSearchParams.set("filter.v.price.lte", max.toString());
    }

    addedFilters.forEach((filter) => {
      const currentValue = urlSearchParams.get(String(filter)) || "";
      urlSearchParams.set(String(filter), currentValue);
    });

    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;

    return newUrl;
  };

  const urlStatic = (gte: number, lte: number) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete("filter.v.price.gte");
    urlSearchParams.delete("filter.v.price.lte");
    urlSearchParams.set("filter.v.price.gte", gte.toString());
    urlSearchParams.set("filter.v.price.lte", lte.toString());
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    return newUrl;
  };

  return (
    <div class="flex flex-col gap-[24px]">
      <div class="flex flex-col gap-[8px]">
        <a class="text-[18px] text-[#666]" href={urlStatic(0, 100)}>
          Até R$ 100
        </a>
        <a class="text-[18px] text-[#666]" href={urlStatic(100, 200)}>
          R$ 100 a R$ 200
        </a>
        <a class="text-[18px] text-[#666]" href={urlStatic(200, 300)}>
          R$ 200 a R$ 300
        </a>
      </div>

      <div class="flex items-center gap-[4px]">
        <input
          class="w-[100px] h-[33px] input input-bordered rounded-full"
          type="number"
          placeholder="Mínimo"
          value={min == 0 ? "" : min}
          onChange={handleMinChange}
        />
        <span class="h-[1px] w-full bg-[#ccc]" />
        <input
          class="w-[100px] h-[33px] input input-bordered rounded-full"
          type="number"
          placeholder="Máximo"
          value={max == 0 ? "" : max}
          onChange={handleMaxChange}
        />
      </div>
      <a class="btn" href={generateUrl()}>
        Aplicar Filtro
      </a>
    </div>
  );
}

export default FilterRangePrice;
