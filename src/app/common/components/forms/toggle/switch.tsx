import * as React from 'react';

export const Switch: React.SFC<{on: boolean, onClick: () => void}> = (props) => (
        <div>
            {props.on}
        </div>
);