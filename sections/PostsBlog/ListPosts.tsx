import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /**
   * @description Ex: https://blog-glowful.vercel.app
   */
  urlBlog: string;
  title?: string;
  blogText?: string;
  buttonText?: string;
  numberOfPosts?: number;
}

export interface Data {
  id: number;
  slug: string;
  author: number;
  date: string;
  modified: string;
  categories: number[];
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    views_post: string;
    reading_time: string;
    image_mobile: {
      url: string;
      caption: string;
      alt: string;
      height: string;
      width: string;
    };
    image_desktop: {
      url: string;
      caption: string;
      alt: string;
      height: string;
      width: string;
    };
  };
}

export async function loader(
  {
    urlBlog,
    title,
    blogText,
    buttonText,
    numberOfPosts,
  }: Props,
  _req: Request,
) {
  const url = `${urlBlog}/api/mostViewedPosts`;

  const data = await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching posts from blog", err);
    return { data: [] };
  });

  return {
    data: data.slice(0, numberOfPosts ?? 12),
    urlBlog,
    title,
    blogText,
    buttonText,
    numberOfPosts,
  };
}

function ListPosts({
  urlBlog,
  title,
  blogText,
  buttonText,
  numberOfPosts,
  data,
}: SectionProps<typeof loader>) {
  const id = useId();
  const url = urlBlog;
  return (
    <div
      id={id}
      class="py-[40px] lg:py-[120px] lg:ml-[5%] flex lg:items-start flex-col gap-8 lg:gap-[75px] text-base-content"
    >
      <div class="flex flex-col lg:flex-row items-center gap-[4px] lg:gap-[24px]">
        <h3 class="text-deep-beauty text-[24px] lg:text-[36px] uppercase tracking-[1.2px] font-bold text-left">
          {title}
        </h3>
        <a
          href={url}
          target="_blank"
          class="text-[#878787] text-[16px] lg:text-[20px] font-semibold tracking-[1.2px] lg:text-center border-b-[1px] lg:border-b-none"
        >
          {blogText}
        </a>
      </div>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-[0] pl-[24px] relative"
      >
        <Slider.PrevButton class="w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 left-[20px] lg:left-0 transform -translate-y-1/2 z-[3]">
          <Icon
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.PrevButton>
        <Slider class="lg:overflow-hidden flex justify-between carousel carousel-end gap-[20px] lg:gap-[18px] 2xl:gap-[32px] col-span-full row-start-1 row-end-1">
          {data.map((post, index) => (
            <Slider.Item
              index={index}
              key={index}
              class="bg-[#f4f4f4] m-[8px] max-w-[274px] lg:max-w-[330px] 2xl:max-w-[380px] flex flex-col carousel-item relative group rounded-[20px] hover:shadow-md lg:hover:scale-[1.022] transition-all duration-300"
            >
              <a
                aria-label={`Link para a página do post ${post?.title?.rendered}`}
                href={`${url}/post/${post?.slug}`}
                target="_blank"
              >
                <figure>
                  <Image
                    src={post?.acf?.image_mobile.url}
                    title={post?.acf?.image_mobile.caption}
                    alt={post?.acf?.image_mobile.alt}
                    width={380}
                    height={160}
                    loading="lazy"
                    class="w-full h-full lg:block hidden rounded-t-[14px]"
                  />
                  <Image
                    src={post?.acf?.image_mobile.url}
                    title={post?.acf?.image_mobile.caption}
                    alt={post?.acf?.image_mobile.alt}
                    width={274}
                    height={160}
                    loading="lazy"
                    class="w-full h-full lg:hidden block rounded-t-[14px]"
                  />
                </figure>
              </a>
              <div class="w-full flex flex-col py-[24px] px-[16px] lg:p-[32px] gap-[10px]">
                <span class="text-deep-beauty text-[18px] tracking-[1.2px] font-bold">
                  Categoria
                </span>
                <a
                  href={`${url}/post/${post?.slug}`}
                  class="gap-[10px]"
                  target="_blank"
                >
                  <h3 class="text-deep-beauty text-[22px] lg:text-[28px] font-[400] mb-[16px]">
                    {post?.title?.rendered}
                  </h3>
                  <div
                    class="text-[14px]"
                    dangerouslySetInnerHTML={{
                      __html: (post?.content?.rendered).slice(0, 120),
                    }}
                  />
                  <button class="mt-[24px] lg:mt-[40px] px-[32px] py-[10px] bg-deep-beauty text-white-lily rounded-[40px] lg:bg-white-lily lg:text-deep-beauty text-[14px] font-bold uppercase lg:group-hover:bg-deep-beauty lg:group-hover:text-white-lily transition-all duration-300">
                    {buttonText}
                  </button>
                </a>
              </div>
            </Slider.Item>
          ))}
        </Slider>
        <Slider.NextButton class="w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 right-[20px] lg:right-[10%] 2xl:right-[4%] transform -translate-y-1/2 z-[1]">
          <Icon
            size={24}
            id="ChevronRight"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.NextButton>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default ListPosts;
