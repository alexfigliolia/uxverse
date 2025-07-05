import { use, useEffect } from "react";
import { NotificationsContext } from "Layouts/InApp";
import { LocationError, Permission } from "Tools/GPSLocation";

export const useGPSNotifications = (
  permission: Permission,
  locationError: LocationError,
) => {
  const { stack } = use(NotificationsContext);

  useEffect(() => {
    if (permission === "DENIED") {
      stack.push({
        type: "INFO",
        message:
          "To display your surrounding neighborhood, enable location services in your device settings",
      });
    } else if (permission === "UNAVAILABLE") {
      stack.push({
        type: "INFO",
        message:
          "Your device does not support GPS based locations. To view your surrounding neighborhood, try the Visitor App on a device with GPS",
      });
    }
  }, [permission, stack]);

  useEffect(() => {
    if (locationError === "UNAVAILABLE") {
      stack.push({
        type: "INFO",
        message:
          "We cannot seem to find your current location. Please try again",
      });
    }
  }, [locationError, stack]);
};
