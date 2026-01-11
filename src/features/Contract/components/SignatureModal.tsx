import { useCallback, useRef, useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import type ReactSignatureCanvas from 'react-signature-canvas';

interface SignatureModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
}

const SignatureModal = ({ open, onClose, onSave }: SignatureModalProps) => {
  const padRef = useRef<ReactSignatureCanvas>(null);
  const [hasStroke, setHasStroke] = useState(false);

  /** 서명 저장 */
  const handleSave = useCallback(() => {
    const url = padRef.current?.toDataURL('image/png');
    if (url) onSave(url);
    onClose();
  }, [onClose, onSave]);

  /** 서명 지우기 */
  const handleClear = useCallback(() => {
    padRef.current?.clear();
    setHasStroke(false);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>서명 입력</DialogTitle>

      <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center' }}>
        <SignatureCanvas
          ref={padRef}
          penColor="black"
          onBegin={() => setHasStroke(true)}
          canvasProps={{
            width: 480,
            height: 180,
            className: 'border rounded-xl bg-white',
          }}
        />
      </DialogContent>

      <DialogActions>
        <MuiButton onClick={handleClear} variant="outlined">
          지우기
        </MuiButton>

        <MuiButton
          onClick={handleSave}
          variant="contained"
          disabled={!hasStroke}
          className="bg-button"
        >
          저장
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default SignatureModal;
