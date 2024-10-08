Example with initial object state and final nodes:

```js
<ExpressionTreeEditor
  autolayout={true}
  autofit={true}
  isFullDisabled={false}
  showToolbar={true}
  showToolbarButtons={{
    showDrawerButton: true,
    showEditorInfoButton: true,
    showStateResetButton: true,
    showUndoButton: true,
    showRedoButton: true,
    showZoomOutButton: true,
    showZoomInButton: true,
    showZoomToFitButton: true,
    showReorderNodesButton: true,
    showUploadStateButton: true,
    showTakeScreenshotButton: true,
    showFullScreenButton: true,
  }}
  showDrawer={true}
  showDrawerSections={{
    addNodeField: true,
    templateDropdown: true,
    editLabelField: true,
    editTypeField: true,
    editValueField: true,
    editFinalNodeField: true,
  }}
  allowedErrors={{
    loop: true,
    multiEdgeOnHoleConnector: true,
    multiEdgeOnNodeConnector: true,
  }}
  connectorPlaceholder='#'
  templateNodes={["#?#:#", "#[#]"]}
  allowFreeTypeUpdate={true}
  allowFreeValueUpdate={true}
  templateNodeTypesAndValues={{
    String: ['"Hello"', '"World!"', '" "', '"Hello World!"'],
    Number: ["1", "2"],
    Boolean: ["true", "false"],
    Object: [],
    Undefined: ["undefined"],
    Null: ["null"],
  }}
  nodes={{
    n0: {
      pieces: ["#", "+", "#"],
      x: 320,
      y: 90,
      type: "Number",
      value: "10",
      editable: {
        label: false,
        type: false,
        value: false,
        delete: false,
      },
    },
    n1: {
      pieces: ["#", "-", "#"],
      x: 320,
      y: 120,
      type: "Boolean",
      value: "true",
      editable: {
        label: true,
        type: false,
        value: false,
        delete: false,
      },
    },
    n2: {
      pieces: ["#", "/", "#"],
      x: 320,
      y: 150,
      type: "Object",
      value: "",
      editable: {
        label: false,
        type: true,
        value: false,
        delete: false,
      },
    },
    n3: {
      pieces: ["1"],
      x: 320,
      y: 190,
      type: "",
      value: "",
      editable: {
        label: false,
        type: false,
        value: true,
        delete: false,
      },
    },
    n4: {
      pieces: ["2"],
      x: 320,
      y: 190,
      type: "",
      value: "",
      editable: {
        label: true,
        type: false,
        value: false,
        delete: true,
      },
    },
    n5: {
      pieces: ["3"],
      x: 460,
      y: 230,
      type: "",
      value: "",
    },
    n6: {
      pieces: ["#", "+", "#"],
      x: 320,
      y: 190,
      type: "",
      value: "",
    },
    n7: {
      pieces: ["5"],
      x: 520,
      y: 190,
      type: "",
      value: "5",
    },
    n8: {
      pieces: ["6"],
      x: 520,
      y: 190,
      type: "",
      value: "6",
    },
    n9: {
      pieces: ["7"],
      x: 520,
      y: 190,
      type: "",
      value: "7",
    },
    n10: {
      pieces: [],
      mathPieces: [
        { type: "text", x: 12, y: 12, fontSize: 24, value: "(" },
        { type: "hole", x: 33, width: 16, y: 12, height: 24 },
        { type: "text", x: 54, y: 12, fontSize: 24, value: ")" },
      ],
      isMathNode: true,
      type: "",
      value: "",
    },
  }}
  edges={{
    e0: {
      parentNodeId: "n0",
      childNodeId: "n1",
      parentPieceId: 0,
    },
    e1: {
      parentNodeId: "n0",
      childNodeId: "n2",
      parentPieceId: 2,
    },
    e2: {
      parentNodeId: "n1",
      childNodeId: "n3",
      parentPieceId: 0,
    },
    e3: {
      parentNodeId: "n1",
      childNodeId: "n4",
      parentPieceId: 2,
    },
    e4: {
      parentNodeId: "n2",
      childNodeId: "n5",
      parentPieceId: 0,
    },
    e5: {
      parentNodeId: "n2",
      childNodeId: "n6",
      parentPieceId: 2,
    },
  }}
  stageScale={{ x: 1.2, y: 1.2 }}
  stagePos={{ x: 40, y: 200 }}
  selectedRootNode={"n0"}
  highlightedNodes={["n4", "n5", "does not exist", "n6"]}
  highlightedEdges={["e0", "e1", "e2"]}
  drawerPlaceholders={{
    createNodeInputPlaceholder: "Test placeholder",
    editNodeInputPlaceholder: "Edit this",
    typeInputPlaceholder: "Type",
    valueInputPlaceholder: "Value",
  }}
/>
```

