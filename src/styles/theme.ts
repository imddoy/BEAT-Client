const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#0F0F0F",
    main_pink_400: "#FF006B",
    // pink
    pink_0: "#FFEAF2",
    pink_100: "#FFCFE3",
    pink_200: "#FF97C2",
    pink_300: "#FF4F98",
    pink_400: "#FB247F",
    pink_500: "#E30964",
    pink_600: "#B80450",
    pink_700: "#940742",
    pink_800: "#6F0531",
    pink_900: "#4D0322",
    // gray
    gray_0: "#F4F4F4",
    gray_100: "#EEEEEE",
    gray_200: "#CCCCCC",
    gray_300: "#B2B2B2",
    gray_400: "#939393",
    gray_500: "#797979",
    gray_600: "#626262",
    gray_700: "#3E3E3E",
    gray_800: "#2A2A2A",
    gray_900: "#1B1B1B",
    // purple
    purple_0: "#F6EEFF",
    purple_100: "#E2CCFF",
    purple_200: "#B880FF",
    purple_300: "#9D51FF",
    purple_400: "#811FFF",
    purple_500: "#6D08EF",
    purple_600: "#5B09C3",
    purple_700: "#450795",
    purple_800: "#380578",
    purple_900: "#24034E",
    // semantic
    red: "#FF4141",
    green: "#1ED45A",
    // brand
    blue_400: "#0064FF",
    yellow_400: "#FEE500",
  },
  fonts: {
    heading1: {
      fontFamily: "Pretendard",
      fontSize: "2.4rem",
      fontWeight: "700",
      lineHeight: "3.2rem",
      letterSpacing: "-0.06rem",
    },
    heading2: {
      fontFamily: "Pretendard",
      fontSize: "2.2rem",
      fontWeight: "700",
      lineHeight: "3rem",
      letterSpacing: "-0.055rem",
    },
    heading3: {
      fontFamily: "Pretendard",
      fontSize: "2rem",
      fontWeight: "700",
      lineHeight: "2.8rem",
      letterSpacing: "-0.04rem",
    },
    heading4: {
      fontFamily: "Pretendard",
      fontSize: "1.8rem",
      fontWeight: "600",
      lineHeight: "2.6rem",
      letterSpacing: "-0.018rem",
    },
    body1Normal: {
      fontFamily: "Pretendard",
      fontSize: "1.6rem",
      fontWeight: "600",
      lineHeight: "2.4rem",
      letterSpacing: "-0.016rem",
    },
    body1Long: {
      fontFamily: "Pretendard",
      fontSize: "1.6rem",
      fontWeight: "400",
      lineHeight: "2.6rem",
      letterSpacing: "-0.016rem",
    },
    body2Normal: {
      fontFamily: "Pretendard",
      fontSize: "1.4rem",
      fontWeight: "600",
      lineHeight: "2rem",
      letterSpacing: "-0.007rem",
    },
    body2Long: {
      fontFamily: "Pretendard",
      fontSize: "1.4rem",
      fontWeight: "400",
      lineHeight: "2.2rem",
      letterSpacing: "-0.007rem",
    },
    caption1: {
      fontFamily: "Pretendard",
      fontSize: "1.2rem",
      fontWeight: "600",
      lineHeight: "1.8rem",
      letterSpacing: "-0.03rem",
    },
    caption2: {
      fontFamily: "Pretendard",
      fontSize: "1.1rem",
      fontWeight: "600",
      lineHeight: "1.6rem",
    },
  },
};

export type ColorType = typeof theme.colors;
export type FontType = typeof theme.fonts;

export default theme;
