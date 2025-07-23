import type { FitDimensionsMode, FitDimensionsReturn } from './index'
import { expect, it } from 'vitest'
import { fitDimensions } from './index' // Adjust the path as needed

function expectCloseValues(obj: FitDimensionsReturn, expected: FitDimensionsReturn) {
  for (const key in expected) {
    expect(obj[key]).toBeCloseTo(expected[key])
  }
}

const cases: [desc: string, srcW: number, srcH: number, maxW: number, maxH: number, mode: FitDimensionsMode | undefined, expected: FitDimensionsReturn | string][] = [
  [
    'contain: 800x600 into 400x400',
    800,
    600,
    400,
    400,
    'contain',
    { width: 400, height: 300, x: 0, y: 50 },
  ],
  [
    'contain: portrait source into landscape target',
    600,
    800,
    400,
    300,
    'contain',
    { width: 225, height: 300, x: 87.5, y: 0 },
  ],
  [
    'contain: smaller source into larger target',
    100,
    100,
    300,
    300,
    'contain',
    { width: 300, height: 300, x: 0, y: 0 },
  ],
  [
    'cover: 800x600 into 400x400',
    800,
    600,
    400,
    400,
    'cover',
    { width: 533.3333333333334, height: 400, x: -66.66666666666669, y: 0 },
  ],
  [
    'cover: portrait source into landscape target',
    600,
    800,
    400,
    300,
    'cover',
    { width: 400, height: 533.3333333333334, x: 0, y: -116.66666666666669 },
  ],
  [
    'fill: 800x600 into 400x400',
    800,
    600,
    400,
    400,
    'fill',
    { width: 400, height: 400, x: 0, y: 0 },
  ],
  [
    'none: 800x600 into 400x400',
    800,
    600,
    400,
    400,
    'none',
    { width: 800, height: 600, x: -200, y: -100 },
  ],
  [
    'none: smaller source into larger target',
    100,
    200,
    400,
    400,
    'none',
    { width: 100, height: 200, x: 150, y: 100 },
  ],
  [
    'scale-down: source smaller than target',
    100,
    100,
    400,
    400,
    'scale-down',
    { width: 100, height: 100, x: 150, y: 150 },
  ],
  [
    'scale-down: source larger than target',
    800,
    600,
    400,
    400,
    'scale-down',
    { width: 400, height: 300, x: 0, y: 50 },
  ],
  // Below are edge cases
  [
    'Zero source size',
    10,
    0,
    400,
    400,
    'contain',
    { width: 10, height: 0, x: 195, y: 200 },
  ],
  [
    'Negative source size',
    0,
    -10,
    400,
    400,
    'contain',
    'must be non-negative',
  ],
  [
    'Zero target size',
    800,
    600,
    0,
    0,
    'contain',
    { width: 0, height: 0, x: 0, y: 0 },
  ],
  [
    'Negative target size',
    800,
    600,
    0,
    -10,
    'contain',
    'must be non-negative',
  ],
  [
    'Default to contain mode',
    100,
    100,
    300,
    300,
    undefined,
    { width: 300, height: 300, x: 0, y: 0 },
  ],
  [
    'Unknown mode',
    800,
    600,
    0,
    0,
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    'mode',
    'mode',
  ],
]

it.each(cases)(
  '%s',
  (_, srcW, srcH, maxW, maxH, mode, expected) => {
    if (typeof expected === 'string') {
      expect(() => fitDimensions(srcW, srcH, maxW, maxH, mode)).toThrow(expected)
    }
    else {
      expectCloseValues(fitDimensions(srcW, srcH, maxW, maxH, mode), expected)
    }
  },
)