Example with initial array state and annotations (editable, deletable and final):

```js
<ExpressionTreeEditor
  threadsEnabledActions={{
    startThread: true,
    removeThread: true,
    addComment: true,
    removeComment: true,
    toggleResolved: true,
  }}
  annotations={{
    a1: {
      x: 100,
      y: 100,
      text: "Hello World!",
      editable: { value: false, delete: false },
    },
    a2: {
      x: 200,
      y: 200,
      text: "Hello World2!",
      editable: { value: true, delete: true },
    },
    a3: {
      x: 300,
      y: 200,
      text: "Hello World3!",
      editable: { value: false, delete: true },
    },
    a4: {
      x: 400,
      y: 200,
      text: "Hello World4!",
      editable: { value: true, delete: false },
    },
  }}
  height={700}
  autolayout={true}
  isFullDisabled={false}
  showToolbar={true}
  showToolbarButtons={{
    showDrawerButton: true,
    showMathInputButton: true,
    showEditorInfoButton: true,
    showStateResetButton: true,
    showUndoButton: true,
    showRedoButton: true,
    showZoomOutButton: true,
    showZoomInButton: true,
    showZoomToFitButton: true,
    showReorderNodesButton: true,
    showUploadStateButton: true,
    showTakeScreenshotButton: true,
    showFullScreenButton: true,
  }}
  showDrawer={true}
  showDrawerSections={{
    addNodeField: true,
    templateDropdown: true,
    editLabelField: true,
    editTypeField: true,
    editValueField: true,
  }}
  allowedErrors={{
    loop: true,
    multiEdgeOnHoleConnector: true,
    multiEdgeOnNodeConnector: true,
  }}
  connectorPlaceholder='#'
  templateNodes={["#?#:#", "#[#]"]}
  allowFreeTypeUpdate={true}
  allowFreeValueUpdate={true}
  templateNodeTypesAndValues={{
    String: ['"Hello"', '"World!"', '" "', '"Hello World!"'],
    Number: ["1", "2"],
    Boolean: ["true", "false"],
    Object: [],
    Undefined: ["undefined"],
    Null: ["null"],
  }}
  nodes={[
    {
      id: "_1",
      pieces: ["1"],
      x: 424.597500066782,
      y: 299,
      width: 38.40234375,
      type: "",
      value: "",
    },
    {
      id: "_2",
      pieces: ["2"],
      x: 553.9999470992326,
      y: 300,
      width: 38.40234375,
      type: "",
      value: "",
    },
    {
      id: "_3",
      pieces: ["3"],
      x: 600.5999999999999,
      y: 200,
      width: 38.40234375,
      type: "",
      value: "",
    },
    {
      id: "_4",
      pieces: ["", "#", "+", "#", ""],
      x: 460.99765625,
      y: 200,
      width: 89.60234375,
      type: "",
      value: "",
    },
    {
      id: "_5",
      pieces: ["", "#", "+", "#", ""],
      x: 503.65468061056725,
      y: 84.77273559570312,
      width: 89.60234375,
      type: "",
      value: "",
    },
  ]}
  edges={[
    {
      parentNodeId: "_4",
      parentPieceId: 1,
      childNodeId: "_1",
      id: "e5",
    },
    {
      parentNodeId: "_4",
      parentPieceId: 3,
      childNodeId: "_2",
      id: "e6",
    },
    {
      parentNodeId: "_5",
      parentPieceId: 1,
      childNodeId: "_4",
      id: "e7",
    },
    {
      parentNodeId: "_5",
      parentPieceId: 3,
      childNodeId: "_3",
      id: "e8",
    },
  ]}
  stageScale={{ x: 1.2, y: 1.2 }}
  stagePos={{ x: 40, y: 200 }}
/>
```

Example without initial state:

