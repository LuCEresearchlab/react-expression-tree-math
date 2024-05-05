Default node label

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";
import createPositionUtils from "../../../utils/position";
import useContainerWidthOnWindowResize from "../../../hooks/useContainerWidthOnWindowResize";

const { computeLabelPiecesXCoordinatePositions } = createPositionUtils(
  24,
  "Roboto Mono, Courier",
  "{{}}",
  20,
  12,
  12,
);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 50;
const labelPieces = ["Hello ", "{{}}", "World"];

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Rect x={0} y={0} width={width} height={height} fill={"black"} />

      <NodeLabel
        nodeId={1}
        connectorPlaceholder={"{{}}"}
        labelPieces={labelPieces}
        labelPiecesPosition={computeLabelPiecesXCoordinatePositions(
          labelPieces,
        )}
        nodeHeight={50}
      />
    </Layer>
  </Stage>
</div>;
```

Math node label

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";
import createPositionUtils from "../../../utils/position";
import useContainerWidthOnWindowResize from "../../../hooks/useContainerWidthOnWindowResize";

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 70;
const mathPieces = [
  { type: "hole", x: 18, width: 14, y: 0, height: 14 },
  { type: "text", x: 13, y: 18, fontSize: 36, value: "Σ" },
  { type: "hole", x: 0, width: 14, y: 53, height: 14 },
  { type: "text", x: 18, y: 48, fontSize: 24, value: "=" },
  { type: "hole", x: 38, width: 14, y: 53, height: 14 },
  { type: "hole", x: 43, width: 16, y: 21, height: 24 },
];

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Rect x={0} y={0} width={width} height={height} fill={"black"} />

      <NodeLabel
        isMathNode={true}
        labelPieces={[]}
        mathPieces={mathPieces}
        nodeId={1}
      />
    </Layer>
  </Stage>
</div>;
```
