function ButtonMore(
  { onClick, textHover }: { onClick: () => void; textHover: string },
) {
  return (
    <button
      class="h-[48px] px-[14px] rounded-[100px] bg-cherry-pop text-white-lily text-[16px] font-bold uppercase tracking-[2px] flex justify-center items-center shadow-2x1 hover:bg-[#111] hover:px-[30px] transition-all duration-300"
      onClick={onClick}
      onMouseOver={(e) => {
        if (e.target instanceof HTMLElement) {
          e.target.innerHTML = `${textHover}`;
        }
      }}
      onMouseOut={(e) => {
        if (e.target instanceof HTMLElement) {
          e.target.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M11.875 1.875C11.875 0.839466 11.0355 0 10 0C8.96447 0 8.125 0.839466 8.125 1.875V8.125H1.875C0.839466 8.125 0 8.96447 0 10C0 11.0355 0.839466 11.875 1.875 11.875H8.125L8.125 18.125C8.125 19.1605 8.96446 20 10 20C11.0355 20 11.875 19.1605 11.875 18.125V11.875H18.125C19.1605 11.875 20 11.0355 20 10C20 8.96447 19.1605 8.125 18.125 8.125H11.875V1.875Z"
              fill="white"
            />
          </svg>
          `;
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M11.875 1.875C11.875 0.839466 11.0355 0 10 0C8.96447 0 8.125 0.839466 8.125 1.875V8.125H1.875C0.839466 8.125 0 8.96447 0 10C0 11.0355 0.839466 11.875 1.875 11.875H8.125L8.125 18.125C8.125 19.1605 8.96446 20 10 20C11.0355 20 11.875 19.1605 11.875 18.125V11.875H18.125C19.1605 11.875 20 11.0355 20 10C20 8.96447 19.1605 8.125 18.125 8.125H11.875V1.875Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

export default ButtonMore;
