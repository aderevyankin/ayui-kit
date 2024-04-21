import styles from './Drawer.module.scss';
import { FC, ReactNode } from 'react';

type DrawerProps = {
  content: ReactNode;
  open: boolean;
  onClose: () => void;
};
export const Drawer: FC<DrawerProps> = ({ content, open, onClose }) => {
  return (
    <div
      className={`${styles.overlay} ${!open && styles.overlayHidden} ${open && styles.overlayOpen}`}
      onClick={onClose}
    >
      <div className={`${styles.container} ${open ? styles.open : ''}`}>
        {content}
      </div>
    </div>
  );
};
