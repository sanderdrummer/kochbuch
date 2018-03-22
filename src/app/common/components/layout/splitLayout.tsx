import * as React from 'react';
import { style } from 'typestyle';

const className = style({
  display: 'flex',
  justifyContent: 'space-between'
});

const SplitText: React.SFC<React.Props<{}>> = (props) => (
  <div className={className}>
    {props.children}
  </div>
);

export default SplitText;