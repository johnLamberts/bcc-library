/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import { Context } from "@ckeditor/ckeditor5-core";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
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
import { Font } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import {
  Box,
  Button,
  FileInput,
  Flex,
  Image,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { Alignment } from "@ckeditor/ckeditor5-alignment"; // Importing the package.
import { TextTransformation } from "@ckeditor/ckeditor5-typing";

import "./styles/ck-editor.css";
import { Controller, useForm } from "react-hook-form";
import Form from "@components/Form/Form";
import { useEffect, useState } from "react";
import MyUploadAdapter from "./services/customize-upload-adapter.service";
import { useCreateAnnouncement } from "./hooks/useCreateAnnouncement";
import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

interface AnnouncementFormProps {
  close?: () => void;
}

export default function AnnouncementForm({ close }: AnnouncementFormProps) {
  const form = useForm();

  const { isCreatingNews, createNews } = useCreateAnnouncement();

  const { user } = useCurrentUser();

  const [imgSrc, setImgSrc] =
    useState<Partial<null | undefined | string | File>>(null);

  const handleImageChange = (payload: File | null) => {
    setImgSrc(null);
    if (payload !== null) {
      setImgSrc(payload);
    }
  };

  const handleSubmit = async (payload: Record<string, any>) => {
    const values = {
      ...payload,
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
      authorImage: user?.avatarImage,
    };
    await createNews(values);

    close?.();
  };

  useEffect(() => {
    form.register("content");
  }, [form]);

  return (
    <>
      <LoadingOverlay
        visible={isCreatingNews}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Box pos={"relative"}>
        <div className="editor-wrapper">
          <Form onSubmit={form.handleSubmit(handleSubmit)}>
            <Form.Box>
              <Form.Grid>
                <Form.Col>
                  <TextInput
                    {...form.register("title", {
                      required: "This field is required",
                    })}
                    label="Post Title"
                    placeholder="Title"
                    withAsterisk
                  />
                </Form.Col>

                <Form.Col>
                  <Controller
                    name="newsCategory"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Select
                          label="News Category"
                          placeholder="Pick value"
                          data={["React", "Angular", "Vue", "Svelte"]}
                          {...field}
                        />
                      );
                    }}
                  />
                </Form.Col>

                <Form.Col>
                  <Controller
                    name="thumbnail"
                    control={form.control}
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <FileInput
                          onChange={(e) => {
                            handleImageChange(e);
                            onChange(e);
                          }}
                          {...field}
                          placeholder="Thumbnail"
                          label="News Thumbnail"
                        />
                      );
                    }}
                  />

                  {imgSrc instanceof File ? (
                    <>
                      <Flex justify={"center"} align={"center"}>
                        <Image
                          src={URL.createObjectURL(
                            form.getValues("thumbnail") || imgSrc
                          )}
                          h={"8rem"}
                          w={"10rem"}
                          fit="cover"
                          alt="webcam"
                        />
                      </Flex>

                      <Button
                        variant="light"
                        size="xs"
                        onClick={() => setImgSrc(null)}
                      >
                        Reset image
                      </Button>
                    </>
                  ) : null}
                </Form.Col>
                <Form.Col>
                  <Text size="sm" py={"xs"}>
                    Post Content
                  </Text>
                  <CKEditorContext context={Context}>
                    <CKEditor
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
                      onChange={(_, editor) => {
                        const value = editor.getData();
                        console.log(editor.getData());

                        form.setValue("content", value);
                      }}
                    />
                  </CKEditorContext>{" "}
                </Form.Col>
              </Form.Grid>
            </Form.Box>

            <Flex justify="flex-end" gap={"xs"} mt={"sm"}>
              <Button type="submit">Save</Button>
            </Flex>
          </Form>
        </div>
      </Box>
    </>
  );
}
