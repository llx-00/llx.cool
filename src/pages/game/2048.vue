<script setup lang="ts">
  import lodash from "lodash";

  type TypeState = "ready" | "playing" | "end";
  type TypeDirection = "LEFT" | "RIGHT" | "UP" | "DOWN";
  type TypePoint = { x: number; y: number };

  const state = ref<TypeState>("ready");
  const score = ref<number>(0);
  const topScore = ref<number>(0);
  const replayBtnShow = ref<boolean>(false);
  const matrix = ref<number[][]>(getMatrix()!);
  const touchesPoints = ref<TypePoint[]>([]);
  const vacancy = ref<number>(14);
  const moveLock = ref<boolean>(false);

  watchEffect(() => {
    if (score.value > topScore.value) {
      topScore.value = score.value;
    }

    if (state.value === "end") {
      replayBtnShow.value = true;
    }
  });
  watch([topScore], () => {
    localStorage.setItem("game-2048-topScore", topScore.value.toString());
  });
  watch([matrix], () => {
    const _vacancy = lodash.flattenDeep(matrix.value).filter(it => !it).length;
    vacancy.value = _vacancy;
  });

  onMounted(() => {
    topScore.value = parseInt(
      localStorage.getItem("game-2048-topScore") || "0"
    );
    initGame();
    document.body.addEventListener("keydown", keydownHandler);
  });
  onUnmounted(() => {
    document.body.removeEventListener("keydown", keydownHandler);
  });

  function initGame() {
    state.value = "ready";
    matrix.value = getMatrix()!;
    replayBtnShow.value = false;
  }

  function touchmoveHandler(e: TouchEvent) {
    if (touchesPoints.value.length) {
      touchesPoints.value[1] = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else {
      touchesPoints.value.push({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  }
  function touchendHandler(e: TouchEvent) {
    if (touchesPoints.value.length === 2) {
      const startPoint = touchesPoints.value[0];
      const endPoint = touchesPoints.value[1];
      const direction = TouthPoints2Direction(startPoint, endPoint);
      move(direction);
    }
    touchesPoints.value = [];
  }
  function TouthPoints2Direction(startPoint: TypePoint, lastPoint: TypePoint) {
    const diffX = lastPoint.x - startPoint.x;
    const diffY = lastPoint.y - startPoint.y;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) return "RIGHT";
      else return "LEFT";
    } else {
      if (diffY > 0) return "DOWN";
      else return "UP";
    }
  }
  function keydownHandler(e: KeyboardEvent) {
    const key = e.key;

    switch (key) {
      case "w":
      case "ArrowUp":
        move("UP");
        break;
      case "s":
      case "ArrowDown":
        move("DOWN");
        break;
      case "a":
      case "ArrowLeft":
        move("LEFT");
        break;
      case "d":
      case "ArrowRight":
        move("RIGHT");
        break;
      case "r":
        initGame();
        break;
    }
  }

  function move(direction: TypeDirection) {
    if (state.value === "ready" || state.value === "playing") {
      let movedRes: { moved: boolean; _matrix: number[][] } | null = null;
      if (moveLock.value === false) {
        switch (direction) {
          case "RIGHT":
            movedRes = moveRIGHT(matrix.value);
            break;
          case "LEFT":
            movedRes = moveLEFT(matrix.value);
            break;
          case "UP":
            movedRes = moveUP(matrix.value);
            break;
          case "DOWN":
            movedRes = moveDOWN(matrix.value);
            break;
        }
      }

      if (movedRes?.moved) {
        state.value = "playing";
        matrix.value = movedRes._matrix;
        moveLock.value = true;

        setTimeout(() => {
          addNum();
          moveLock.value = false;

          const nextMoved = moveCheck();
          if (!nextMoved) state.value = "end";
        }, 200);
      } else {
        const nextMoved = moveCheck();
        if (!nextMoved) state.value = "end";
      }
    }
  }
  // 主要实现 左右移动，上下移动等价于旋转90度后左右移动
  function moveRIGHT(matrix: number[][]) {
    let moved = false;

    const _matrix: number[][] = [];
    matrix.forEach(row => {
      let _row = row.filter(it => it);

      for (let i = _row.length - 1; i > 0; i--) {
        if (_row[i] == _row[i - 1]) {
          moved = true;
          // 与下一个相同，合并该项，下一项清零并跳过
          _row[i] += _row[i];
          score.value += _row[i];
          _row[--i] = 0;
        }
      }
      _row = _row.filter(it => it); // 去除被清零跳过的项
      _row = new Array(4 - _row.length).fill(0).concat(_row); // 左边空隙补0

      // 若未合并，也有可能平移过 [2,4,0,0] -> [0,0,2,4]
      if (+row.join("") != +_row.join("")) {
        moved = true;
        _matrix.push(_row);
      } else _matrix.push(row);
    });

    return { moved, _matrix };
  }
  function moveLEFT(matrix: number[][]) {
    let moved = false;

    const _matrix: number[][] = [];
    matrix.forEach(row => {
      let _row = row.filter(it => it);

      // 合并相同
      for (let i = 0; i < _row.length - 1; i++) {
        if (_row[i] == _row[i + 1]) {
          moved = true;
          // 与下一个相同，合并该项，下一项清零并跳过
          _row[i] += _row[i];
          score.value += _row[i];
          _row[++i] = 0;
        }
      }
      _row = _row.filter(it => it); // 去除被清零跳过的项
      _row = _row.concat(new Array(4 - _row.length).fill(0)); // 右边空隙补0

      // 若未合并，也有可能平移过 [0,0,2,4] -> [2,4,0,0]
      if (+row.join("") != +_row.join("")) {
        moved = true;
        _matrix.push(_row);
      } else _matrix.push(row);
    });

    return { moved, _matrix };
  }
  function moveUP(matrix: number[][]) {
    const { moved, _matrix } = moveRIGHT(rotateMatrix(matrix));

    // 右旋三次复位 😓 懒得写左旋了
    return {
      moved,
      _matrix: moved
        ? rotateMatrix(rotateMatrix(rotateMatrix(_matrix)))
        : matrix,
    };
  }
  function moveDOWN(matrix: number[][]) {
    const { moved, _matrix } = moveLEFT(rotateMatrix(matrix));

    // 右旋三次复位 😓 懒得写左旋了
    return {
      moved,
      _matrix: moved
        ? rotateMatrix(rotateMatrix(rotateMatrix(_matrix)))
        : matrix,
    };
  }

  /**
   * 检测各方向是否可合并
   */
  function moveCheck() {
    return (
      moveRIGHT(matrix.value).moved ||
      moveLEFT(matrix.value).moved ||
      moveUP(matrix.value).moved ||
      moveDOWN(matrix.value).moved
    );
  }

  function addNum() {
    if (vacancy.value) {
      const zorePoints: { i: number; j: number }[] = [];
      for (let i = 0; i < matrix.value.length; i++) {
        for (let j = 0; j < matrix.value[i].length; j++) {
          if (matrix.value[i][j] == 0) {
            zorePoints.push({ i, j });
          }
        }
      }
      const { i, j } = zorePoints[lodash.random(vacancy.value - 1)];
      const _matrix = lodash.cloneDeep(matrix.value);

      _matrix[i][j] = getRandom2or4();
      matrix.value = _matrix;
    }
  }
</script>

<template>
  <div
    class="game-container"
    @click="e => e.stopPropagation()"
    @mousemove="e => e.stopPropagation()"
    @touchmove="e => e.stopPropagation()"
  >
    <div class="title">
      <span>Top: {{ topScore }}</span>
      <span>Score: {{ score }}</span>
    </div>
    <div
      class="main"
      @touchmove="touchmoveHandler"
      @touchend="touchendHandler"
    >
      <div
        class="row"
        v-for="_ in 4"
      >
        <div
          class="col"
          v-for="_ in 4"
        ></div>
      </div>
      <template v-for="(row, rowIdx) in matrix">
        <template v-for="(col, colIdx) of row">
          <div
            v-if="col"
            class="num"
            :class="`num${col}`"
            :p-y="rowIdx"
            :p-x="colIdx"
          >
            {{ col }}
          </div>
        </template>
      </template>
    </div>
  </div>
  <div
    class="btn-container"
    v-show="replayBtnShow"
  >
    <button
      class="btn-replay"
      @click="initGame"
    >
      <i i-lucide-rotate-cw /> Replay
    </button>
  </div>
  <h3 class="text-center">
    <a
      target="_blank"
      href="https://github.com/gabrielecirulli/2048"
      class="underline underline-dotted text-base op50"
    >
      由 Gabriele Cirulli 发明
    </a>
  </h3>
</template>

<style lang="scss" scoped>
  @use "sass:math";
  @import "~/styles/variables-2048.scss";

  .game-container {
    font-size: calc($font-size1 / 2);
    font-family: "DM Mono", ui-monospace, SFMono-Regular, Menlo, Monaco,
      Consolas, "Liberation Mono", "Courier New", monospace;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 0.5rem;
    gap: 0.5rem;

    > .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc($cell-size * 4 + $grp * 8);
      margin: $grp 0;

      user-select: none;
    }

    > .main {
      user-select: none;
      color: $color-font;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $bgc-main;
      border-radius: $cell-radius;
      padding: $grp;

      position: relative;

      // &.dark {
      //   >.row>.col {
      //     background-color: $bgc-null-dark;
      //   }
      // }

      > .row {
        display: flex;
        justify-content: center;
        align-items: center;

        > .col {
          border-radius: $cell-radius;
          background-color: $bgc-null;
          width: $cell-size;
          height: $cell-size;
          margin: $grp;
        }
      }

      > .num {
        width: $cell-size;
        height: $cell-size;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size1;
        border-radius: $cell-radius;

        position: absolute;

        @for $i from 0 through 3 {
          &[p-x="#{$i}"] {
            left: calc($cell-size * $i + $grp * 2 * (1 + $i));
          }

          &[p-y="#{$i}"] {
            top: calc($cell-size * $i + $grp * 2 * (1 + $i));
          }
        }

        @for $i from 1 through 14 {
          $power: math.pow(2, $i);

          &.num#{$power} {
            background-color: nth($bgc-numbers, $i);
          }
        }

        // &.dark {
        //   @for $i from 1 through 14 {
        //     $power: math.pow(2, $i);

        //     &.num#{$power} {
        //       background-color: nth($bgc-numbers-dark, $i);
        //     }
        //   }
        // }

        &.num1024,
        &.num2048,
        &.num4096,
        &.num8192 {
          font-size: $font-size2;
        }

        &.num16384 {
          font-size: $font-size3;
        }
      }
    }
  }

  .btn-container {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);

    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    > button.btn-replay {
      user-select: none;
      border-radius: $cell-radius;
      margin-bottom: $grp * 2;
      background-color: $bgc-null;

      border: none;
      outline: none;
      font-size: 2rem;
      padding: 2rem;
      margin: 0;

      &:hover {
        background-color: $bgc-main;
      }

      &:active {
        background-color: $bgc-null;
      }

      // &.dark {
      //   &:hover {
      //     background-color: $bgc-main-dark;
      //   }

      //   &:active {
      //     background-color: $bgc-null-dark;
      //   }
      // }
    }
  }
</style>
