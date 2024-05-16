import React, { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { Position } from '../../shared/types';
import { calculatePopupPosition } from '../../shared/utils.tsx';
import { useOutsideClick } from '../../shared/hooks.tsx';
import { Portal } from '../Portal';
import styles from './PopupBase.module.scss';

export type PopupBaseProps = {
  content: ReactNode;
  children: (props: any) => ReactNode;
  position?: Position;
  popupType: 'tooltip' | 'popover';
};

export const PopupBase: FC<PopupBaseProps> = ({
  content,
  children,
  position: positionString,
  popupType,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({});

  useOutsideClick({
    elementRef: popupRef,
    onOutsideClick: () => setAnchorEl(null),
  });

  useLayoutEffect(() => {
    const tooltipEl = popupRef.current;

    if (!anchorEl || !tooltipEl) {
      return;
    }
    const position = calculatePopupPosition(
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
          <div ref={popupRef} className={styles.tooltip} style={position}>
            {content}
          </div>
        </Portal>
      )}

      {popupType === 'tooltip' &&
        children({
          onMouseLeave: () => setAnchorEl(null),
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
          },
        })}

      {popupType === 'popover' &&
        children({
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
          },
        })}
    </>
  );
};
