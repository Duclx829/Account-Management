export interface INotification {
  notifyType: "success" | "error" | "warning",
  title: string,
  message: string
}
