import React, { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { Portal } from '../Portal';
import styles from './Tooltip.module.scss';
import { Position } from '../../shared/types';
import { CalculatePopupPosition } from '../../shared/utils.ts';

type TooltipChildProps = {
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
};

type TooltipProps = {
  content: ReactNode;
  children: (props: TooltipChildProps) => ReactNode;
  position?: Position;
};

export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position: positionString,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({});

  useLayoutEffect(() => {
    const tooltipEl = tooltipRef.current;

    if (!anchorEl || !tooltipEl) {
      return;
    }
    const position = CalculatePopupPosition(
      anchorEl,
      tooltipEl,
      positionString || 'top',
      10
    );
    setPosition(position);
  }, [anchorEl]);
  return (
    <>
      {anchorEl && (
        <Portal>
          <div ref={tooltipRef} className={styles.tooltip} style={position}>
            {content}
          </div>
        </Portal>
      )}
      {children({
        onMouseLeave: () => setAnchorEl(null),
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
          setAnchorEl(e.currentTarget),
      })}
    </>
  );
};
