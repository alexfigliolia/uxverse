import { INotificationType } from "../NotificationStack";

export class Controller {
  public static defaultTitle(type: INotificationType) {
    switch (type) {
      case "WARNING":
        return "Hey There!";
      case "ERROR":
        return "Whoops!";
      case "SUCCESS":
        return "Nice One!";
      case "INFO":
        return "Hey There!";
      default:
        return null;
    }
  }
}
