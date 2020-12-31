import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#ff01ff",
  secondary: "#CDCDD2",
  yellow: "#ffd200",
  green: "#a2cf51",
  lightblue: "#9cd5ff",
  blue: "#35b4de",
  darkblue: "#00444b",
  orange: "#fe9901",
  // d6db8b

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  dark: "#1E1F20",
  gary: "#202020",
  pink: "#ff35a2",
  pink2: "#eb5691",
  beige: "#fff7f0",
  yellow2: "#e8af01",
  white2: "#fdfdfd",
  black2: "#090e10",
  gray: "#394e60",
  lightgray: "#5c6d7b",

  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkGray: "#898C95",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto-regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
