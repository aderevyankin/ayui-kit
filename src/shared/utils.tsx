import { Position } from './types';
import React from 'react';

export const calculatePopupPosition = (
  anchorEl: HTMLElement,
  displayObjectEl: HTMLElement,
  position: Position,
  space: number
): Record<string, number> => {
  const anchorRect = anchorEl.getBoundingClientRect();
  const displayObjectRect = displayObjectEl.getBoundingClientRect();

  switch (position) {
    case 'top':
      return {
        top: anchorRect.top - displayObjectRect.height - space,
        left:
          anchorRect.left + anchorRect.width / 2 - displayObjectRect.width / 2,
      };
    case 'bottom':
      return {
        top: anchorRect.top + anchorRect.height + space,
        left:
          anchorRect.left + anchorRect.width / 2 - displayObjectRect.width / 2,
      };
    case 'left':
      return {
        top:
          anchorRect.top + anchorRect.height / 2 - displayObjectRect.height / 2,
        left: anchorRect.left - displayObjectRect.width - space,
      };
    case 'right':
      return {
        top:
          anchorRect.top + anchorRect.height / 2 - displayObjectRect.height / 2,
        left: anchorRect.left + anchorRect.width + space,
      };
    default:
      return { top: 0, left: 0 };
  }
};

interface IVisible {
  condition: boolean;
  children: React.ReactNode;
}

export const RenderIf = ({
  condition,
  children,
}: IVisible): JSX.Element | null => (condition ? <>{children}</> : null);