```js
<ExpressionTreeEditor
  height={700}
  fullDisabled={false}
  allowedErrors={{
    loop: true,
    multiEdgeOnHoleConnector: true,
    multiEdgeOnNodeConnector: true,
  }}
  connectorPlaceholder='#'
  templateNodeTypesAndValues={{
    Variable: ["x", "y", " ", "z"],
    Number: ["1", "2", "3", "ℕ", "ℤ", "ℚ", "ℝ", "ℂ", "𝕀"],
    ℕ: ["1", "2", "3", "4", "5"],
    ℤ: ["-3", "-2", "-1", "0", "1", "2", "3"],
    ℚ: [],
    ℝ: [],
    ℂ: [],
    𝕀: [],
    Function: [],
    Boolean: ["true", "false"],
    Undefined: ["undefined"],
    Null: ["null"],
    boolean: ["true", "false"],
  }}
  nodeTypes={[
    {
      type: "String",
      any: true,
      fixedValues: ['"Hello"', '"World!"', '" "', '"Hello World!"'],
    },
    { type: "Number", any: true },
    { type: "Boolean", any: false, fixedValues: ["true", "false"] },
    {
      type: "Object",
      any: true,
      fixedValues: [],
    },
    { type: "Undefined", any: false, fixedValues: ["undefined"] },
    { type: "Null", any: false, fixedValues: ["null"] },
  ]}
/>
```

Calling utility functions from outside the component

```js
import { useRef } from "react";

const reference = useRef(null);

<div>
  <button onClick={() => reference.current.resetEdges()}>Reset Edges</button>
  <button onClick={() => reference.current.resetTypeLabels()}>
    Reset Type Labels
  </button>
  <button onClick={() => reference.current.resetValueLabels()}>
    Reset Value Labels
  </button>
  <button onClick={() => reference.current.resetRootNode()}>Reset Root</button>
  <ExpressionTreeEditor
    reference={reference}
    height={700}
    autolayout={true}
    isFullDisabled={false}
    showToolbar={true}
    showToolbarButtons={{
      showDrawerButton: true,
      showEditorInfoButton: true,
      showStateResetButton: true,
      showUndoButton: true,
      showRedoButton: true,
      showZoomOutButton: true,
      showZoomInButton: true,
      showZoomToFitButton: true,
      showReorderNodesButton: true,
      showUploadStateButton: true,
      showTakeScreenshotButton: true,
      showFullScreenButton: true,
    }}
    showDrawer={true}
    showDrawerSections={{
      addNodeField: true,
      templateDropdown: true,
      editLabelField: true,
      editTypeField: true,
      editValueField: true,
    }}
    allowedErrors={{
      loop: true,
      multiEdgeOnHoleConnector: true,
      multiEdgeOnNodeConnector: true,
    }}
    connectorPlaceholder='#'
    templateNodes={["#?#:#", "#[#]"]}
    allowFreeTypeUpdate={true}
    allowFreeValueUpdate={true}
    templateNodeTypesAndValues={{
      String: [
        '"Hello"',
        '"World!"',
        '"a.toUpperCase() ==== " + a.toUpperCase()',
        '" "',
        '"Hello World!"',
      ],
      Number: ["1", "2"],
      Boolean: ["true", "false"],
      Object: [],
      Undefined: ["undefined"],
      Null: ["null"],
    }}
    nodes={{
      n0: {
        pieces: ["#", "+", "#"],
        x: 320,
        y: 90,
        type: "Number",
        value: "10",
      },
      n1: {
        pieces: ["#", "-", "#"],
        x: 320,
        y: 120,
        type: "Boolean",
        value: "true",
      },
      n2: {
        pieces: ["#", "/", "#"],
        x: 320,
        y: 150,
        type: "Object",
        value: "",
      },
      n3: {
        pieces: ["1"],
        x: 320,
        y: 190,
        type: "",
        value: "",
      },
      n4: {
        pieces: ["2"],
        x: 320,
        y: 190,
        type: "",
        value: "",
      },
      n5: {
        pieces: ["3"],
        x: 460,
        y: 230,
        type: "",
        value: "",
      },
      n6: {
        pieces: ["#", "+", "#"],
        x: 320,
        y: 190,
        type: "",
        value: "",
      },
      n7: {
        pieces: ["5"],
        x: 520,
        y: 190,
        type: "",
        value: "5",
      },
      n8: {
        pieces: ["6"],
        x: 520,
        y: 190,
        type: "",
        value: "6",
      },
      n9: {
        pieces: ["7"],
        x: 520,
        y: 190,
        type: "",
        value: "7",
      },
    }}
    edges={{
      e0: {
        parentNodeId: "n0",
        childNodeId: "n1",
        parentPieceId: 0,
      },
      e1: {
        parentNodeId: "n0",
        childNodeId: "n2",
        parentPieceId: 2,
      },
      e2: {
        parentNodeId: "n1",
        childNodeId: "n3",
        parentPieceId: 0,
      },
      e3: {
        parentNodeId: "n1",
        childNodeId: "n4",
        parentPieceId: 2,
      },
      e4: {
        parentNodeId: "n2",
        childNodeId: "n5",
        parentPieceId: 0,
      },
      e5: {
        parentNodeId: "n2",
        childNodeId: "n6",
        parentPieceId: 2,
      },
    }}
    stageScale={{ x: 1.2, y: 1.2 }}
    stagePos={{ x: 40, y: 200 }}
    selectedRootNode={"n0"}
    highlightedNodes={["n4", "n5", "does not exist", "n6"]}
    highlightedEdges={["e0", "e1", "e2"]}
  />
</div>;
```

