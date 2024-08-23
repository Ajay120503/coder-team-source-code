import React, { useEffect, useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/cobol/cobol";
import "codemirror/mode/css/css";
import "codemirror/mode/php/php";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/r/r";
import "codemirror/mode/ruby/ruby";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";
import DragMenu from "./DragMenu";
import { Scrollbar } from 'react-scrollbars-custom';
import Output from "./Output";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");

  // Function to handle language selection from DragMenu
  const onSelecte = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    const init = () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: language,
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current = editor;
      editor.setSize(null, "100%");

      editor.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    // Initialize the editor
    init();

    // Cleanup editor on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  }, []); // Reinitialize editor when language changes

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <>
      <DragMenu language={language} onSelect={onSelecte} />
      <Scrollbar >
        <textarea id="realtimeEditor"></textarea>
      </Scrollbar>
      <Output editorRef={editorRef} language={language} />
    </>
  );
}

export default Editor;
