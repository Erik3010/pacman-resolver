import { defineStore } from "pinia";

export enum NotificationStatus {
  ERROR = "error",
  SUCCESS = "success",
}

interface RootState {
  isShow: boolean;
  status: NotificationStatus;
  title: string;
  subtitle: string | null;
  duration: number;
}

export const useNotification = defineStore("notification", {
  state: (): RootState => ({
    isShow: false,
    status: NotificationStatus.SUCCESS,
    title: "",
    subtitle: null,
    duration: 2000,
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

      setTimeout(() => this.hide(), duration ?? this.duration);
    },
    hide() {
      this.isShow = false;
    },
  },
});
