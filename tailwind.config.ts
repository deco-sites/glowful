import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      redhat: ["Red Hat Display"],
      fraunces: ["Fraunces"],
    },
    colors: {
      "deep-beauty": "#101820",
      "white-lily": "#FFFFFF",
      "cherry-pop": "#CE0F69",
      "candy-lips": "#D7A3AB",
      "peach-skin": "#FFBE9F",
      "glow-night": "#13294B",
      "sereni-green": "#1C8172",
      "soft-pink": "#FF8674",
      "radiant-blue": "#9BCBEB",
      "grape-juice": "#9063CD",
      "sunny-day": "#FFC658",
    },
    extend: {
      boxShadow: { 
        "glowful": "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
      }
    }
  },
};
