import { PAGE_PWD } from "~/config"

export const globalStore = reactive({
  showHiddenPage: localStorage.getItem("PAGE_PWD") === PAGE_PWD,
})
