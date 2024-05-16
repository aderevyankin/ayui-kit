import { FC } from 'react';
import { PopupBase, PopupBaseProps } from '../PopupBase';

export const Tooltip: FC<Omit<PopupBaseProps, 'popupType'>> = (props) => {
  return (
    <PopupBase popupType="tooltip" {...props} />
  );
};
