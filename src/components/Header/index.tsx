import React, {FC, memo, useEffect, useState} from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import {useAppDispatch} from '../../hooks/redux';
import {checkTextSlice} from '../../store/reducers/CheckTextSlice';
import {CheckText} from '../../models/CheckText';

import styles from './index.module.css';
import {AppBarCustom} from './styles';
import {useKeyPress} from '../../hooks/useKeyPress';

interface HeaderProps {
  onOpenSidebar: () => void;
  wordNumbers: number;
}
type CheckTextPick = Pick<CheckText, 'currentWordId'>;

const Header: FC<HeaderProps & CheckTextPick> = memo(({onOpenSidebar, wordNumbers, currentWordId}) => {
  const dispatch = useAppDispatch();
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');

  const onChangeWord = (handlerType: string): void => {
    dispatch(checkTextSlice.actions.onChangeWord({handlerType, wordNumbers}));
  };

  useEffect(() => {
    if (pressedAlt && pressedArrowLeft) {
      dispatch(checkTextSlice.actions.onChangeWord({handlerType: 'prev', wordNumbers}));
    }
    if (pressedAlt && pressedArrowRight) {
      dispatch(checkTextSlice.actions.onChangeWord({handlerType: 'next', wordNumbers}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedAlt, pressedArrowLeft, pressedArrowRight]);

  return (
    <AppBarCustom position="fixed" sx={{alignItems: 'center'}}>
      <Toolbar sx={{maxWidth: 990, width: '100%'}}>
        <IconButton onClick={() => onOpenSidebar()} aria-label="menu" color="primary">
          <MenuIcon />
        </IconButton>
        <Box sx={{flexGrow: 1}} />
        <IconButton onClick={() => onChangeWord('prev')} aria-label="left" color="primary">
          <ChevronLeftIcon />
        </IconButton>
        <Chip
          className={styles.headerChip}
          label={currentWordId + ' of ' + wordNumbers}
          variant="outlined"
          color="primary"
        />
        <IconButton onClick={() => onChangeWord('next')} aria-label="right" color="primary">
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>
    </AppBarCustom>
  );
});

export default Header;
