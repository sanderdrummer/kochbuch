import * as React from 'react';
import SearchForm from './search-form';

const initialState = {query: ''};
type State = Readonly<typeof initialState>;
type Props = {submit(query: string): void};

export class SearchFormContainer extends React.Component<Props, State> {
        readonly state: State = initialState;

        render() {
            return (
                <>
                    <SearchForm 
                        value={this.state.query} 
                        submit={() => this.props.submit(this.state.query)}
                        onChanges={this.handleUpdate}
                    />;
                    
                </>
            ); 
        }

        handleUpdate = (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({ query: e.currentTarget.value });
    }
}