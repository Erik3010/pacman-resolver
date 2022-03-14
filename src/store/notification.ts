import { defineStore } from "pinia";

import { NotificationStatus } from "@/enums/NotificationStatus";

interface RootState {
  isShow: boolean;
  status: NotificationStatus;
  title: string;
  subtitle: string | null;
  duration: number;
  timerHandler: ReturnType<typeof setTimeout> | null;
}

export const useNotification = defineStore("notification", {
  state: (): RootState => ({
    isShow: false,
    status: NotificationStatus.SUCCESS,
    title: "",
    subtitle: null,
    duration: 2000,
    timerHandler: null,
  }),
  actions: {
    show({
      status,
      title,
      subtitle,
      duration,
    }: {
      status: NotificationStatus;
      title: string;
      subtitle?: string;
      duration?: number;
    }) {
      this.isShow = true;

      this.status = status;
      this.title = title;
      subtitle && (this.subtitle = subtitle);

      this.timerHandler = setTimeout(this.hide, duration ?? this.duration);
    },
    hide() {
      this.isShow = false;

      this.timerHandler && clearTimeout(this.timerHandler);
    },
  },
});
