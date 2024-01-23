import Form from "@components/Form/Form";
import {
  Modal,
  Badge,
  Divider,
  Box,
  Button,
  Container,
  Group,
  Image,
  Tabs,
  FileInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhoto, IconArrowRight } from "@tabler/icons-react";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Webcam from "react-webcam";

interface BookImageProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
}

const BookImageForm = <TData extends MRT_RowData>({
  table,
  row,
}: BookImageProps<TData>) => {
  const { control, setValue, getValues } = useFormContext();
  const [imgSrc, setImgSrc] =
    useState<Partial<null | undefined | string | File>>(null);
  const isEditing = table?.getState().editingRow?.id === row?.id;
  const isNewEntity = !isEditing || !row?.original.bookImageCover;
  const hasNewValue = isEditing && row?.original.bookImageCover !== imgSrc;

  const [opened, { open, close }] = useDisclosure(false);

  const [optionAttachment, setOptionAttachment] = useState<string | null>(
    "camera-built-in"
  );

  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
  };

  const retake = () => setImgSrc(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const handleImageChange = (payload: File | null) => {
    setImgSrc(null);
    if (payload !== null) {
      setImgSrc(payload);
    }
  };

  const cameraAttach = optionAttachment === "camera-built-in" && (
    <>
      {typeof imgSrc === "string" ? (
        <>
          <img src={imgSrc} alt="webcam" />
        </>
      ) : (
        <Webcam
          videoConstraints={videoConstraints}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      <Group>
        <Button color="red" variant="light" onClick={retake}>
          Retake photo
        </Button>

        {!imgSrc || typeof imgSrc !== "string" ? (
          <Button color="red" onClick={capture}>
            Capture photo
          </Button>
        ) : null}

        {typeof imgSrc === "string" && (
          <Button color="red" onClick={close}>
            Save photo
          </Button>
        )}
      </Group>
    </>
  );
  const displayCameraImage = useMemo(() => {
    if (isNewEntity) {
      // For a new entity, display the current value or the default placeholder
      // Check if the updated value is a File
      if (imgSrc instanceof File) {
        return (
          <Image
            src={URL.createObjectURL(getValues("bookImageCover") || imgSrc)}
            alt="webcam"
          />
        );
      }

      if (typeof imgSrc === "string" && imgSrc.startsWith("data:image")) {
        return <Image src={imgSrc} w={250} h={150} />;
      }

      return null;
    }

    if (hasNewValue) {
      // const updatedValue = getValues("bookImageCover") || imgSrc;

      // Check if the updated value is a data URL
      if (typeof imgSrc === "string" && imgSrc.startsWith("data:image")) {
        return <Image src={imgSrc} w={250} h={150} />;
      }

      // Check if the updated value is a File
      if (imgSrc instanceof File) {
        return (
          <Image
            src={URL.createObjectURL(getValues("bookImageCover") || imgSrc)}
            alt="webcam"
          />
        );
      }

      // Return null or a placeholder for unsupported types
      return null;
    }

    // If none of the conditions match, return null or a placeholder
    return null;
  }, [imgSrc, getValues, hasNewValue, isNewEntity]);

  useEffect(() => {
    if (isNewEntity || hasNewValue) {
      const updatedValue = getValues("bookImageCover") || imgSrc;

      if (imgSrc instanceof File && imgSrc !== null) {
        setValue("bookImageCover", updatedValue);
      } else if (
        typeof imgSrc === "string" &&
        imgSrc.startsWith("data:image")
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue("bookImageCover", imgSrc as any);
      }
    } else {
      console.log("its nothing here");
      // If it's not a new entity and there's no new value, set the previous value
      setValue("bookImageCover", row?.original.bookImageCover || null);
    }
  }, [
    setValue,
    imgSrc,
    isNewEntity,
    hasNewValue,
    row?.original.bookImageCover,
    getValues,
  ]);

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>Book Image</Form.Title>
        <Form.Grid p={"lg"}>
          <Form.Col span={{ base: 12 }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {optionAttachment !== "" && displayCameraImage}

              {row?.original.bookImageCover === getValues("bookImageCover") &&
              isEditing ? (
                <Image src={getValues("bookImageCover")} w={250} h={150} />
              ) : null}
            </Box>

            <Tabs
              defaultValue={optionAttachment}
              onChange={setOptionAttachment}
              maw={"100vw"}
              color="red.8"
            >
              <Tabs.List>
                <Tabs.Tab value="camera-built-in">Take a picture</Tabs.Tab>
                <Tabs.Tab value="upload-file-built-in">Upload File</Tabs.Tab>
              </Tabs.List>

              <Box mt={"md"}>
                <Tabs.Panel value="camera-built-in">
                  <Button
                    variant="outline"
                    leftSection={<IconPhoto size={14} />}
                    rightSection={<IconArrowRight size={14} />}
                    fullWidth
                    color="red"
                    onClick={open}
                  >
                    Take a picture
                  </Button>
                </Tabs.Panel>

                <Tabs.Panel value="upload-file-built-in">
                  <Controller
                    control={control}
                    name="bookImageCover"
                    render={({ field: { onChange, ...field } }) => (
                      <FileInput
                        onChange={(e) => {
                          handleImageChange(e);
                          onChange(e);
                        }}
                        {...field}
                        label="Book Image"
                        placeholder={"Upload your document (JPEG, OR PNG)"}
                        accept="image/png,image/jpeg"
                      />
                    )}
                  />
                </Tabs.Panel>
              </Box>
            </Tabs>
          </Form.Col>

          <Form.Col span={{ base: 12 }} mt={"md"}>
            <Controller
              control={control}
              name="bookFile"
              render={({ field }) => (
                <FileInput
                  description={
                    "A books that has a soft-copy can be put here but only the abstract. (Optional)"
                  }
                  accept="application/pdf"
                  label="Book File"
                  placeholder={"Upload your document (PDF)"}
                  {...field}
                />
              )}
            />
          </Form.Col>
        </Form.Grid>
      </Form.Box>
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        title={
          <>
            <Badge variant="light" color="red">
              Attachment Options
            </Badge>
          </>
        }
        centered
        size={"xl"}
      >
        <Divider />

        <Box>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
            m={"sm"}
          >
            {cameraAttach}
          </Container>
        </Box>
      </Modal>
    </>
  );
};
export default BookImageForm;
