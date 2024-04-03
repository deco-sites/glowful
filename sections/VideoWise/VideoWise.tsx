export interface Props{
  title: string;
}

function VideoWise({title}: Props) {
  return (
    <div class="py-[64px] lg:w-[80%] lg:flex lg:flex-col lg:gap-10 lg:my-16 lg:px-10 lg:py-20 lg:bg-[#F4F4F4] lg:rounded-2xl lg:mx-auto ">
      <h2 class={`hidden lg:block text-deep-beauty uppercase font-bold tracking-[1.2px] text-center clampTitleSection`}>{title}</h2>
      <div
        class="reeview-app-widget"
        id="reeview-app-widget_65f444fcdb33eb002981be8a"
      >
      </div>
    </div>
  );
}

export default VideoWise;
