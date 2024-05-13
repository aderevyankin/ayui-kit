import React, { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { Position } from '../../shared/types';
import { CalculatePopupPosition, RenderIf } from '../../shared/utils.tsx';
import { useOnClickOutside } from '../../shared/hooks.tsx';
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

  useOnClickOutside(popupRef, () => {
    if (popupType === 'popover' && anchorEl) {
      setAnchorEl(null);
    }
  });

  useLayoutEffect(() => {
    const tooltipEl = popupRef.current;

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
          <div ref={popupRef} className={styles.tooltip} style={position}>
            {content}
          </div>
        </Portal>
      )}
      <RenderIf condition={popupType === 'tooltip'}>
        {children({
          onMouseLeave: () => setAnchorEl(null),
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
          },
        })}
      </RenderIf>
      <RenderIf condition={popupType === 'popover'}>
        {children({
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
          },
        })}
      </RenderIf>
    </>
  );
};
