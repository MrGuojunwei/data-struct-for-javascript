/*
 * @Description: 岛屿问题算法挑战
 * @Author: 郭军伟
 * @Date: 2020-07-01 20:33:24
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-07-01 20:39:35
 */

let grid = [
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
function count(grid, i = 0, j = 0) {
  let count = 0;
  let m = 4,
    n = 5;
  while (i <= 4 && j <= 5) {
    if (grid[i][j] == 1) {
      i++;
    } else {
    }
  }
}
