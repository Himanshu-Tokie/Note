import React, { useRef } from 'react';
import DialogInput from 'react-native-dialog-input';
import { STRINGS } from '../../constants/strings';

export default function AddLabel({setNewlabel, show, setShow}) {
  const newLabel = useRef('');
  // const [show, setShow] = useState(false)
  return (
    <>
      <DialogInput
        isDialogVisible={show}
        title={STRINGS.ADD_LABEL}
        hintInput={STRINGS.LABEL_NAME}
        submitInput={input => {
          setNewlabel(input);
          setShow(false);
        }}
        closeDialog={() => {
          setShow(false);
        }}></DialogInput>
    </>
  );
}
