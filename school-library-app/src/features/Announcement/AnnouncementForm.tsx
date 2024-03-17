import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const SAMPLE_READ_ONLY_LOCK_ID = "Integration Sample";

type EditorDemoProps = {
  content: string;
};

type EditorDemoState = {
  documents: Array<string>;
  documentID: number;
  editor: ClassicEditor | null;
};

export default function AnnouncementForm() {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        onReady={() => {}}
        config={{
          simpleUpload: {
            uploadUrl: "https://myserver.herokuapp.com/image-upload",
          },
        }}
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
    </>
  );
}
