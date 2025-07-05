import { CheckCircleStroked } from "Icons/CheckCircle";
import { InfoStroked } from "Icons/Info";
import { WarningStroked } from "Icons/Warning";
import Variables from "Styles/Exports.module.scss";
import { INotificationType } from "../NotificationStack";

export class Controller {
  public static themeColor(type: INotificationType) {
    switch (type) {
      case "INFO":
      case "WARNING":
        return Variables.warningOrange;
      case "ERROR":
        return Variables.errorRed;
      case "SUCCESS":
        return Variables.successCyan;
      default:
        return null as never;
    }
  }

  public static themeGradient(type: INotificationType) {
    switch (type) {
      case "INFO":
      case "WARNING":
        return "url(#warning)";
      case "ERROR":
        return "url(#error)";
      case "SUCCESS":
        return "url(#success)";
      default:
        return null as never;
    }
  }

  public static getIcon(type: INotificationType) {
    switch (type) {
      case "WARNING":
        return WarningStroked;
      case "ERROR":
        return WarningStroked;
      case "SUCCESS":
        return CheckCircleStroked;
      case "INFO":
        return InfoStroked;
      default:
        return undefined as never;
    }
  }

  public static defaultTitle(type: INotificationType) {
    switch (type) {
      case "INFO":
      case "WARNING":
        return "Hey There!";
      case "ERROR":
        return "Whoops!";
      case "SUCCESS":
        return "Nice One!";
      default:
        return null as never;
    }
  }
}
