import styles from './Popover.module.scss';
import { FC, ReactNode, useState } from 'react';

type PopoverProps = {
  children: ReactNode;
  content: ReactNode;
};

export const Popover: FC<PopoverProps> = ({ children, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container} onClick={() => setOpen(!open)}>
      {children}
      {open && <div className={styles.popover}>{content}</div>}
    </div>
  );
};
