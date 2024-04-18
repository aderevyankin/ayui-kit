import { FC, ReactNode, useState } from 'react';
import styles from './Tooltip.module.scss';

type TooltipProps = {
  children: ReactNode;
  title: ReactNode;
};

export const Tooltip: FC<TooltipProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && <div className={styles.tooltip}>{title}</div>}
    </div>
  );
};
