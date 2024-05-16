import { FC } from 'react';
import { PopupBase, PopupBaseProps } from '../PopupBase';

export const Popover: FC<Omit<PopupBaseProps, 'popupType'>> = (props) => {
  return <PopupBase popupType="popover" {...props} />;
};
