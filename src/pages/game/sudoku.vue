<script setup lang="ts">
  import lodash from "lodash"

  const boardSize = 9
  const subgridSize = 3

  function generateSudokuBoard() {
    const board: number[][] = Array(boardSize)
      .fill(0)
      .map(() => Array(boardSize).fill(0))
    board[0] = lodash.shuffle(
      Array(boardSize)
        .fill(0)
        .map((_, index) => index + 1)
    )

    function isValid(num: number, row: number, col: number): boolean {
      // 检查行和列
      for (let i = 0; i < boardSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
          return false
        }
      }

      // 检查九宫格
      const subgridRowStart = Math.floor(row / subgridSize) * subgridSize
      const subgridColStart = Math.floor(col / subgridSize) * subgridSize

      for (let i = subgridRowStart; i < subgridRowStart + subgridSize; i++) {
        for (let j = subgridColStart; j < subgridColStart + subgridSize; j++) {
          if (board[i][j] === num) {
            return false
          }
        }
      }

      return true
    }

    function solve(row: number, col: number): boolean {
      if (row === boardSize - 1 && col === boardSize) {
        return true // 递归终止条件：已经填满了整个数独板
      }

      if (col === boardSize) {
        row++
        col = 0
      }

      if (board[row][col] > 0) {
        return solve(row, col + 1)
      }

      for (let num = 1; num <= boardSize; num++) {
        if (isValid(num, row, col)) {
          board[row][col] = num
          if (solve(row, col + 1)) {
            return true
          }
          board[row][col] = 0
        }
      }

      return false
    }

    // 开始填数
    solve(0, 0)

    const _map: { val?: number; canFill: boolean }[][] = []
    board.forEach(row => {
      const _row = row.map(i => {
        const _bool = Math.random() < 0.3

        return _bool
          ? {
              canFill: true,
            }
          : {
              val: i,
              canFill: false,
            }
      })
      _map.push(_row)
    })

    return _map
  }

  const initVal = generateSudokuBoard()
  devLog("initVal", initVal)
  const initMap = ref(initVal)
  const show = ref(true)

  function reload() {
    const newVal = generateSudokuBoard()
    show.value = false
    initMap.value = newVal
    mapIndex.value = undefined
    setTimeout(() => {
      initMap.value = newVal
      show.value = true
    })
  }

  function fillVal(val: number) {
    if (mapIndex.value !== undefined) {
      if (initMap.value[mapIndex.value.i][mapIndex.value.j].canFill) {
        initMap.value[mapIndex.value.i][mapIndex.value.j].val = val
        mapIndex.value = undefined
      }
    }
  }

  const mapIndex = ref<{ i: number; j: number }>()
  function setIndex(i: number, j: number) {
    if (initMap.value[i][j].canFill) {
      mapIndex.value = {
        i,
        j,
      }
    }
  }
</script>

