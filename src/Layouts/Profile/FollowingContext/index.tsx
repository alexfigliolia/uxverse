import { useParams } from "next/navigation";
import { createContext, use, useCallback, useMemo, useState } from "react";
import { Callback } from "@figliolia/event-emitter";
import { ModalToggle, useModalToggle } from "@figliolia/modal-stack";
import { useTimeout } from "@figliolia/react-hooks";
import { TabsContext, TabsContextProvider } from "Components/Tabs";
import { OptionalChildren } from "Types/React";

export const FollowingContext = createContext<IFollowingContext>({
  visible: false,
  editable: false,
  toggle: new ModalToggle(
    (_: "following" | "followers") => {},
    () => {},
  ),
  followers: [],
  following: [],
  searchFollowers: () => {},
  searchFollowing: () => {},
});

const TABS = [
  {
    value: "followers",
    label: "Followers",
  },
  {
    value: "following",
    label: "Following",
  },
];

export const FollowingContextProvider = ({ children }: OptionalChildren) => {
  return (
    <TabsContextProvider options={TABS}>
      <FollowingProvider>{children}</FollowingProvider>
    </TabsContextProvider>
  );
};

function FollowingProvider({ children }: OptionalChildren) {
  const timeout = useTimeout();
  const { setActiveTab } = use(TabsContext);
  const [visible, setOpen] = useState(false);
  const { handle } = useParams<{ handle?: string }>();
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [following, setFollowing] = useState<IUser[]>([]);

  const searchFollowers = useCallback((_: string) => {}, []);

  const searchFollowing = useCallback((_: string) => {}, []);

  const open = useCallback(
    (key: "following" | "followers") => {
      setFollowers(generateFollowers());
      setFollowing(generateFollowers());
      setActiveTab(key);
      setOpen(true);
    },
    [setActiveTab],
  );

  const close = useCallback(() => {
    setOpen(false);
    timeout.execute(() => {
      setFollowers([]);
      setFollowing([]);
    }, 300);
  }, [timeout]);

  const toggle = useModalToggle(open, close);

  const value = useMemo(
    () => ({
      visible,
      toggle,
      editable: !handle,
      followers,
      following,
      searchFollowers,
      searchFollowing,
    }),
    [
      visible,
      toggle,
      handle,
      followers,
      following,
      searchFollowers,
      searchFollowing,
    ],
  );

  return <FollowingContext value={value}>{children}</FollowingContext>;
}

export interface IUser {
  id: number;
  name: string;
  avatar: string;
  handle: string;
}

interface IFollowingContext {
  visible: boolean;
  editable: boolean;
  toggle: ModalToggle<[key: "following" | "followers"]>;
  followers: IUser[];
  following: IUser[];
  searchFollowers: Callback<[string]>;
  searchFollowing: Callback<[string]>;
}

function generateFollowers() {
  const names = [
    "Alex",
    "Erica",
    "Steve",
    "George",
    "Dana",
    "Alex",
    "Erica",
    "Steve",
    "George",
    "Dana",
    "Alex",
    "Erica",
    "Steve",
    "George",
    "Dana",
    "Alex",
    "Erica",
    "Steve",
    "George",
    "Dana",
  ];
  const slice = names.slice(0, Math.random() * names.length);
  return slice.map((name, i) => ({
    id: i + 1,
    name: `${name} Figliolia`,
    avatar: "/profile.jpg",
    handle: `@${name.toLowerCase()}figliolia`,
  }));
}
