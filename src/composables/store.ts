export const globalStore = reactive({
  showHiddenPage: false,
})

export type TypeTargetTime = { title: string; date: string; top?: boolean }
export const TARGET_TIMES: TypeTargetTime[] = [
  // <span>距离{{ i.title }}，{{ i.date.isMinus ? "已过去" : "还有" }}</span>
  { title: "第一次💋", date: "2023/8/11 23:00:00", top: true },
  { title: "见闹闹", date: "2024/1/19 22:30:00", top: true },

  { title: "上海动物园", date: "2023/10/6 10:00:00" },
  { title: "长沙行", date: "2023/12/31 14:00:00" },
  { title: "上海海洋水族馆", date: "2024/1/21 9:00:00" },
  // { title: "绍兴行", date: "2023/12/30 6:00:00" },
]
