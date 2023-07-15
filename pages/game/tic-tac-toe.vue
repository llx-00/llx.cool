<script setup lang="ts">
  type TypeMap = {
    [row in number]: {
      [col in number]: null | boolean;
    };
  };

  const map = reactive<TypeMap>({
    1: { 1: null, 2: null, 3: null },
    2: { 1: null, 2: null, 3: null },
    3: { 1: null, 2: null, 3: null },
  });
  const steps = ref<{ i: number; j: number; v: boolean }[]>([]);
  const isWin = ref(false);
  const winner = ref<null | boolean>();

  const isRound = ref<boolean>(true);
  function onClick(i: number, j: number) {
    if (steps.value.length === 9 || isWin.value) {
      steps.value = [];
      isWin.value = false;
      winner.value = null;

      map[1] = { 1: null, 2: null, 3: null };
      map[2] = { 1: null, 2: null, 3: null };
      map[3] = { 1: null, 2: null, 3: null };
    } else {
      if (map[i][j] === null) {
        map[i][j] = isRound.value;
        steps.value.push({
          i,
          j,
          v: isRound.value,
        });

        if (checkWin()) {
          isWin.value = true;
          winner.value = isRound.value;
        } else {
          isWin.value = false;
          isRound.value = !isRound.value;
        }
      }
    }
  }
  function checkWin() {
    if (
      map[1][1] !== null &&
      map[1][1] === map[1][2] &&
      map[1][1] === map[1][3]
    )
      return true;
    if (
      map[2][1] !== null &&
      map[2][1] === map[2][2] &&
      map[2][1] === map[2][3]
    )
      return true;
    if (
      map[3][1] !== null &&
      map[3][1] === map[3][2] &&
      map[3][1] === map[3][3]
    )
      return true;

    if (
      map[1][1] !== null &&
      map[1][1] === map[2][1] &&
      map[1][1] === map[3][1]
    )
      return true;
    if (
      map[1][2] !== null &&
      map[1][2] === map[2][2] &&
      map[1][2] === map[3][2]
    )
      return true;
    if (
      map[1][3] !== null &&
      map[1][3] === map[2][3] &&
      map[1][3] === map[3][3]
    )
      return true;

    if (
      map[1][1] !== null &&
      map[1][1] === map[2][2] &&
      map[1][1] === map[3][3]
    )
      return true;
    if (
      map[1][3] !== null &&
      map[1][3] === map[2][2] &&
      map[1][3] === map[3][1]
    )
      return true;

    return false;
  }
</script>

<template>
  <div class="flex justify-center items-center mx-auto">
    <div>
      <div class="mb-8 flex justify-around items-center">
        <div h-16>
          <div mb-2>winner</div>
          <div
            class="flex justify-center items-center"
            v-show="typeof winner === 'boolean'"
          >
            <i
              v-if="winner"
              class="inline-block i-lucide-circle w-6 h-6"
            />
            <i
              v-else
              class="inline-block i-lucide-x w-8 h-8"
            />
          </div>
        </div>
        <div h-16>
          <div mb-2>player</div>
          <div class="flex justify-center items-center">
            <i
              v-if="isRound"
              class="inline-block i-lucide-circle w-6 h-6"
            />
            <i
              v-else
              class="inline-block i-lucide-x w-8 h-8"
            />
          </div>
        </div>
      </div>
      <template v-for="i in 3">
        <div flex>
          <template v-for="j in 3">
            <div
              class="inline-flex justify-center items-center cursor-pointer outline-none min-w-24 min-h-24"
              @click="() => onClick(i, j)"
            >
              <i
                v-show="map[i][j] === true"
                class="i-lucide-circle w-12 h-12"
              />
              <i
                v-show="map[i][j] === false"
                class="i-lucide-x w-16 h-16"
              />
            </div>
            <div
              v-show="j !== 3"
              b="2 gray solid"
            />
          </template>
        </div>
        <div
          v-show="i !== 3"
          b="2 gray solid"
        />
      </template>
    </div>
  </div>
</template>
