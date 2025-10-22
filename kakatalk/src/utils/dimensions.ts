import { Dimensions, PixelRatio } from 'react-native';
import Platform from './platform';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const [shortDimension, longDimension] =
  windowWidth < windowHeight
    ? [windowWidth, windowHeight]
    : [windowHeight, windowWidth];

const STANDARD_WINDOW = { width: 375, height: 812 };

export const perWidth = (size: number): number =>
  PixelRatio.roundToNearestPixel((shortDimension * size) / 100);
export const perHeight = (size: number): number =>
  PixelRatio.roundToNearestPixel((longDimension * size) / 100);
export const resWidth = (size: number): number =>
  PixelRatio.roundToNearestPixel(
    (shortDimension / STANDARD_WINDOW.width) * size,
  );
export const resHeight = (size: number): number =>
  PixelRatio.roundToNearestPixel(
    (longDimension / STANDARD_WINDOW.height) * size,
  );

export function resFont(size: number): number {
  const newSize = (size * shortDimension) / STANDARD_WINDOW.width;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
}

const checkDimensions = (dimensions: [number, number][]): boolean => {
  return dimensions.some(([dimensionWidth, dimensionHeight]) => {
    return (
      (windowHeight === dimensionHeight && windowWidth === dimensionWidth) ||
      (windowWidth === dimensionHeight && windowHeight === dimensionWidth) ||
      (screenHeight === dimensionHeight && screenWidth === dimensionWidth) ||
      (screenWidth === dimensionHeight && screenHeight === dimensionWidth)
    );
  });
};

const isIphoneXOrNewer = (): boolean => {
  return (
    Platform.isIos &&
    checkDimensions([
      [780, 360],
      [812, 375],
      [844, 390],
      [896, 414],
      [926, 428],
      [852, 393],
      [932, 430],
    ])
  );
};

const Screen = {
  windowWidth,
  windowHeight,
  screenHeight,
  screenWidth,
  isIphoneXOrNewer,
};

export default Screen;
