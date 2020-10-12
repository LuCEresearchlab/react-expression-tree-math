import { connect } from "react-redux";
import StageDrawer from "./StageDrawer";
import * as actions from "../../store/actions";

const mapStateToProps = state => ({
  selectedNode: state.editor.selectedNode,
  addingNode: state.drawer.addingNode,
  selectedEdge: state.editor.selectedEdge,
});

export default connect(mapStateToProps, actions)(StageDrawer);
