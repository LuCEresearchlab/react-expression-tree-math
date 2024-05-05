import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { Label, Tag, Text } from "react-konva";
import Konva from "konva";

function NodeTypeValue({
  nodeWidth,
  isTypeLabelHighlighted,
  isValueLabelHighlighted,
  typeText,
  typeSuperscriptText,
  valueText,
  fontFamily,
  fontSize,
  unitFontSizeWidth,
  strokeWidth,
  radius,
  padding,
  textTypeColor,
  textValueColor,
  fillTypeColor,
  fillValueColor,
  fillTypeHighlightColor,
  fillValueHighlightColor,
  strokeColor,
  pointerDirection,
  pointerWidth,
  pointerHeight,
}) {
  const charWidth = fontSize * unitFontSizeWidth;
  const superscriptCharWidth = fontSize * 0.6 * unitFontSizeWidth;

  const typeWidth = useMemo(
    () => typeText.length * charWidth,
    [typeText, charWidth],
  );

  const typeSuperscriptWidth = useMemo(
    () => typeSuperscriptText.length * superscriptCharWidth,
    [typeSuperscriptText, superscriptCharWidth],
  );

  const valueWidth = useMemo(
    () => valueText.length * charWidth,
    [valueText, charWidth],
  );

  const labelWidth = useMemo(() => {
    if (typeText && valueText) {
      return valueWidth + typeWidth + typeSuperscriptWidth + 4 * padding;
    }
    if (typeText) {
      return typeWidth + typeSuperscriptWidth + 2 * padding;
    }
    if (valueText) {
      return valueWidth + 2 * padding;
    }
    return 0;
  }, [valueWidth, typeWidth, typeSuperscriptWidth, padding]);

  const typeX = useMemo(() => {
    const middle = (nodeWidth - labelWidth) / 2;
    if (typeText && valueText) {
      return valueWidth + 2 * padding + middle;
    }
    return middle;
  }, [nodeWidth, valueWidth, labelWidth, padding]);
  const typeY = useMemo(() => -(padding + fontSize) * 2, [fontSize]);

  const typeSuperscriptX = useMemo(() => {
    const middle = (nodeWidth - labelWidth) / 2;
    if (typeText && valueText) {
      return valueWidth + typeWidth + 3 * padding + middle;
    }
    return typeWidth + padding + middle;
  }, [nodeWidth, valueWidth, labelWidth, padding]);
  const typeSuperscriptY = useMemo(() => -(padding + fontSize) * 2, [fontSize]);

  const valueX = useMemo(() => {
    const middle = (nodeWidth - labelWidth) / 2;
    return middle;
  }, [nodeWidth, labelWidth]);
  const valueY = useMemo(() => -(padding + fontSize) * 2, [fontSize]);

  const pointerX = useMemo(() => nodeWidth / 2, [nodeWidth]);
  const pointerY = useMemo(() => -fontSize, [fontSize]);

  const typeCornerRadius = useMemo(() => {
    if (typeText && valueText && typeSuperscriptText) {
      return [0, 0, 0, 0];
    } else if (typeText && valueText) {
      return [0, radius, radius, 0];
    } else {
      return [radius, radius, radius, radius];
    }
  }, [typeText, valueText, typeSuperscriptText]);

  const typeSuperscriptCornerRadius = useMemo(() => {
    return [0, radius, radius, 0];
  }, [typeSuperscriptText]);

  const valueCornerRadius = useMemo(() => {
    if (typeText && valueText) {
      return [radius, 0, 0, radius];
    }
    return [radius, radius, radius, radius];
  }, [typeText, valueText]);

  const computeColor = useCallback(
    (defaultColor, highlightColor, isHighlighted) => {
      if (isHighlighted) {
        // isHighlighted can be either boolean or a string, if it is a boolean
        // we return highlight color
        if (isHighlighted === true) {
          return highlightColor;
        }
        // otherwise we return itself
        return isHighlighted;
      }

      return defaultColor;
    },
  );

  return (
    <>
      {typeText !== "" || valueText !== "" ? (
        <Label x={pointerX} y={pointerY}>
          <Tag
            fill='black'
            stroke='black'
            pointerDirection={pointerDirection}
            pointerWidth={pointerWidth}
            pointerHeight={pointerHeight}
          />
        </Label>
      ) : null}
      {typeText !== "" ? (
        <>
          <Label x={typeX} y={typeY}>
            <Tag
              fill={computeColor(
                fillTypeColor,
                fillTypeHighlightColor,
                isTypeLabelHighlighted,
              )}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              cornerRadius={typeCornerRadius}
            />
            <Text
              fill={textTypeColor}
              fontFamily={fontFamily}
              fontSize={fontSize}
              text={typeText}
              padding={padding}
            />
          </Label>
          <Label x={typeSuperscriptX} y={typeSuperscriptY}>
            <Tag
              fill={computeColor(
                fillTypeColor,
                fillTypeHighlightColor,
                isTypeLabelHighlighted,
              )}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              cornerRadius={typeSuperscriptCornerRadius}
            />
            <Text
              fill={textValueColor}
              fontFamily={fontFamily}
              fontSize={fontSize * 0.6}
              text={typeSuperscriptText}
              verticalAlign='top'
              padding={typeSuperscriptText ? 3 : 0}
              // Only way to have the superscript label of the same height as the type and value labels is to manually set the superscript text height
              height={fontSize + 2 * padding}
            />
          </Label>
        </>
      ) : null}
      {valueText !== "" ? (
        <Label x={valueX} y={valueY}>
          <Tag
            fill={computeColor(
              fillValueColor,
              fillValueHighlightColor,
              isValueLabelHighlighted,
            )}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            cornerRadius={valueCornerRadius}
          />
          <Text
            fill={textValueColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            text={valueText}
            padding={padding}
          />
        </Label>
      ) : null}
    </>
  );
}

NodeTypeValue.propTypes = {
  nodeWidth: PropTypes.number.isRequired,
  isTypeLabelHighlighted: PropTypes.oneOf(PropTypes.bool, PropTypes.string),
  isValueLabelHighlighted: PropTypes.oneOf(PropTypes.bool, PropTypes.string),
  typeText: PropTypes.string,
  typeSuperscriptText: PropTypes.string,
  valueText: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  unitFontSizeWidth: PropTypes.number,
  strokeWidth: PropTypes.number,
  radius: PropTypes.number,
  padding: PropTypes.number,
  textTypeColor: PropTypes.string,
  textValueColor: PropTypes.string,
  fillTypeColor: PropTypes.string,
  fillValueColor: PropTypes.string,
  fillTypeHighlightColor: PropTypes.string,
  fillValueHighlightColor: PropTypes.string,
  strokeColor: PropTypes.string,
  pointerDirection: PropTypes.string,
  pointerWidth: PropTypes.number,
  pointerHeight: PropTypes.number,
};

NodeTypeValue.defaultProps = {
  isTypeLabelHighlighted: false,
  isValueLabelHighlighted: false,
  typeText: "",
  typeSuperscriptText: "",
  valueText: "",
  fontFamily: "Roboto Mono, Courier",
  fontSize: 12,
  unitFontSizeWidth: 0.60009765625,
  fillTypeColor: "#3f51b5",
  fillValueColor: "#000000",
  fillTypeHighlightColor: "#7f51b5",
  fillValueHighlightColor: "#b2a3c4",
  textTypeColor: "#ffffff",
  textValueColor: "#ffffff",
  strokeColor: "#3f51b5",
  strokeWidth: 0,
  pointerDirection: "down",
  pointerWidth: 3,
  pointerHeight: 4,
  radius: 5,
  padding: 5,
};

export default NodeTypeValue;
