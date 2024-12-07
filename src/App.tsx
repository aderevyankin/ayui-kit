import { useState } from 'react';

import styles from './App.module.scss';
import { Drawer } from './components/Drawer';
import { Popover } from './components/Popover';
import { Tooltip } from './components/Tooltip';

export const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.parent}>
      <Tooltip content="Hello from tooltip" position="right">
        <button>Tooltip Button</button>
      </Tooltip>
      <Popover content="Hello from Popover" position="left">
        <button>Popover Button</button>
      </Popover>
      <button onClick={() => toggleDrawer()}>Drawer Button</button>
      <Drawer
        open={isDrawerOpen}
        content={'Hello from Drawer'}
        onClose={toggleDrawer}
      />
    </div>
  );
};
