import styles from './App.module.scss';
import { Tooltip } from './components/Tooltip';
import { Drawer } from './components/Drawer';
import { useState } from 'react';
import { Popover } from './components/Popover';

export const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.parent}>
      <Tooltip content="Hello from tooltip" position="right">
        {/* ну блин не нравится мне прикол с пропс переподачей. я уж че только не пробовал и стало только хуже.*/}
        {(props) => <button {...props}>Tooltip Button</button>}
      </Tooltip>
      <Popover content="Hello from Popover" position="left">
        {(props) => <button {...props}>Popover Button</button>}
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
