import { Flex } from "@mantine/core";

const BookPdfFileViewer = ({ pdfViewer }: { pdfViewer: string }) => {
  return (
    <Flex justify={"center"} align={"center"}>
      <iframe src={pdfViewer} height="600" width={700}></iframe>
    </Flex>
  );
};
export default BookPdfFileViewer;
