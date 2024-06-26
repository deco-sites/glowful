import BackToTop from "$store/components/footer/BackToTop.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social from "$store/components/footer/Social.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Image from "apps/website/components/Image.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  dropdown?: boolean;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  title?: string;
  description?: string;
  sections?: Section[];
  social?: {
    image: ImageWidget;
    alt: string;
    link: string;
  }[];
  /** @format textarea */
  details?: string;
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  logo: {
    image: ImageWidget;
  };
  /** @format color */
  backgroundColor?: string;
  /** @format color */
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

function Footer({
  title,
  description,
  details,
  logo,
  social,
  sections = [
    {
      label: "Sobre",
      items: [
        {
          href: "/quem-somos",
          label: "Quem somos",
        },
        {
          href: "/termos-de-uso",
          label: "Termos de uso",
        },
        {
          href: "/trabalhe-conosco",
          label: "Trabalhe conosco",
        },
      ],
    },
    {
      label: "Atendimento",
      items: [
        {
          href: "/centraldeatendimento",
          label: "Central de atendimento",
        },
        {
          href: "/whatsapp",
          label: "Fale conosco pelo WhatsApp",
        },
        {
          href: "/trocaedevolucao",
          label: "Troca e devolução",
        },
      ],
    },
  ],
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  backgroundColor,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _sectionLinks = layout?.hide?.sectionLinks ? (
    <></>
  ) : (
    <FooterItems
      sections={sections}
      justify={
        layout?.variation == "Variation 2" || layout?.variation == "Variation 3"
      }
    />
  );
  const _social = layout?.hide?.socialLinks ? (
    <></>
  ) : (
    <Social images={social} />
  );
  const _payments = layout?.hide?.paymentMethods ? (
    <></>
  ) : (
    <PaymentMethods content={payments} />
  );
  const _apps = layout?.hide?.mobileApps ? (
    <></>
  ) : (
    <MobileApps content={mobileApps} />
  );
  const _region = layout?.hide?.regionOptions ? (
    <></>
  ) : (
    <RegionSelector content={regionOptions} />
  );
  const _links = layout?.hide?.extraLinks ? (
    <></>
  ) : (
    <ExtraLinks content={extraLinks} logo={logo} />
  );

  return (
    <footer
      class="w-full flex flex-col pt-10 pb-2 lg:pt-[90px] lg:pb-10 gap-10"
      style={{ background: backgroundColor ? backgroundColor : "#1D1D1D" }}
    >
      <div class="lg:w-[95%] lg:px-9 lg:max-w-[1408px] mx-6 lg:mx-auto">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="lg:flex lg:gap-[50px] lg:mb-[100px] lg:justify-between">
              <div class="lg:flex lg:flex-col max-w-[310px]">
                <div class="flex flex-col gap-[24px] mb-[32px]">
                <Image
                  src={logo.image}
                  alt={"Logo Glowful"}
                  width={170}
                  height={25}
                  class={`w-[170px] lg:w-[220px]`}
                />
                </div>

                <div class="lg:mb-0 flex flex-col gap-[30px] lg:flex-nowrap">
                  {_social}
                </div>

                <div class="mt-10 mb-[64px] lg:flex lg:m-0 lg:h-full lg:items-end">
                  {details && (
                    <p class="text-sm leading-[150%] text-[#878787]">
                      {details}
                    </p>
                  )}
                </div>
              </div>

              <div class="flex gap-10 lg:gap-14 lg:items-end">
                {_apps}
                {_payments}
                <div class="flex flex-col lg:flex-row gap-10 lg:gap-14  lg:items-end">
                  {_sectionLinks}
                  {_region}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse lg:flex-row lg:justify-between gap-10 mb-8">
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_social}
                {_payments}
                {_apps}
                {_region}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">{_payments}</div>
                  <div class="lg:flex-auto">{_social}</div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {_region}
                  {_apps}
                </div>
              </div>
            </div>
            <Divider />
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {layout?.hide?.newsletter ? <></> : <Divider />}

            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {_region}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop ? (
        <></>
      ) : (
        <BackToTop content={backToTheTop?.text} />
      )}
    </footer>
  );
}

export default Footer;
