import * as React from 'react';

const Section: React.SFC<{}> = ({children}) => (
    <div className="section">
        {children}
    </div>
);

export default Section;