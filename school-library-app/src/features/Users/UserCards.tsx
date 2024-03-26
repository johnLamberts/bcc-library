import { Search } from "@components/Search/Search";
import { Divider, Grid } from "@mantine/core";
import UserList from "./UserList";
import useReadCardUsers from "./hooks/useReadCardUsers";
import { PAGE_SIZE } from "src/shared/constant";
import BookPagination from "@features/HomePage/Library/BookPagination";
import SelectUserRole from "./SelectUserRole";
import SelectUserStatus from "./SelectUserStatus";
const UserCards = () => {
  const { usersData, isLoading, count } = useReadCardUsers();
  // const [getId, setGetId] = useState("");

  // const filterStudentData = studentData?.filter(
  //   (user: IStudents) => user.id === getId
  // )[0];

  // const memoizedCards = useMemo(() => {
  //   return (
  //     searchParams.get("view") === "by-cards" && (
  //       <Box my={"xl"}>
  //         {/* gutter={{ base: 12, xs: "md", md: "lg", xl: 5 }} */}
  //         <Grid>
  //           {isLoading && <>Loading...</>}
  //           {studentData?.map((user, index) => (
  //             <StudentBox
  //               key={index}
  //               user={user}
  //               filterStudentData={filterStudentData}
  //               setGetId={setGetId}
  //             />
  //           ))}
  //         </Grid>
  //       </Box>
  //     )
  //   );
  // }, [studentData, isLoading, searchParams, filterStudentData]);

  return (
    <>
      <Divider my={"sm"} />

      <Grid my={"xs"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Search keyWords="Search by email" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <SelectUserRole />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <SelectUserStatus />
        </Grid.Col>
      </Grid>
      <BookPagination
        count={count}
        isLoading={isLoading}
        PAGE_SIZE={PAGE_SIZE}
      />
      <Grid>
        <UserList users={usersData} />
      </Grid>

      {/* <Modal.Root
        opened={opened}
        onClose={close}
        centered
        size={"xl"}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Add Announcement</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <AnnouncementForm close={close} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root> */}
    </>
  );
};
export default UserCards;
