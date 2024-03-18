import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { Context } from "@ckeditor/ckeditor5-core";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import BlockquotePlugin from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
import {
  Image as CKImage,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
} from "@ckeditor/ckeditor5-image";
import ImageUploadPlugin from "@ckeditor/ckeditor5-image/src/imageupload";

interface NewsCardViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inew: Record<string, any>;
}

const AnnouncementCardView = ({ inew }: NewsCardViewProps) => {
  return (
    <>
      {/* <div className={classes["ck-content"]}>
        {ReactHtmlParser(inew.content)}
      </div> */}

      <CKEditorContext context={Context}>
        <CKEditor
          disabled={true}
          config={{
            plugins: [
              SimpleUploadAdapter,
              LinkPlugin,
              ParagraphPlugin,
              BlockquotePlugin,
              CKImage,
              ImageCaption,
              ImageResize,
              ImageStyle,
              ImageToolbar,
              ImageUploadPlugin,

              Essentials,
            ],

            toolbar: {
              items: [],
              shouldNotGroupWhenFull: false,
            },
          }}
          editor={ClassicEditor}
          onReady={(editor) => {
            editor.setData(inew.content);
          }}
        />
      </CKEditorContext>
    </>
  );
};
export default AnnouncementCardView;
