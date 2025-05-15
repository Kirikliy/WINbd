import { memo, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './consts';
import { Props } from './types';

export const Editor = ({ ref: externalEditorRef, data, onlyRead, className }: Props) => {
  const { t } = useTranslation();
  const defaultEditorRef = useRef<EditorJS>(externalEditorRef?.current ?? null);
  const editorRefHolder = useRef<HTMLDivElement>(null);
  const editorRef = externalEditorRef ?? defaultEditorRef;

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.readOnly?.toggle();
    }
  }, [onlyRead]);

  useEffect(() => {
    if (editorRef.current || !editorRefHolder.current) return;

    editorRef.current = new EditorJS({
      holder: editorRefHolder.current,
      // @ts-ignore
      tools: EDITOR_TOOLS,
      data,
      minHeight: onlyRead ? 0 : 100,
      readOnly: onlyRead,
    });
  }, []);

  return <Box ref={editorRefHolder} className={className} />;
};

export default memo(Editor);
