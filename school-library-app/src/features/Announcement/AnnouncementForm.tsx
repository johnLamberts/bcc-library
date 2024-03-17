/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { Context } from "@ckeditor/ckeditor5-core";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import BlockquotePlugin from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import { useState } from "react";
import {
  Base64UploadAdapter,
  SimpleUploadAdapter,
} from "@ckeditor/ckeditor5-upload";
import MyUploadAdapter, {
  FirebaseDownloadAdapterPlugin,
} from "./services/announcement.service";
import {
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
} from "@ckeditor/ckeditor5-image";
import ImageUploadPlugin from "@ckeditor/ckeditor5-image/src/imageupload";
import { Font } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Box } from "@mantine/core";
import { Alignment } from "@ckeditor/ckeditor5-alignment"; // Importing the package.
import { TextTransformation } from "@ckeditor/ckeditor5-typing";

import "./styles/ck-editor.css";

export default function AnnouncementForm() {
  const [value, setValue] = useState("");

  const handleEditorReady = (editor: any) => {};
  return (
    <>
      <Box pos={"relative"}>
        <div className="editor-wrapper">
          <CKEditorContext context={Context}>
            <CKEditor
              config={{
                plugins: [
                  SimpleUploadAdapter,
                  LinkPlugin,
                  ParagraphPlugin,
                  BlockquotePlugin,
                  Image,
                  ImageCaption,
                  ImageResize,
                  ImageStyle,
                  ImageToolbar,
                  ImageUploadPlugin,
                  Bold,
                  Italic,
                  Essentials,
                  Font,
                  Heading,
                  Alignment,
                  TextTransformation,
                ],
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "toggleImageCaption",
                    "imageStyle:inline",
                    "imageStyle:block",
                    "imageStyle:side",
                  ],
                },
                toolbar: {
                  items: [
                    "undo",
                    "redo",
                    "|",
                    "alignment", //
                    "heading",
                    "|",
                    "fontfamily",
                    "fontsize",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "bold",
                    "italic",
                    "|",
                    "link",
                    "insertImage",
                    "blockQuote",
                  ],
                  shouldNotGroupWhenFull: false,
                },
              }}
              editor={ClassicEditor}
              onReady={(editor) => {
                return (editor.plugins.get(
                  "FileRepository"
                ).createUploadAdapter = (loader: any) => {
                  return new MyUploadAdapter(loader);
                });
              }}
              onChange={handleEditorReady}
            />
          </CKEditorContext>{" "}
        </div>
      </Box>
    </>
  );
}
