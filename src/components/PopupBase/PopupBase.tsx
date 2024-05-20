import React, {
  FC,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Position } from '../../shared/types';
import { calculatePopupPosition } from '../../shared/utils.tsx';
import { useOutsideClick } from '../../shared/hooks.tsx';
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
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({});

  useOutsideClick({
    elementRef: popupRef,
    onOutsideClick: () => hideItem(),
  });

  const hideItem = async () => {
    popupRef.current?.classList.add(styles.tooltipHide);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setAnchorEl(null);
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
          <div ref={popupRef} className={styles.tooltip} style={position}>
            {content}
          </div>
        </Portal>
      )}

      {/*{popupType === 'tooltip' &&*/}
      {/*  children({*/}
      {/*    onMouseLeave: () => hideItem(),*/}
      {/*    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {*/}
      {/*      setAnchorEl(e.currentTarget);*/}
      {/*    },*/}
      {/*  })}*/}

      {popupType === 'tooltip' &&
        React.cloneElement(children, {
          onMouseLeave: () => hideItem(),
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
          },
        })}

      {/*{popupType === 'popover' &&*/}
      {/*  children({*/}
      {/*    onClick: (e: React.MouseEvent<HTMLElement>) => {*/}
      {/*      setAnchorEl(e.currentTarget);*/}
      {/*    },*/}
      {/*  })}*/}

      {popupType === 'popover' &&
        React.cloneElement(children, {
          onClick: (e: {
            currentTarget: React.SetStateAction<HTMLElement | null>;
          }) => setAnchorEl(e.currentTarget),
        })}
    </>
  );
};
