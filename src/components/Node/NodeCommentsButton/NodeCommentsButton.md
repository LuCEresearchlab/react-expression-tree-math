Icon for nodes with existing comment threads

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import Node from "../Node";
import createPositionUtils from "../../../utils/position";
import useContainerWidthOnWindowResize from "../../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeLabelPiecesXCoordinatePositions } =
  createPositionUtils(24, "Roboto Mono, Courier", "{{}}", 20, 12, 12);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 75;
const labelPieces = ["Test"];
const labelPiecesPosition = computeLabelPiecesXCoordinatePositions(labelPieces);

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id={"n1"}
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        positionX={25}
        positionY={15}
        connectorPlaceholder={"{{}}"}
        placeholderWidth={20}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(false, labelPieces)}
        nodeHeight={48}
        editableDelete={true}
        isFullDisabled={false}
        commentThreads={[null, null, null]}
      />
    </Layer>
  </Stage>
</div>;
```

Icon for selected nodes without existing comment threads

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import Node from "../Node";
import createPositionUtils from "../../../utils/position";
import useContainerWidthOnWindowResize from "../../../hooks/useContainerWidthOnWindowResize";

const { computeNodeWidth, computeLabelPiecesXCoordinatePositions } =
  createPositionUtils(24, "Roboto Mono, Courier", "{{}}", 20, 12, 12);

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 75;
const labelPieces = ["Test"];
const labelPiecesPosition = computeLabelPiecesXCoordinatePositions(labelPieces);

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Node
        id={"n1"}
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        positionX={25}
        positionY={15}
        connectorPlaceholder={"{{}}"}
        placeholderWidth={20}
        stageWidth={width}
        stageHeight={height}
        nodeWidth={computeNodeWidth(false, labelPieces)}
        nodeHeight={48}
        editableDelete={true}
        isFullDisabled={false}
        isSelected={true}
        showDeleteButton={false}
        editableDelete={false}
        commentThreads={[]}
      />
    </Layer>
  </Stage>
</div>;
```
