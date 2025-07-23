import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { GeoCoordinate } from "Types/Geolocation";
import { OptionalChildren } from "Types/React";

export const MapLayoutContext = createContext<IMapLayoutContext>({
  location: undefined,
  setLocation: () => {},
});

export const MapLayoutProvider = ({ children }: OptionalChildren) => {
  const [location, setLocation] = useState<GeoCoordinate>();
  const value = useMemo(() => ({ location, setLocation }), [location]);
  return <MapLayoutContext value={value}>{children}</MapLayoutContext>;
};

export interface IMapLayoutContext {
  location: GeoCoordinate | undefined;
  setLocation: Dispatch<SetStateAction<GeoCoordinate | undefined>>;
}