<template>
  <h1>数独</h1>

  <div class="xy-center flex-col select-none gap-2 text-2xl">
    <nav class="max-w-400px flex justify-end items-center gap-4">
      <i
        class="i-lucide-refresh-ccw cursor-pointer"
        title="重置"
        @click="reload"
      />
    </nav>

    <table class="border-collapse font-mono">
      <colgroup
        v-for="i in 3"
        class="b-3 b-gray-500 b-solid dark:b-gray-400"
      >
        <col v-for="j in 3" />
      </colgroup>
      <tbody class="b-3 b-gray-500 b-solid dark:b-gray-400">
        <tr>
          <td
            v-for="i in 9"
            class="b-1 b-gray-500 b-solid dark:b-gray-400 text-center cursor-pointer outline-none min-w-8 min-h-8"
            :class="[mapIndex !== undefined ? 'bg-gray-5' : null]"
            @click="fillVal(i)"
          >
            {{ i }}
          </td>
        </tr>
      </tbody>
    </table>

    <table
      class="main border-collapse font-mono"
      :class="[show ? null : 'op-0']"
    >
      <colgroup
        v-for="i in 3"
        class="b-3 b-gray-500 b-solid dark:b-gray-400"
      >
        <col v-for="j in 3" />
      </colgroup>
      <tbody
        v-for="i in 3"
        class="b-3 b-gray-500 b-solid dark:b-gray-400"
      >
        <tr
          v-for="j in 3"
          class="hover:bg-gray-5"
        >
          <td
            v-for="k in 9"
            class="b-1 b-gray-500 b-solid dark:b-gray-400 text-center cursor-pointer min-w-8 min-h-8"
            :class="[
              initMap[(i - 1) * 3 + (j - 1)][k - 1].canFill
                ? 'text-green font-bold'
                : null,
              mapIndex?.i === (i - 1) * 3 + (j - 1) && mapIndex.j === k - 1
                ? 'bg-gray-7!'
                : null,
            ]"
            @click="setIndex((i - 1) * 3 + (j - 1), k - 1)"
          >
            {{ initMap[(i - 1) * 3 + (j - 1)][k - 1].val }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
  table {
    --un-bg-opacity: 1;
    --bgc: rgba(107, 114, 128, var(--un-bg-opacity));
    &.main {
      // 选中所在列
      &:has(td:nth-child(1):hover) td:nth-child(1),
      &:has(td:nth-child(2):hover) td:nth-child(2),
      &:has(td:nth-child(3):hover) td:nth-child(3),
      &:has(td:nth-child(4):hover) td:nth-child(4),
      &:has(td:nth-child(5):hover) td:nth-child(5),
      &:has(td:nth-child(6):hover) td:nth-child(6),
      &:has(td:nth-child(7):hover) td:nth-child(7),
      &:has(td:nth-child(8):hover) td:nth-child(8),
      &:has(td:nth-child(9):hover) td:nth-child(9) {
        background-color: var(--bgc);
      }

      // 选中所在的九宫格
      &:has(tbody:nth-of-type(1) td:nth-child(n + 1):nth-child(-n + 3):hover)
        tbody:nth-of-type(1)
        td:nth-child(n + 1):nth-child(-n + 3),
      &:has(tbody:nth-of-type(1) td:nth-child(n + 4):nth-child(-n + 6):hover)
        tbody:nth-of-type(1)
        td:nth-child(n + 4):nth-child(-n + 6),
      &:has(tbody:nth-of-type(1) td:nth-child(n + 7):nth-child(-n + 9):hover)
        tbody:nth-of-type(1)
        td:nth-child(n + 7):nth-child(-n + 9),
      &:has(tbody:nth-of-type(2) td:nth-child(n + 1):nth-child(-n + 3):hover)
        tbody:nth-of-type(2)
        td:nth-child(n + 1):nth-child(-n + 3),
      &:has(tbody:nth-of-type(2) td:nth-child(n + 4):nth-child(-n + 6):hover)
        tbody:nth-of-type(2)
        td:nth-child(n + 4):nth-child(-n + 6),
      &:has(tbody:nth-of-type(2) td:nth-child(n + 7):nth-child(-n + 9):hover)
        tbody:nth-of-type(2)
        td:nth-child(n + 7):nth-child(-n + 9),
      &:has(tbody:nth-of-type(3) td:nth-child(n + 1):nth-child(-n + 3):hover)
        tbody:nth-of-type(3)
        td:nth-child(n + 1):nth-child(-n + 3),
      &:has(tbody:nth-of-type(3) td:nth-child(n + 4):nth-child(-n + 6):hover)
        tbody:nth-of-type(3)
        td:nth-child(n + 4):nth-child(-n + 6),
      &:has(tbody:nth-of-type(3) td:nth-child(n + 7):nth-child(-n + 9):hover)
        tbody:nth-of-type(3)
        td:nth-child(n + 7):nth-child(-n + 9) {
        background-color: var(--bgc);
      }
    }
  }
</style>
