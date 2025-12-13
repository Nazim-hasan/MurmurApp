import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const SIZES = {
  headerHeight: 60,
  modalHeight1: 600,
  bottomTabBarHeight: 80,
  restaurantCardHeightForList: 240,
  restaurantCardAspectRatioForList: 16 / 9,
  itemDetailsHeaderImageHeight: screenWidth / (16 / 9),
  // global sizes
  tiny: 4,
  base: 8,
  radius: 12,
  five: 5,
  padding: 16,

  xXSM: 2, // extra extra small
  xSM: 4, // extra small
  sSM: 6, // semi small
  sm: 8, // small
  sMD: 10, // semi medium
  md: 12, // medium
  lg: 16, // large
  sLG: 18, // semi large
  xLG: 20, // extra large
  xXLG: 24, // extra extra large
  xXXLG: 32, // extra extra extra large

  // app dimensions
  width,
  height,
  screenWidth,
  screenHeight,
  '100_P': '100%',
  // containerPaddingHorizontal: moderateScale(17),
  // homeScreenPaddingHorizontal: moderateScale(20),
};

export const Theme = {
  
  colors: {
    transparent: 'transparent',
    primary: '#1D7ABF',
    primary50: '#E8F2F9',
    primary100: '#B9D6EB',
    primary200: '#97C2E2',
    primary300: '#68A6D4',
    primary400: '#4A95CC',
    primary600: '#1A6FAE',
    primary700: '#155788',
    primary800: '#104369',
    primary900: '#0C3350',

    secondary100: '#ECFDF3',
    secondary: '#039855',

    gray50: '#FAFAFA',
    gray100: '#F1F1F1',
    gray200: '#EAEAEA',
    gray300: '#E0E0E0',
    gray400: '#DADADA',
    gray500: '#D1D1D1',
    gray600: '#BEBEBE',
    gray700: '#949494',
    gray800: '#737373',
    gray900: '#585858',

    white: '#FFFFFF',
    white50: '#FDFDFD',
    white100: '#F7F7F7',
    white200: '#F4F4F4',
    white300: '#EEEEEE',
    white400: '#EBEBEB',
    white500: '#E6E6E6',
    white600: '#D1D1D1',
    white700: '#A3A3A3',
    white800: '#7F7F7F',
    white900: '#616161',

    black50: '#E6E6E6',
    black100: '#B0B0B0',
    black200: '#8A8A8A',
    black300: '#545454',
    black400: '#333333',
    black: '#000000',

    footer50: '#E8E9EA',
    footer100: '#B7BCBD',
    footer200: '#949B9D',
    footer300: '#646E70',
    footer400: '#455154',
    footer500: '#172629',
    footer600: '#152325',
    footer700: '#101B1D',
    footer800: '#0D1517',
    footer900: '#0A1011',

    danger: '#E60000',
  },
};
