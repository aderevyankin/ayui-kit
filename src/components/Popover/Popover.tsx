import { FC } from 'react';
import { PopupBase, PopupBaseProps } from '../PopupBase';

export const Popover: FC<Omit<PopupBaseProps, 'popupType'>> = (props) => {
  const { children } = props;

  return (
    <PopupBase popupType="popover" {...props}>
      {children}
    </PopupBase>
  );
};
