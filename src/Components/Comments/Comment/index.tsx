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
import { useScrollHeightObserver } from "Hooks/useScrollHeightObserver";
import { ChevronDown } from "Icons/ChevronDown";
import { ReplyIcon } from "Icons/Reply";
import { Callback } from "Types/Generics";
import { ReplyContext } from "../ReplyContext";
import { useQueryParamComment } from "./useQueryParamComment";
import "./styles.scss";

export const Comment = ({
  id,
  comment,
  level = 0,
  setSize = 0,
  replies = [],
  expanded = false,
  openParents,
  openReplies,
  closeReplies,
  onClickReply,
  visible: _visible = true,
}: Props) => {
  const paragraphID = useId();
  const node = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(_visible);
  const { commentId, toggle } = use(ReplyContext);
  const [container, scrollHeight] = useScrollHeightObserver<HTMLLIElement>(
    _visible ? 10000 : 0,
  );

  const ref = useMergedRefs(container, node);

  const classes = useClassNames("comment", {
    visible,
    expanded,
    active: visible && commentId === id,
  });

  useEffect(() => {
    setTimeout(() => setVisible(_visible), 0);
  }, [_visible]);

  const onQueryParamActivated = useCallback(() => {
    openParents();
    toggle.open(id);
    onClickReply?.(node.current, true);
  }, [openParents, onClickReply, toggle, id]);

  useQueryParamComment(id, onQueryParamActivated);

  const onClickComments = useMemo(() => {
    if (!replies.length) {
      return undefined;
    }
    return expanded ? closeReplies : openReplies;
  }, [replies.length, expanded, closeReplies, openReplies]);

  const onReply = useCallback(() => {
    toggle.open(id);
    onClickReply?.(node.current, false);
  }, [toggle, id, onClickReply]);

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
        "--max-height": `${scrollHeight}px`,
      }}>
      <article>
        <PostHeading />
        <p id={paragraphID}>{comment}</p>
        <PostActions
          likes={3}
          commentId={id}
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

export interface Props extends CommentEntry {
  visible?: boolean;
  level?: number;
  setSize?: number;
  expanded?: boolean;
  openReplies: Callback;
  closeReplies: Callback;
  openParents: Callback;
  onClickReply?: Callback<[HTMLLIElement | null, boolean | undefined]>;
}

interface CommentEntry {
  id: number;
  comment: string;
  replies?: CommentEntry[];
}
