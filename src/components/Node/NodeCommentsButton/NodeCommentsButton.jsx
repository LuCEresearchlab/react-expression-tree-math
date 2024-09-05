import React, { useMemo } from "react";
import PropTypes from "prop-types";

import {
  Path,
  Text,
  Group,
  Circle,
  Rect,
  RegularPolygon,
  Line,
} from "react-konva";

function NodeCommentsButton({
  commentThreadsCount,
  isCommentsOpen,
  isSelected,
  setCommentsOpen,
  setCommentsClose,
  iconFillColor,
  iconBackgroundColor,
  iconStrokeColor,
  iconStrokeWidth,
  counterRadius,
  counterBackgroundColor,
  counterStrokeColor,
  counterStrokeWidth,
  counterTextColor,
  counterFontSize,
  counterFontFamily,
}) {
  // SVG paths source: @material-ui/icons/SpeakerNotes.js
  const commentsOnPaths =
    "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z";
  // SVG paths source: @material-ui/icons/SpeakerNotesOff.js
  const commentsOffPaths =
    "M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z";
  // SVG paths source: @material-ui/icons/AddComment.js
  const addCommentPaths =
    "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z";

  const pathData = useMemo(() => {
    if (commentThreadsCount === 0) {
      return addCommentPaths;
    } else if (isCommentsOpen && isSelected) {
      return commentsOffPaths;
    } else {
      return commentsOnPaths;
    }
  }, [commentThreadsCount, isCommentsOpen, isSelected]);

  const hasCommentThreads = useMemo(
    () => commentThreadsCount > 0,
    [commentThreadsCount],
  );

  const iconVisible = useMemo(
    () => hasCommentThreads || isSelected,
    [hasCommentThreads, isSelected],
  );

  const isRectBackgroundVisible = useMemo(
    () => !(isSelected && hasCommentThreads && isCommentsOpen),
    [isSelected, hasCommentThreads, isCommentsOpen],
  );

  // Specific name to find icons to hide/show when exporting editor state
  const groupName = useMemo(
    () =>
      hasCommentThreads
        ? "commentsButton"
        : isSelected
        ? "selectedAddCommentsButton"
        : "addCommentsButton",
    [hasCommentThreads, isSelected],
  );

  const onClickFunction = useMemo(
    () =>
      isSelected && hasCommentThreads && isCommentsOpen
        ? setCommentsClose
        : setCommentsOpen,
    [isSelected, hasCommentThreads, isCommentsOpen],
  );

  // Since icons Path have transparent backgrounds, fixed it with various shapes
  return (
    <Group
      visible={iconVisible}
      onClick={onClickFunction}
      onTap={onClickFunction}
      name={groupName}
    >
      {/* Main background rectangle behind add comment and open drawer icons*/}
      <Rect
        x={-8}
        y={-5}
        height={10}
        width={17}
        fill={iconBackgroundColor}
        visible={isRectBackgroundVisible}
      />
      {/* Triangle behind close drawer icon */}
      <RegularPolygon
        visible={!isRectBackgroundVisible}
        x={4}
        y={-2}
        sides={3}
        rotation={45}
        radius={7}
        fill={iconBackgroundColor}
      />
      {/* Triangle behind close drawer icon */}
      <RegularPolygon
        visible={!isRectBackgroundVisible}
        x={-4}
        y={2}
        sides={3}
        rotation={-5}
        radius={4}
        fill={iconBackgroundColor}
      />
      <Path
        x={-10}
        y={-9}
        data={pathData}
        fill={iconFillColor}
        // Flip the add comment icon horizontally
        scale={hasCommentThreads ? { x: 0.9, y: 0.9 } : { x: -0.9, y: 0.9 }}
        // Adjust x position after flipping icon
        offsetX={hasCommentThreads ? 0 : 24}
        stroke={iconStrokeColor}
        strokeWidth={iconStrokeWidth}
      />
      {/* Border line on close drawer icon */}
      <Line
        visible={!isRectBackgroundVisible}
        stroke={iconStrokeColor}
        strokeWidth={0.5}
        points={[0, -0.9, 2, 1]}
      />
      <Circle
        x={10}
        y={-6}
        visible={hasCommentThreads}
        radius={counterRadius}
        fill={counterBackgroundColor}
        stroke={counterStrokeColor}
        strokeWidth={counterStrokeWidth}
      />
      <Text
        x={8}
        y={-9}
        visible={hasCommentThreads}
        fill={counterTextColor}
        fontFamily={counterFontFamily}
        fontSize={counterFontSize}
        text={commentThreadsCount}
      />
    </Group>
  );
}

NodeCommentsButton.propTypes = {
  commentThreadsCount: PropTypes.number,
  isCommentsOpen: PropTypes.bool,
  isSelected: PropTypes.bool,
  iconFillColor: PropTypes.string,
  iconBackgroundColor: PropTypes.string,
  iconStrokeColor: PropTypes.string,
  iconStrokeWidth: PropTypes.number,
  counterBackgroundColor: PropTypes.string,
  counterStrokeColor: PropTypes.string,
  counterStrokeWidth: PropTypes.number,
  counterTextColor: PropTypes.string,
  counterFontSize: PropTypes.number,
  counterFontFamily: PropTypes.string,
};

NodeCommentsButton.defaultProps = {
  commentThreadsCount: undefined,
  isCommentsOpen: false,
  isSelected: false,
  iconFillColor: "#FF605C",
  iconBackgroundColor: "#ffffff",
  iconStrokeColor: "#000000",
  iconStrokeWidth: 0.5,
  counterRadius: 5,
  counterBackgroundColor: "#ffffff",
  counterStrokeColor: "#000000",
  counterStrokeWidth: 0.5,
  counterTextColor: "#000000",
  counterFontSize: 7,
  counterFontFamily: "Roboto Mono, Courier",
};

export default NodeCommentsButton;
