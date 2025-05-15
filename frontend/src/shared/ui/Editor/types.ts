import { RefObject } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

export type Props = {
  ref?: RefObject<EditorJS | null>;
  data?: OutputData;
  onlyRead?: boolean;
  className?: string;
};
