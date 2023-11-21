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
      backgroundImage: {
        "newsletter":"linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), lightgray -188.5px -32.072px / 200.833% 108.804% no-repeat, #FFF"
      },
      boxShadow: { 
        "glowful": "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
      },
      keyframes: {
        shakeIn: {
          "0%": {
            transform: "translateX(150%)"
          },
          "20%, 50%, 80%": {
            transform: "translateX(-5px)"
          },
          "40%, 50%": {
            transform: "translateX(5px)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        shakeOut: {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(150%)"
          }
        }
      },
      animation: {
        "shake-in": "shakeIn 1s ease-in-out 1",
        "shake-out": "shakeOut 0.6s ease-in-out 1"
      }
    },
  },
};