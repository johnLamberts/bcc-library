import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { Context } from "@ckeditor/ckeditor5-core";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import BlockquotePlugin from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import {
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
} from "@ckeditor/ckeditor5-image";
import ImageUploadPlugin from "@ckeditor/ckeditor5-image/src/imageupload";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import { Font } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Box } from "@mantine/core";
import { Alignment } from "@ckeditor/ckeditor5-alignment"; // Importing the package.
import { TextTransformation } from "@ckeditor/ckeditor5-typing";

export default function AnnouncementForm() {
  return (
    <>
      <Box h={"60rem"}>
        <CKEditorContext context={Context}>
          <CKEditor
            config={{
              plugins: [
                Base64UploadAdapter,
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
                  "strikethrough",
                  "subscript",
                  "superscript",
                  "code",
                  "|",
                  "link",
                  "insertImage",
                  "blockQuote",
                  "codeBlock",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "todoList",
                  "outdent",
                  "indent",
                ],
                shouldNotGroupWhenFull: false,
              },
            }}
            editor={ClassicEditor}
            onReady={() => {}}
            onChange={(event, editor) => {
              console.log("event: onChange", { event, editor });
            }}
            onBlur={(event, editor) => {
              console.log("event: onBlur", { event, editor });
            }}
            onFocus={(event, editor) => {
              console.log("event: onFocus", { event, editor });
            }}
          />
        </CKEditorContext>{" "}
      </Box>
    </>
  );
}