Utility function `updateGlobalState` and `getGlobalState`

```js
import { useRef } from "react";

const sourceReference = useRef(null);
const targetReference = useRef(null);
let copyState = {};
const onStateChange = (state) => {
  copyState = state;
};

const getGlobalState = () =>
  console.log(sourceReference.current.getGlobalState);
const updateFromOnChange = () =>
  targetReference.current.updateGlobalState(copyState);
const updateFromGetGlobalState = () => {
  console.log(sourceReference.current);
  const sourceState = sourceReference.current.getGlobalState();
  targetReference.current.updateGlobalState(sourceState);
};

<div>
  <button onClick={getGlobalState}>Get Global State</button>
  <button onClick={updateFromOnChange}>
    Update Global State from onChange
  </button>
  <button onClick={updateFromGetGlobalState}>
    Update Global State from Get Global State
  </button>
  <h1>Copy from</h1>
  <ExpressionTreeEditor
    reference={sourceReference}
    onStateChange={onStateChange}
    height={700}
    autolayout={true}
    isFullDisabled={false}
    showToolbar={true}
    showToolbarButtons={{
      showDrawerButton: true,
      showEditorInfoButton: true,
      showStateResetButton: true,
      showUndoButton: true,
      showRedoButton: true,
      showZoomOutButton: true,
      showZoomInButton: true,
      showZoomToFitButton: true,
      showReorderNodesButton: true,
      showUploadStateButton: true,
      showTakeScreenshotButton: true,
      showFullScreenButton: true,
    }}
    showDrawer={true}
    showDrawerSections={{
      addNodeField: true,
      templateDropdown: true,
      editLabelField: true,
      editTypeField: true,
      editValueField: true,
    }}
    allowedErrors={{
      loop: true,
      multiEdgeOnHoleConnector: true,
      multiEdgeOnNodeConnector: true,
    }}
    connectorPlaceholder='#'
    templateNodes={["#?#:#", "#[#]"]}
    allowFreeTypeUpdate={true}
    allowFreeValueUpdate={true}
    templateNodeTypesAndValues={{
      String: [
        '"Hello"',
        '"World!"',
        '"a.toUpperCase() ==== " + a.toUpperCase()',
        '" "',
        '"Hello World!"',
      ],
      Number: ["1", "2"],
      Boolean: ["true", "false"],
      Object: [],
      Undefined: ["undefined"],
      Null: ["null"],
    }}
    nodes={{}}
    edges={{}}
    stageScale={{ x: 1.2, y: 1.2 }}
    stagePos={{ x: 40, y: 200 }}
    highlightedNodes={["n4", "n5", "does not exist", "n6"]}
    highlightedEdges={["e0", "e1", "e2"]}
  />

  <h1>Copy to</h1>

  <ExpressionTreeEditor
    reference={targetReference}
    height={700}
    autolayout={true}
    isFullDisabled={false}
    showToolbar={true}
    showToolbarButtons={{
      showDrawerButton: true,
      showEditorInfoButton: true,
      showStateResetButton: true,
      showUndoButton: true,
      showRedoButton: true,
      showZoomOutButton: true,
      showZoomInButton: true,
      showZoomToFitButton: true,
      showReorderNodesButton: true,
      showUploadStateButton: true,
      showTakeScreenshotButton: true,
      showFullScreenButton: true,
    }}
    showDrawer={true}
    showDrawerSections={{
      addNodeField: true,
      templateDropdown: true,
      editLabelField: true,
      editTypeField: true,
      editValueField: true,
    }}
    allowedErrors={{
      loop: true,
      multiEdgeOnHoleConnector: true,
      multiEdgeOnNodeConnector: true,
    }}
    connectorPlaceholder='#'
    templateNodes={["#?#:#", "#[#]"]}
    allowFreeTypeUpdate={true}
    allowFreeValueUpdate={true}
    templateNodeTypesAndValues={{
      String: [
        '"Hello"',
        '"World!"',
        '"a.toUpperCase() ==== " + a.toUpperCase()',
        '" "',
        '"Hello World!"',
      ],
      Number: ["1", "2"],
      Boolean: ["true", "false"],
      Object: [],
      Undefined: ["undefined"],
      Null: ["null"],
    }}
    nodes={{}}
    edges={{}}
    stageScale={{ x: 1.2, y: 1.2 }}
    stagePos={{ x: 40, y: 200 }}
    highlightedNodes={["n4", "n5", "does not exist", "n6"]}
    highlightedEdges={["e0", "e1", "e2"]}
  />
</div>;
```

