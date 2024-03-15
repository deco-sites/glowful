import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <script
        type="text/javascript"
        async
        src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/1a4dcf0e-0388-401c-814a-04262b9a4b5f-loader.js"
      >
      </script>

      <script>
        {`
          var SKIP_CART = true;
          var FORCE_DOMAIN = true;
          var VIDEOWISE_FAST_INLINE_VIDEO_PLAYER = true;
          var Shopify = { 
            shop: 'https://20c805-5.myshopify.com/',
            currency: { active: 'USD', rate: '1.0' }
          };

          var __st = {
            rid: '',
            p: 'home'
          };
        `}
      </script>

      <link rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://assets.videowise.com/style.css.gz" id="videowise-style-css" />
      <script defer src="https://assets.videowise.com/vendors.js.gz" id="videowise-vendors-js"></script>
      <script defer src="https://assets.videowise.com/client.js.gz" id="videowise-client-js"></script>
    </Head>
  );
}

export default GlobalTags;
