import { FC, ReactNode, useState } from 'react';
import styles from './Tooltip.module.scss';

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
};

export const Tooltip: FC<TooltipProps> = ({ content, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && <div className={styles.tooltip}>{content}</div>}
    </div>
  );
};
