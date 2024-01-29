export default function ClearFilter() {
  const handleClearFilters = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    window.location.href = baseUrl;
  };

  return (
    <button
      class={`border-0 flex gap-[8px] items-center text-[14px] text-[#4D4D4D]`}
      onClick={() => handleClearFilters()}
    >
      Limpar Filtro
      <img
        loading="lazy"
        width="22"
        height="22"
        src="/icons/trash.svg"
        alt=""
      />
    </button>
  );
}
