import React, {
  FC,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { CSSTransition } from 'react-transition-group';

import { useOutsideClick } from '../../shared/hooks.tsx';
import { Position } from '../../shared/types';
import { calculatePopupPosition } from '../../shared/utils.tsx';
import { Portal } from '../Portal';
import styles from './PopupBase.module.scss';

export type PopupBaseProps = {
  content: ReactNode;
  children: ReactElement;
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
  const [position, setPosition] = useState({});
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    elementRef: popupRef,
    onOutsideClick: () => hideItem(),
  });

  const hideItem = () => {
    // setAnchorEl(null);
    setOpen(false);
  };

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
          <CSSTransition
            in={open}
            timeout={500}
            unmountOnExit
            classNames={{
              enterActive: styles.enterActive,
              exitActive: styles.exitActive,
            }}
          >
            <div ref={popupRef} className={styles.popup} style={position}>
              {content}
            </div>
          </CSSTransition>
        </Portal>
      )}

      {popupType === 'tooltip' &&
        React.cloneElement(children, {
          onMouseLeave: () => hideItem(),
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
            setOpen(true);
          },
        })}

      {popupType === 'popover' &&
        React.cloneElement(children, {
          onClick: (e: {
            currentTarget: React.SetStateAction<HTMLElement | null>;
          }) => {
            setAnchorEl(e.currentTarget);
            setOpen(true);
          },
        })}
    </>
  );
};
