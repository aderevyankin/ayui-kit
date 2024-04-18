import styles from './App.module.scss';
import { Tooltip } from './components/Tooltip';

function App() {
  return (
    <div className={styles.parent}>
      <Tooltip title="Hello">
        <button>Hello World</button>
      </Tooltip>
    </div>
  );
}

export default App;
