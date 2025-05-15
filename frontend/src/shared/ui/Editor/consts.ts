import Embed from '@editorjs/embed';
import Code from '@editorjs/code';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import Underline from '@editorjs/underline';
import AttachesTool from '@editorjs/attaches';
import { upload } from './utils';

export const EDITOR_TOOLS = {
  embed: Embed,
  code: Code,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: upload,
      },
    },
  },
  attaches: {
    class: AttachesTool,
    config: {
      uploader: {
        uploadByFile: upload,
      },
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: {
    class: InlineCode,
    inlineToolbar: true,
  },
  simpleImage: SimpleImage,
  underline: Underline,
};
