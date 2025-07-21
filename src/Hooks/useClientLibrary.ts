import { useEffect, useState } from "react";
import { Callback } from "@figliolia/event-emitter";
import { ClientLibrary } from "Tools/ClientLibrary";

export const useClientLibrary = <T>(loader: Callback<never[], Promise<T>>) => {
  const [library, setLibrary] = useState<ClientLibrary<T>>();

  useEffect(() => {
    let unmounting = false;
    const library = new ClientLibrary(loader());
    library.onLoad(() => {
      if (!unmounting) {
        setLibrary(library);
      }
    });
    return () => {
      unmounting = true;
      library.destroy();
    };
  }, [loader]);

  return library;
};
