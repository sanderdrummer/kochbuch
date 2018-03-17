import { connect } from 'react-redux';

import Selection from './selection';
import { AppState } from '../../../common/store/state';

interface DispatchToProps {}

const mapStateToProps = (state: AppState) => ({
    recipes: state.recipes.collection
});

const mapDispatchToProps = (dispatch: DispatchToProps ) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);