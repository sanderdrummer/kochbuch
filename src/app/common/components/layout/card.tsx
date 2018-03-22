import * as React from 'react';
import { style, classes } from 'typestyle';
import { Shadows } from '../../';

type Props = {
  level: number;
};

const className = style({
  background: '#fff',
  borderRadius: '2px',
  margin: '1rem',
  padding: '1rem',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
}); 

const getLevelClass = (level: number) => {
  switch (level) {
    case 2: return style({ boxShadow: Shadows.level2});
    case 3: return style({ boxShadow: Shadows.level3});
    case 4: return style({ boxShadow: Shadows.level4});
    case 5: return style({ boxShadow: Shadows.level5});
    case 6: return style({ boxShadow: Shadows.level6});
    default: return style({
      boxShadow: Shadows.level1,
    });
  }
};

const Card: React.SFC<Props> = (props) => (
  <div className={classes(className, getLevelClass(props.level))}>
    {props.children}
  </div>
);

export default Card;