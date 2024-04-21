import styles from './App.module.scss';
import { Tooltip } from './components/Tooltip';
import { Drawer } from './components/Drawer';
import { useState } from 'react';

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.parent}>
      <Tooltip title="Hello">
        <button>Tooltip Button</button>
      </Tooltip>
      <button onClick={() => toggleDrawer()}>Drawer Button</button>
      <Drawer
        open={isDrawerOpen}
        content={'Hello from Drawer'}
        onClose={toggleDrawer}
      />
    </div>
  );
}

export default App;
