import {FC, useEffect, useRef, memo} from 'react';
import classNames from 'classnames';

import {useWindowSize} from '../../hooks/useWindowSize';

import styles from './index.module.css';
import {CheckText} from '../../models/CheckText';
import {IKey, NextTypeKey} from '../../models/IKeyboard';

interface KeyboardKeyProps {
  keyboardKey: IKey;
  nextKey: string | undefined;
  onChangeNextTypeKey: (obj: NextTypeKey | null) => void;
}

type CheckTextPick = Pick<CheckText, 'currentWordId'>;

const KeyboardKey: FC<KeyboardKeyProps & CheckTextPick> = memo(
  ({keyboardKey, nextKey, onChangeNextTypeKey, currentWordId}) => {
    const windowSizes = useWindowSize();
    const isNextKey = keyboardKey.key?.toLowerCase() === nextKey;
    const keyRef = useRef<HTMLDivElement>(null);

    const keyClassNames = classNames(styles.key, {
      [styles[`${keyboardKey.code?.toLowerCase()}`]]: keyboardKey.code,
      [styles.supKey]: keyboardKey.supKey,
      [styles.isSystemKey]: keyboardKey.isSystemKey,
      [styles.isSpace]: keyboardKey.isSpace,
      [styles.needType]: isNextKey,
    });

    useEffect(() => {
      if (isNextKey && keyRef.current) {
        onChangeNextTypeKey({
          finger: keyboardKey.finger,
          coords: {
            left: keyRef.current.offsetLeft,
            top: keyRef.current.offsetTop,
            width: keyRef.current.clientWidth,
          },
        });
      }

      if (nextKey === undefined) {
        onChangeNextTypeKey(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNextKey, windowSizes.width, currentWordId]);

    return (
      <div className={keyClassNames} ref={keyRef}>
        {keyboardKey.key}
        {keyboardKey.supKey ? <span>{keyboardKey.supKey}</span> : null}
      </div>
    );
  }
);

export default KeyboardKey;
