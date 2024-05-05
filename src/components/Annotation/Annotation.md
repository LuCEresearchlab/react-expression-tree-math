Inline annotation with default color

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 50;

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Annotation
        id={"a1"}
        positionX={25}
        positionY={5}
        // annotationColor={annotations[id].color}
        annotationText={"This is an inline annotation with default color"}
        isFullDisabled={true}
        annotationWidth={530}
        annotationHeight={40}
      />
    </Layer>
  </Stage>
</div>;
```

Multiline annotation with custom color

```jsx
import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import useContainerWidthOnWindowResize from "../../hooks/useContainerWidthOnWindowResize";

const containerRef = useRef();
const width = useContainerWidthOnWindowResize(containerRef);
const height = 90;

<div ref={containerRef}>
  <Stage width={width} height={height}>
    <Layer>
      <Annotation
        id={"a2"}
        positionX={25}
        positionY={5}
        annotationColor={{ hex: "#FEEBB6", rgb: [254, 235, 182] }}
        annotationText={"This is a \nmultiline annotation\nwith custom color"}
        isFullDisabled={true}
        annotationWidth={240}
        annotationHeight={75}
      />
    </Layer>
  </Stage>
</div>;
```
