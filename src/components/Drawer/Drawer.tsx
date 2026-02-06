import {
  FC,
  ReactNode,
} from 'react';

import { Portal } from '../Portal';
import styles from './Drawer.module.scss';

type DrawerProps = {
  content: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const Drawer: FC<DrawerProps> = ({ content, open, onClose }) => {
  return (
    <Portal>
      <div
        className={`${styles.overlay} ${!open && styles.overlayHidden} ${open && styles.overlayOpen}`}
        onClick={onClose}
      >
        <div className={`${styles.container} ${open ? styles.open : ''}`}>
          {content}
        </div>
      </div>
    </Portal>
  );
};
