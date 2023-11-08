export type Item = {
  label: string;
  href: string;
};

export default function ExtraLinks({ content }: { content?: Item[] }) {
  return (
    <>
      {content && content?.length > 0 && (
        <div class="flex flex-col md:flex-row md:justify-between lg:gap-10 md:w-full">
          <div class="flex flex-col md:flex-row md:order-2 md:items-center md:gap-1">
            <p class="text-[#878787] mb-[8px] md:mb-0 md:text-[20px]">
              Todos os direitos reservados:
            </p>
            {content.map((item) => (
              <a
                class="link text-[18px] leading-[30px] text-deep-beauty col-auto md:before:content-['|'] md:before:mr-1 md:before:text-[#878787]"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
          <p class="text-[#878787] mt-[40px] md:mt-0 md:order-1 md:text-[20px]">
            Copyright © 2024 Seviva Glowful
          </p>
        </div>
      )}
    </>
  );
}
