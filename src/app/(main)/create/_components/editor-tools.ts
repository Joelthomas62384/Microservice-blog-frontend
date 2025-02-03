// editor-tools.js
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import CodeTool from '@editorjs/code';

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: ['link'],
    config: {
      placeholder: 'Enter a header',
      defaultLevel: 2,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: SimpleImage,
  code: CodeTool,
};
