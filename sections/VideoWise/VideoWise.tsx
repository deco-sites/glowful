export interface Props{
  title: string;
}

function VideoWise({title}: Props) {
  return (
    <div class="pb-[60px] lg:w-[86%] lg:max-w-[1380px] flex flex-col gap-10 lg:mb-12 2xl:mb-[90px] lg:px-10 lg:pb-20 lg:pt-10 lg:bg-[#F4F4F4] lg:rounded-2xl lg:mx-auto ">
      <h2 class={`text-2xl lg:block text-deep-beauty uppercase font-bold tracking-[1.2px] text-center lg:clampTitleSection`}>{title}</h2>
      <div
        class="reeview-app-widget"
        id="reeview-app-widget_65f444fcdb33eb002981be8a"
      >
      </div>
    </div>
  );
}

export default VideoWise;
