Icon for edges with existing comment threads

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import useContainerWidthOnWindowResize from "../../../hooks/useContainerWidthOnWindowResize";
import Edge from "../Edge";

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 50;

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Edge
        id='e1'
        childX={25}
        childY={25}
        parentX={200}
        parentY={25}
        commentThreads={[null, null, null]}
      />
    </Layer>
  </Stage>
</div>;
```

Icon for selected edges without existing comment threads

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import useContainerWidthOnWindowResize from "../../../hooks/useContainerWidthOnWindowResize";
import Edge from "../Edge";

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 50;

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Edge
        id='e1'
        childX={25}
        childY={25}
        parentX={200}
        parentY={25}
        commentThreads={[]}
        isSelected={true}
      />
    </Layer>
  </Stage>
</div>;
```