Shuffle example

```js
import { useRef } from "react";

const reference = useRef(null);

<div>
  <ExpressionTreeEditor
    reference={reference}
    height={700}
    autolayout={true}
    shuffleNodes={true}
    isFullDisabled={false}
    showToolbar={true}
    showToolbarButtons={{
      showDrawerButton: true,
      showEditorInfoButton: true,
      showStateResetButton: true,
      showUndoButton: true,
      showRedoButton: true,
      showZoomOutButton: true,
      showZoomInButton: true,
      showZoomToFitButton: true,
      showReorderNodesButton: true,
      showUploadStateButton: true,
      showTakeScreenshotButton: true,
      showFullScreenButton: true,
    }}
    showDrawer={true}
    showDrawerSections={{
      addNodeField: true,
      templateDropdown: true,
      editLabelField: true,
      editTypeField: true,
      editValueField: true,
    }}
    allowedErrors={{
      loop: true,
      multiEdgeOnHoleConnector: true,
      multiEdgeOnNodeConnector: true,
    }}
    connectorPlaceholder='#'
    templateNodes={["#?#:#", "#[#]"]}
    allowFreeTypeUpdate={true}
    allowFreeValueUpdate={true}
    templateNodeTypesAndValues={{
      String: [
        '"Hello"',
        '"World!"',
        '"a.toUpperCase() ==== " + a.toUpperCase()',
        '" "',
        '"Hello World!"',
      ],
      Number: ["1", "2"],
      Boolean: ["true", "false"],
      Object: [],
      Undefined: ["undefined"],
      Null: ["null"],
    }}
    nodes={{
      n0: {
        pieces: ["#", "+", "#"],
        x: 320,
        y: 90,
        type: "Number",
        value: "10",
      },
      n1: {
        pieces: ["#", "-", "#"],
        x: 320,
        y: 120,
        type: "Boolean",
        value: "true",
      },
      n2: {
        pieces: ["#", "/", "#"],
        x: 320,
        y: 150,
        type: "Object",
        value: "",
      },
      n3: {
        pieces: ["1"],
        x: 320,
        y: 190,
        type: "",
        value: "",
      },
      n4: {
        pieces: ["2"],
        x: 320,
        y: 190,
        type: "",
        value: "",
      },
      n5: {
        pieces: ["3"],
        x: 460,
        y: 230,
        type: "",
        value: "",
      },
      n6: {
        pieces: ["#", "+", "#"],
        x: 320,
        y: 190,
        type: "",
        value: "",
      },
      n7: {
        pieces: ["5"],
        x: 520,
        y: 190,
        type: "",
        value: "5",
      },
      n8: {
        pieces: ["6"],
        x: 520,
        y: 190,
        type: "",
        value: "6",
      },
      n9: {
        pieces: ["7"],
        x: 520,
        y: 190,
        type: "",
        value: "7",
      },
    }}
    edges={{}}
    stageScale={{ x: 1.2, y: 1.2 }}
    stagePos={{ x: 40, y: 200 }}
    selectedRootNode={"n0"}
    highlightedNodes={["n4", "n5", "does not exist", "n6"]}
    highlightedEdges={["e0", "e1", "e2"]}
  />
</div>;
```
