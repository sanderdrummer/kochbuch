import React from "react";

import { createWorker } from "tesseract.js";

import {
  Button,
  Card,
  SwipeableDrawer,
  CardContent,
  CardActions,
  CardHeader,
  CircularProgress
} from "@material-ui/core";
import { CameraAlt } from "@material-ui/icons";

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

export const OcrButton: React.FC<{ onComplete(text: string): void }> = ({
  onComplete
}) => {
  const [open, setOpen] = React.useState(false);
  const { state, previewImage, processImage, imageRef } = useOcr();

  React.useEffect(() => {
    if (state.text) {
      onComplete(state.text);
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.text]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <CameraAlt />
      </Button>
      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Card>
          <CardHeader title="Text aus Bild extrahieren" />
          <CardContent>
            <input
              type="file"
              onChange={e => {
                const files = e.target.files;
                if (files) {
                  previewImage(files[0]);
                }
              }}
            />
            {state.image && (
              <img
                style={{ maxWidth: "100%", maxHeight: "40vh" }}
                ref={imageRef}
                src={state.image}
                alt="preview of your upload"
              />
            )}
          </CardContent>
          <CardActions>
            <Button disabled={!state.image} onClick={processImage}>
              {state.status === "loading" ? (
                <CircularProgress />
              ) : (
                "Text aus dem Bild kopieren"
              )}
            </Button>
          </CardActions>
        </Card>
      </SwipeableDrawer>
    </>
  );
};
