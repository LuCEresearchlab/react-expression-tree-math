import { connect } from "react-redux";
import StageDrawer from "./StageDrawer";
import * as actions from "../../store/actions";

const mapStateToProps = state => ({
  selectedNode: state.selectedNode,
});

export default connect(mapStateToProps, actions)(StageDrawer);