import {
  use,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { PostActions } from "Components/PostActions";
import { PostHeading } from "Components/PostHeading";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { useScrollHeight } from "Hooks/useScrollHeight";
import { ChevronDown } from "Icons/ChevronDown";
import { ReplyIcon } from "Icons/Reply";
import { Callback } from "Types/Generics";
import { ReplyContext } from "../ReplyContext";
import "./styles.scss";

export const Comment = ({
  id,
  comment,
  level = 0,
  setSize = 0,
  replies = [],
  expanded = false,
  openReplies,
  closeReplies,
  onClickReply,
  visible: _visible = true,
}: Props) => {
  const paragraphID = useId();
  const node = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(_visible);
  const { commentId, toggle } = use(ReplyContext);
  const [container, scrollHeight] = useScrollHeight<
    HTMLLIElement,
    number | "unset"
  >(_visible ? "unset" : 0);

  const ref = useMergedRefs(container, node);

  const classes = useClassNames("comment", {
    visible,
    expanded,
    active: visible && commentId === id,
  });

  useEffect(() => {
    setTimeout(() => setVisible(_visible), 0);
  }, [_visible]);

  const onClickComments = useMemo(() => {
    if (!replies.length) {
      return undefined;
    }
    return expanded ? closeReplies : openReplies;
  }, [replies.length, expanded, closeReplies, openReplies]);

  const onReply = useCallback(() => {
    toggle.open(id);
    onClickReply?.(node.current);
  }, [toggle, onClickReply, id]);

  const ariaLabel = useMemo(() => "Comment by username", []);

  return (
    <li
      ref={ref}
      role="treeitem"
      className={classes}
      aria-level={level + 1}
      aria-setsize={setSize}
      aria-hidden={!visible}
      aria-expanded={expanded}
      aria-label={ariaLabel}
      aria-describedby={paragraphID}
      aria-selected={commentId === id}
      style={{
        "--level": level,
        "--max-height":
          scrollHeight === "unset" ? scrollHeight : `${scrollHeight}px`,
      }}>
      <article>
        <PostHeading />
        <p id={paragraphID}>{comment}</p>
        <PostActions
          likes={3}
          conditionalComments
          commentType="Reply"
          commentTypePlural="Replies"
          comments={replies.length}
          onClickComments={onClickComments}>
          {!!replies.length && <ChevronDown />}
          <button className="reaction-button reply-button" onClick={onReply}>
            <div className="icons-reply">
              <ReplyIcon aria-hidden />
              <ReplyIcon aria-hidden />
            </div>
            <span>Reply</span>
          </button>
        </PostActions>
      </article>
    </li>
  );
};

export interface Props {
  id: number;
  visible?: boolean;
  level?: number;
  setSize?: number;
  comment: string;
  expanded?: boolean;
  replies?: Reply[];
  openReplies: Callback;
  closeReplies: Callback;
  onClickReply?: Callback<[HTMLLIElement | null]>;
}

export type Reply = Omit<Props, "openReplies" | "closeReplies">;
