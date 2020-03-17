import React, { Reducer } from "react";

import { createWorker } from "tesseract.js";

import { Button, Paper } from "@material-ui/core";

const worker = createWorker({
  logger: m => console.log(m)
});

const initialState = {
  status: "",
  text: "",
  image: ""
};

const reducer = (state = initialState, action: OcrActions) => {
  switch (action.type) {
    case "setImage":
      return { ...state, image: action.payload };
    case "updateStatus":
      return { ...state, status: action.payload };
    case "updateText":
      return { ...state, text: action.payload, status: "" };
    default:
      return state;
  }
};

type OcrActions = {
  type: "updateStatus" | "updateText" | "setImage";
  payload: string;
};

const useOcr = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const processImage = async () => {
    if (imageRef.current) {
      dispatch({ type: "updateStatus", payload: "loading" });
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text }
      } = await worker.recognize(imageRef.current);
      dispatch({ type: "updateText", payload: text });
      return;
    }

    throw new Error("no image found");
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (typeof e?.target?.result === "string") {
        dispatch({ type: "setImage", payload: e?.target?.result });
      }
    };

    reader.readAsDataURL(file);
  };

  return { state, previewImage, processImage, imageRef };
};

export const OCR = () => {
  const { state, previewImage, processImage, imageRef } = useOcr();
  return (
    <div>
      <input
        type="file"
        onChange={e => {
          const files = e.target.files;
          if (files) {
            previewImage(files[0]);
          }
        }}
      />
      <Button onClick={processImage} children="send" />
      {state.image && (
        <img
          style={{ maxWidth: "100%" }}
          ref={imageRef}
          src={state.image}
          alt="preview of your upload"
        />
      )}
      <Paper>
        {state.status}
        {state.text}
      </Paper>
    </div>
  );
};
