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

interface UserImageProps<TData extends MRT_RowData> {
  table?: MRT_TableInstance<TData>;
  row?: MRT_Row<TData>;
}

const UserImageForm = <TData extends MRT_RowData>({
  table,
  row,
}: UserImageProps<TData>) => {
  const { control, setValue, getValues } = useFormContext();
  const [imgSrc, setImgSrc] =
    useState<Partial<null | undefined | string | File>>(null);
  const isEditing = table?.getState().editingRow?.id === row?.id;
  const isNewEntity = !isEditing || !row?.original.avatarImage;
  const hasNewValue = isEditing && row?.original.avatarImage !== imgSrc;

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

  // First
  // const displayCameraImage = useMemo(() => {
  //   return imgSrc instanceof String ? (
  //     <Image src={getValues("avatarImage") || imgSrc} w={250} h={150} />
  //   ) : (
  //     // <Image
  //     //   src={isEditing ? row?.original.avatarImage : getValues("avatarImage")}
  //     //   w={250}
  //     //   h={150}
  //     // />
  //     imgSrc instanceof File && getValues("avatarImage") !== null && (
  //       <Image
  //         src={URL.createObjectURL(getValues("avatarImage"))}
  //         alt="webcam"
  //       />
  //     )
  //   );
  // }, [imgSrc, getValues, isEditing, row?.original.avatarImage]);

  // Second

  // const displayCameraImage = useMemo(() => {
  //   if (isNewEntity) {
  //     return imgSrc instanceof String || typeof imgSrc === "string" ? (
  //       <Image src={getValues("avatarImage")} w={250} h={150} />
  //     ) : (
  //       imgSrc instanceof File && getValues("avatarImage") !== null && (
  //         <Image
  //           src={URL.createObjectURL(getValues("avatarImage"))}
  //           alt="webcam"
  //         />
  //       )
  //     );
  //   }
  //   if (hasNewValue) {
  //     return imgSrc instanceof String || typeof imgSrc === "string" ? (
  //       <Image
  //         src={
  //           isEditing === null
  //             ? row?.original.avatarImage
  //             : getValues("avatarImage")
  //         }
  //         w={250}
  //         h={150}
  //       />
  //     ) : (
  //       imgSrc instanceof File && getValues("avatarImage") !== null && (
  //         <Image
  //           src={URL.createObjectURL(getValues("avatarImage") || imgSrc)}
  //           alt="webcam"
  //         />
  //       )
  //     );

  //     //    return isNewEntity || hasNewValue ? (

  //     // );
  //   }
  // }, [imgSrc, getValues, hasNewValue, isNewEntity, row?.original.avatarImage]);

  // useEffect(() => {
  //   if (isNewEntity) {
  //     if (imgSrc === typeof File && imgSrc !== null) {
  //       setValue("avatarImage", imgSrc);
  //     }

  //     if (imgSrc !== "") {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       setValue("avatarImage", imgSrc as any);
  //     }
  //   }

  //   if (hasNewValue) {
  //     if (imgSrc === typeof File && imgSrc === null) {
  //       setValue("avatarImage", imgSrc);
  //     }

  //     if (imgSrc !== "") {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       setValue("avatarImage", imgSrc as any);
  //     }
  //   }
  // }, [setValue, imgSrc, isNewEntity, hasNewValue]);

  const displayCameraImage = useMemo(() => {
    if (isNewEntity) {
      // For a new entity, display the current value or the default placeholder
      // Check if the updated value is a File
      if (imgSrc instanceof File) {
        return (
          <Image
            src={URL.createObjectURL(getValues("studentImage") || imgSrc)}
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
      // Check if the updated value is a data URL
      if (typeof imgSrc === "string" && imgSrc.startsWith("data:image")) {
        return <Image src={imgSrc} w={250} h={150} />;
      }

      // Check if the updated value is a File
      if (imgSrc instanceof File) {
        return (
          <Image
            src={URL.createObjectURL(getValues("avatarImage"))}
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
      const updatedValue = getValues("avatarImage") || imgSrc;

      if (imgSrc instanceof File && imgSrc !== null) {
        setValue("avatarImage", updatedValue);
      } else if (
        typeof imgSrc === "string" &&
        imgSrc.startsWith("data:image")
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue("avatarImage", imgSrc as any);
      }
    } else {
      console.log("its nothing here");
      // If it's not a new entity and there's no new value, set the previous value
      setValue("avatarImage", row?.original.avatarImage || null);
    }
  }, [
    setValue,
    imgSrc,
    isNewEntity,
    hasNewValue,
    row?.original.avatarImage,
    getValues,
  ]);

  return (
    <>
      <Form.Box mt={"md"}>
        <Form.Title>User Image</Form.Title>
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

              {row?.original.avatarImage === getValues("avatarImage") &&
              isEditing ? (
                <Image src={getValues("avatarImage")} w={250} h={150} />
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
                    name="avatarImage"
                    render={({ field: { onChange, ...field } }) => (
                      <FileInput
                        onChange={(e) => {
                          handleImageChange(e);
                          onChange(e);
                        }}
                        {...field}
                        label="Student Image"
                      />
                    )}
                  />
                </Tabs.Panel>
              </Box>
            </Tabs>
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
export default UserImageForm;
