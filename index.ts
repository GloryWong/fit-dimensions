export type FitDimensionsMode = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export interface FitDimensionsReturn {
  width: number
  height: number
  x: number
  y: number
}

function isNonNegativeNumber(...args: number[]) {
  return args.every(num => typeof num === 'number' && Number.isFinite(num) && num >= 0)
}

/**
 * @description Fit a source rectangle within a target rectangle
 *
 * @param srcWidth Source/original width
 * @param srcHeight Source/original height
 * @param maxWidth Target width
 * @param maxHeight Target height
 * @param mode One of *contain* | *cover* | *fill* | *none* | *scale-down*. (optional) (default: *contain*)
 *
 * @returns `{ width: number, height: number, x: number, y: number }` (`x` and `y` are the position used to center the fitted rectangle)
 *
 * @see https://github.com/GloryWong/fit-dimensions#readme
 */
export function fitDimensions(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number, mode: FitDimensionsMode = 'contain'): FitDimensionsReturn {
  if (!isNonNegativeNumber(srcWidth, srcHeight, maxWidth, maxHeight)) {
    throw new Error('srcWidth, srcHeight, maxWidth and maxHeight must be non-negative numbers')
  }

  let width = srcWidth
  let height = srcHeight

  if (width !== 0 && height !== 0) {
    const scaleX = maxWidth / srcWidth
    const scaleY = maxHeight / srcHeight

    switch (mode) {
      case 'contain': {
        const scale = Math.min(scaleX, scaleY)
        width = srcWidth * scale
        height = srcHeight * scale
        break
      }
      case 'cover': {
        const scale = Math.max(scaleX, scaleY)
        width = srcWidth * scale
        height = srcHeight * scale
        break
      }
      case 'fill': {
        width = maxWidth
        height = maxHeight
        break
      }
      case 'none': {
        // Keep original size
        break
      }
      case 'scale-down': {
        // Use whichever is smaller: none or contain
        if (srcWidth > maxWidth || srcHeight > maxHeight) {
          const scale = Math.min(scaleX, scaleY)
          width = srcWidth * scale
          height = srcHeight * scale
        }
        break
      }
      default:
        throw new Error(`Unknown mode: ${mode}`)
    }
  }

  // Center the fitted box in the target rectangle
  const x = (maxWidth - width) / 2
  const y = (maxHeight - height) / 2

  return { width, height, x, y }
}
