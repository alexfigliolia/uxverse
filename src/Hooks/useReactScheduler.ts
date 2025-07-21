import { useEffect, useSyncExternalStore } from "react";
import { useController } from "@figliolia/react-hooks";
import { TaskQueue } from "Tools/TaskQueue";

export const useReactScheduler = () => {
  const queue = useController(new TaskQueue());

  const tasks = useSyncExternalStore(
    queue.subscribe,
    queue.getSnapshot,
    queue.getSnapshot,
  );

  useEffect(() => {
    if (tasks.length) {
      return queue.flush();
    }
  }, [tasks, queue]);

  return queue.push;
};
