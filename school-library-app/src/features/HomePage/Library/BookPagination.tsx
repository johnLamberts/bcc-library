import { Box, Button, Group, Pagination, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "src/shared/constant";

interface BookPaginationProps {
  count?: number;
}

const BookPagination = ({ count }: BookPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count! / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));

    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  //   if (pageCount <= 1) return null;
  return (
    <div>
      <Group justify="space-between">
        <Text>
          Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
          <span>
            {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
          </span>{" "}
          of <span>{count}</span> results
        </Text>
        <Box>
          <Button
            leftSection={<IconChevronLeft />}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <span>Previous</span>
          </Button>
          <Button
            leftSection={<IconChevronRight />}
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <span>Next</span>
          </Button>
        </Box>
      </Group>
    </div>
  );
};
export default BookPagination;
