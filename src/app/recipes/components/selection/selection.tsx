import * as React from 'react';
import { RecipeCollection } from '../../store/collection/state';

type SelectionProps = {
    recipes: RecipeCollection
};
export default class Selection extends React.Component<SelectionProps, {}>  {

    render() {
        return (
            <>
            {JSON.stringify(this.props.recipes)}
            <div>Recipe Selection</div>
            </>
        );
    }
}