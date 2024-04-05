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
import useNewsDetail from "@features/HomePage/hooks/useReadAnnouncementDetail";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Loader,
  ScrollArea,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";

import "./announcement.module.css";
import { format } from "date-fns";

const AnnouncementDetails = () => {
  const { isLoading, news } = useNewsDetail();

  return (
    <ScrollArea
      scrollbars="y"
      style={{
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
      }}
    >
      <Container mt={"6rem"} size={"md"}>
        {isLoading ? (
          <>
            <Skeleton height={8} radius="xl" />

            <Skeleton height={300} mt="2rem" />

            <Group justify="space-between" align="center" mt={"xs"}>
              <Box>
                <Box my={"xs"}>
                  <Skeleton height={8} radius="xl" />
                </Box>
              </Box>
              <Skeleton height={8} radius="xl" />
              <Divider my={"md"} />

              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
            </Group>
          </>
        ) : (
          <>
            <Title ff={"Montserrat"} fw={"400"}>
              {news?.title}
            </Title>
            <Image mt={"2rem"} src={news?.thumbnail} loading="lazy" h={300} />{" "}
            <Group justify="space-between" align="center" mt={"xs"}>
              <Box>
                <Box my={"xs"}>
                  <Text span>
                    <Flex align={"center"}>
                      <Avatar src={news?.authorImage} /> {news?.firstName}{" "}
                      {news?.lastName}
                    </Flex>
                  </Text>
                </Box>
              </Box>
              <Text>
                Date Posted:{" "}
                {format(
                  new Date(
                    news.createdAt!.seconds * 1000 +
                      news.createdAt!.nanoseconds / 1000
                  ),
                  "MMMM dd yyyy"
                )}
              </Text>
            </Group>
            <Divider my={"md"} />
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
                  editor.setData(news?.content);
                }}
              />
            </CKEditorContext>
          </>
        )}
      </Container>
    </ScrollArea>
  );
};
export default AnnouncementDetails;
