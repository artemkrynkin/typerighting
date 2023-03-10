import React from 'react';
import cx from 'classnames';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import {useAppDispatch} from 'hooks/redux';
import {currentWordSlice} from 'store/currentWord/slice';
import {ListItemProps} from '../types';

import styles from '../index.module.css';

const ListItem: React.FC<ListItemProps> = ({word, index, currentWordId, onOpenSidebar}) => {
  const dispatch = useAppDispatch();

  const wordItemClassNames = cx({
    [styles.itemCurrent]: index === currentWordId - 1,
  });

  const onChangeWord = () => {
    onOpenSidebar();
    dispatch(currentWordSlice.actions.onChangeWord({wordId: word.id}));
  };

  return (
    <ListItemButton onClick={() => onChangeWord()}>
      <ListItemText>
        <span className={wordItemClassNames}>{word.tenses.join(', ')}</span>
      </ListItemText>
    </ListItemButton>
  );
};

export default ListItem;
