import { FC } from 'react';
import { PopupBase, PopupBaseProps } from '../PopupBase';

export const Tooltip: FC<Omit<PopupBaseProps, 'popupType'>> = (props) => {
  const { children } = props;
  return (
    // вот тут пропс переподача как будто уместна))
    <PopupBase popupType="tooltip" {...props}>
      {children}
    </PopupBase>
  );
};
