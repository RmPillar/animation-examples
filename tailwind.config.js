module.exports = {
  content: [
    "./*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    spacing: {
      0: "0px",
      1: "1px",
      2: "0.125rem; /* 2px */",
      4: "0.25rem; /* 4px */",
      6: "0.375rem; /* 6px */",
      8: "0.5rem; /* 8px */",
      10: "0.625rem; /* 10px */",
      12: "0.75rem; /* 12px */",
      16: "1rem; /* 16px */",
      18: "1.125rem; /* 18px */",
      20: "1.25rem; /* 20px */",
      24: "1.5rem; /* 24px */",
      28: "1.75rem",
      30: "1.875rem; /* 30px */",
      32: "2rem;",
      36: "2.25rem; /* 36px */",
      40: "2.5rem",
      42: "2.625rem; /* 42px */",
      44: "2.75rem; /* 44px */",
      48: "3rem; /* 48px */",
      50: "3.125rem",
      54: "3.375rem; /* 54px */",
      60: "3.75rem; /* 60px */",
      64: "4rem",
      66: "4.125rem; /* 66px */",
      72: "4.5rem; /* 72px */",
      78: "4.875rem; /* 78px */",
      84: "5.25rem; /* 84px */",
      90: "5.625rem; /* 90px */",
      96: "6rem; /* 96px */",
      102: "6.375rem; /* 102px */",
      108: "6.75rem; /* 108px */",
      114: "7.125rem; /* 114px */",
      116: "7.25rem",
      120: "7.5rem; /* 120px */",
      126: "7.875rem; /* 126px */",
      132: "8.25rem; /* 132px */",
      138: "8.625rem; /* 138px */",
      144: "9rem; /* 144px */",
      150: "9.375rem; /* 150px */",
      156: "9.75rem; /* 156px */",
      162: "10.125rem; /* 162px */",
      168: "10.5rem; /* 168px */",
      174: "10.875rem; /* 174px */",
      180: "11.25rem; /* 180px */",
      240: "15rem; /* 240px */",
      286: "17.875rem; /* 286px */",
      400: "25rem; /* 400px */",
      "1/12": "8.33333333%",
      "2/12": "16.66666667%",
      "3/12": "25%",
      "4/12": "33.33333333%",
      "5/12": "41.66666667%",
      "6/12": "50%",
      "7/12": "58.33333333%",
      "8/12": "66.66666667%",
      "9/12": "75%",
      "10/12": "83.33333333%",
      "11/12": "91.66666667%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      full: "100%",
      "16/9": "56.25%",
      auto: "auto",
      content: "fit-content",
      "min-content": "min-content",
      "max-content": "max-content",
    },
    width: (theme) => ({
      ...theme("spacing"),
      "out-1/12": "calc(50vw - 500%)",
      "out-2/12": "calc(50vw - 200%)",
      "out-3/12": "calc(50vw - 100%)",
      "out-4/12": "calc(50vw - 50%)",
      "out-5/12": "calc(50vw - 20%)",
      "out-6/12": "50vw",
      "out-7/12": "calc(50vw + (1/7 * 100%))",
      "out-8/12": "calc(50vw + 25%)",
      "out-9/12": "calc(50vw + (1/3 * 100%))",
      "out-10/12": "calc(50vw + 40%)",
      "out-11/12": "calc(50vw + (5/11 * 100%))",
      "out-full": "calc(50vw + 50%)",
      screen: "100vw",
    }),
    height: (theme) => ({
      ...theme("spacing"),
      screen: "100vh",
    }),
    maxWidth: (theme) => ({
      screen: "100vw",
      ...theme("spacing"),
    }),
    minWidth: (theme) => ({
      screen: "100vw",
      ...theme("spacing"),
    }),
    minHeight: (theme) => ({
      screen: "100vh",
      ...theme("spacing"),
    }),
    maxHeight: (theme) => ({
      screen: "100vh",
      ...theme("spacing"),
    }),
    screens: {
      xs: "456px",
      // => @media (min-width: 456px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }

      "3xl": "1660px",
      // => @media (min-width: 1660px) { ... }

      "4xl": "1920px",
      // => @media (min-width: 1920px) { ... }

      "xs-max": {
        max: "455px",
      },
      "sm-max": {
        max: "639px",
      },
      "md-max": {
        max: "767px",
      },
      "lg-max": {
        max: "1023px",
      },
      "xl-max": {
        max: "1279px",
      },
      "2xl-max": {
        max: "1439px",
      },
      "3xl-max": {
        max: "1659px",
      },
    },
    fontFamily: {
      tabular: [
        "Tabular",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
        "-apple-system",
        "sans-serif",
      ],
      geomanist: [
        "Geomanist",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
        "-apple-system",
        "sans-serif",
      ],
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          lg: "4rem",
        },
      },
    },
  },
  plugins: [],
};
