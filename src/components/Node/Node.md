```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import createPositionUtils from "../../utils/position";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeLabelPiecesXCoordinatePositions } =
  createPositionUtils(24, "Roboto Mono, Courier", "{{}}", 20, 12, 12);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 120;
const labelPieces = ["Hello ", "{{}}", " World"];
const labelPiecesPosition = computeLabelPiecesXCoordinatePositions(labelPieces);

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id='n1'
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        positionX={25}
        positionY={50}
        typeText={"String"}
        valueText={'"Test"'}
        connectorPlaceholder={"{{}}"}
        placeholderWidth={20}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(false, labelPieces)}
        nodeHeight={48}
        isFullDisabled={true}
      />
    </Layer>
  </Stage>
</div>;
```

Default highlight colors

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import createPositionUtils from "../../utils/position";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeLabelPiecesXCoordinatePositions } =
  createPositionUtils(24, "Roboto Mono, Courier", "{{}}", 20, 12, 12);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 120;
const labelPieces = ["Hello ", "{{}}", " World"];
const labelPiecesPosition = computeLabelPiecesXCoordinatePositions(labelPieces);

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id='n1'
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        positionX={25}
        positionY={50}
        typeText={"String"}
        valueText={'"Test"'}
        isHighlighted={true}
        isTypeLabelHighlighted={true}
        isValueLabelHighlighted={true}
        connectorPlaceholder={"{{}}"}
        placeholderWidth={20}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(false, labelPieces)}
        nodeHeight={48}
        isFullDisabled={true}
      />
    </Layer>
  </Stage>
</div>;
```

Custom highlight colors

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import createPositionUtils from "../../utils/position";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeLabelPiecesXCoordinatePositions } =
  createPositionUtils(24, "Roboto Mono, Courier", "{{}}", 20, 12, 12);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 120;
const labelPieces = ["Hello ", "{{}}", " World"];
const labelPiecesPosition = computeLabelPiecesXCoordinatePositions(labelPieces);

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id='n1'
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        positionX={25}
        positionY={50}
        typeText={"String"}
        valueText={'"Test"'}
        isHighlighted={"#ff5555"}
        isTypeLabelHighlighted={"#55aa55"}
        isValueLabelHighlighted={"#5555ff"}
        connectorPlaceholder={"{{}}"}
        placeholderWidth={20}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(false, labelPieces)}
        nodeHeight={48}
        isFullDisabled={true}
      />
    </Layer>
  </Stage>
</div>;
```

Visibility set to semi-transparent

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import createPositionUtils from "../../utils/position";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeLabelPiecesXCoordinatePositions } =
  createPositionUtils(24, "Roboto Mono, Courier", "{{}}", 20, 12, 12);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 120;
const labelPieces = ["Hello ", "{{}}", " World"];
const labelPiecesPosition = computeLabelPiecesXCoordinatePositions(labelPieces);

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id='n1'
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        positionX={25}
        positionY={50}
        typeText={"String"}
        valueText={'"Test"'}
        connectorPlaceholder={"{{}}"}
        placeholderWidth={20}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(false, labelPieces)}
        nodeHeight={48}
        isFullDisabled={true}
        visibility={1}
      />
    </Layer>
  </Stage>
</div>;
```

Math node

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import createPositionUtils from "../../utils/position";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeNodeHeight } = createPositionUtils(
  24,
  "Roboto Mono, Courier",
  "{{}}",
  20,
  12,
  12,
);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 180;
const mathPieces = [
  { type: "hole", x: 30, width: 14, y: 12, height: 14 },
  { type: "text", x: 25, y: 30, fontSize: 36, value: "Σ" },
  { type: "hole", x: 12, width: 14, y: 65, height: 14 },
  { type: "text", x: 30, y: 60, fontSize: 24, value: "=" },
  { type: "hole", x: 50, width: 14, y: 65, height: 14 },
  { type: "hole", x: 55, width: 16, y: 33, height: 24 },
];

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id='n1'
        labelPieces={[]}
        isMathNode={true}
        mathPieces={mathPieces}
        positionX={25}
        positionY={50}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(true, mathPieces)}
        nodeHeight={computeNodeHeight(true, mathPieces)}
        isFullDisabled={true}
      />
    </Layer>
  </Stage>
</div>;
```
