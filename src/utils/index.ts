import dayjs from "dayjs";
import lodash from "lodash";

export function formatDate(d: string | Date) {
  const date = dayjs(d);
  return date.format("YYYY/MM/DD");
}

/**
 * 返回 4*4 的二维数组
 * @returns
 */
export function getMatrix(): number[][] {
  return Adto2d(
    lodash.shuffle(
      [getRandom2or4(), getRandom2or4()].concat(new Array(14).fill(0))
    )
  )!;
}

/**
 * @example
 * return Math.random() < 0.9 ? 2 : 4
 */
export function getRandom2or4() {
  return Math.random() < 0.9 ? 2 : 4;
}

/**
 * 一维数组转二维，数组长度要为平方数，否则返回 null
 * @example
 * Adto2d([1,2,3,4]) // [[1,2], [3,4]]
 */
export function Adto2d<T>(arr: T[]) {
  const n = arr.length,
    sqrt_n = Math.sqrt(arr.length);

  if (Math.sqrt(n) ** 2 !== n) return null;

  const newArr: T[][] = [];
  for (let i = 0; i < sqrt_n; i++) {
    newArr.push(arr.slice(sqrt_n * i, sqrt_n * (i + 1)));
  }
  return newArr;
}

/**
 * 二维数组顺时针旋转90度
 * @example
 * rotateMatrix([[1,2], [3,4]]) // [[3,1],[2,4]]
 * @returns new Arr
 */
export function rotateMatrix<T>(matrix: T[][]) {
  const _matrix = lodash.cloneDeep(matrix);
  const n = matrix.length;

  // 沿对角线镜像对称二维矩阵
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [_matrix[i][j], _matrix[j][i]] = [_matrix[j][i], _matrix[i][j]];
    }
  }

  function reverseRow(arr: T[]) {
    let i = 0,
      j = arr.length - 1;
    while (i <= j) {
      [arr[i++], arr[j--]] = [arr[j], arr[i]];
    }
  }

  for (let row of _matrix) reverseRow(row);

  return _matrix;
}
