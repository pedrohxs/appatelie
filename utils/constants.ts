import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // App dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: 'System', fontSize: SIZES.largeTitle },
  h1: { fontFamily: 'System', fontSize: SIZES.h1, fontWeight: 'bold' as const },
  h2: { fontFamily: 'System', fontSize: SIZES.h2, fontWeight: 'bold' as const },
  h3: { fontFamily: 'System', fontSize: SIZES.h3, fontWeight: 'bold' as const },
  h4: { fontFamily: 'System', fontSize: SIZES.h4, fontWeight: 'bold' as const },
  body1: { fontFamily: 'System', fontSize: SIZES.body1 },
  body2: { fontFamily: 'System', fontSize: SIZES.body2 },
  body3: { fontFamily: 'System', fontSize: SIZES.body3 },
  body4: { fontFamily: 'System', fontSize: SIZES.body4 },
  body5: { fontFamily: 'System', fontSize: SIZES.body5 },
  
  // Font weights
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};