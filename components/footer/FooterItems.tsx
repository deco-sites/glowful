
export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  dropdown?: boolean;
  items: Item[];
};

export default function FooterItems({
  sections,
  justify = false,
}: {
  sections: Section[];
  justify: boolean;
}) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-[50px] flex-wrap ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2 min-w-[190px]">
                  <span class="font-bold text-xl text-white-lily">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap `}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block py-1 link link-hover text-base text-[#878787]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden !gap-[30px]">
            {sections.map((section) =>
              section.dropdown ? (
                <li>
                  <div class="collapse collapse-arrow ">
                    <input type="checkbox" class="min-h-[0]" />
                    <div class="collapse-title min-h-[0] w-fit !p-0 !pr-[35px] flex gap-2 font-bold text-lg text-white-lily">
                      <span>{section.label}</span>
                    </div>
                    <div class="collapse-content pl-0">
                      <ul class={`flex flex-col gap-[16px] pt-6`}>
                        {section.items?.map((item) => (
                          <li>
                            <a
                              href={item.href}
                              class="block py-1 link link-hover text-lg text-[#E4E4E4]"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li>
                  <div class="min-h-[0] w-fit !p-0 !pr-[35px] flex gap-2 font-bold text-lg text-white-lily">
                    <span class={`tracking-widest`}>{section.label}</span>
                  </div>
                  <ul class={`flex flex-col gap-[16px] pt-6`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="py-1 link link-hover text-lg text-[#E4E4E4]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </>
  );
}
