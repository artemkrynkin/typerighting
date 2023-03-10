import React, {useEffect} from 'react';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

import {useAppDispatch} from 'hooks/redux';
import {useKeyPress} from 'hooks/useKeyPress';
import {currentWordSlice} from 'store/currentWord/slice';

import {Props} from './types';
import styles from './index.module.css';
import {AppBarCustom} from './styles';

const Header: React.FC<Props> = React.memo(({onOpenSidebar, wordNumbers, currentWordId}) => {
  const dispatch = useAppDispatch();
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');

  const onChangeWord = (handlerType: string): void => {
    dispatch(currentWordSlice.actions.onChangeWord({handlerType, wordNumbers}));
  };

  useEffect(() => {
    if (pressedAlt && pressedArrowLeft) {
      dispatch(currentWordSlice.actions.onChangeWord({handlerType: 'prev', wordNumbers}));
      onOpenSidebar(false);
    }
    if (pressedAlt && pressedArrowRight) {
      dispatch(currentWordSlice.actions.onChangeWord({handlerType: 'next', wordNumbers}));
      onOpenSidebar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedAlt, pressedArrowLeft, pressedArrowRight]);

  return (
    <AppBarCustom position="fixed" sx={{alignItems: 'center'}}>
      <Toolbar sx={{maxWidth: 990, width: '100%'}}>
        <Grid container>
          <IconButton onClick={() => onOpenSidebar()} aria-label="menu" color="primary">
            <MenuIcon />
          </IconButton>
        </Grid>
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
