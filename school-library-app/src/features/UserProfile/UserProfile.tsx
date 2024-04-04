import { IStudents } from "@features/Student/models/student.interface";
import {
  rem,
  Text,
  Image,
  Group,
  Box,
  ThemeIcon,
  Paper,
  Flex,
  List,
  Title,
  Button,
  Skeleton,
} from "@mantine/core";
import { IconAddressBook } from "@tabler/icons-react";

const UserProfile = ({
  user,
  handleClickParams,
  isLoading,
}: {
  user: IStudents | undefined;
  handleClickParams?: (_params: string) => void;
  isLoading?: boolean;
}) => {
  return (
    <Box my={"xs"}>
      <Paper withBorder shadow="xs" p="md">
        {isLoading ? (
          <>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </>
        ) : (
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Image
              src={
                user?.studentImage
                  ? user?.studentImage
                  : "https://firebasestorage.googleapis.com/v0/b/library-management-syste-fb3e9.appspot.com/o/def_user.png?alt=media&token=b3ea39b4-cba7-4095-8e6c-6996848f0391"
              }
              height={"5rem"}
              w={"5rem"}
              loading="lazy"
            />

            <Box>
              <Text fz="lg" mt="sm" fw={500} ff={"Montserrat"}>
                {user?.firstName} {user?.middleName} {user?.lastName}
              </Text>
              <Text c="dimmed" ta={"center"} fz="xs" ff={"Montserrat"}>
                Name
              </Text>
            </Box>

            <Box>
              <Text fz="lg" mt="sm" fw={500} ff={"Montserrat"}>
                {user?.userRole === "Student" &&
                  (user as IStudents)?.studentNumber}
              </Text>
              <Text c="dimmed" ta={"center"} fz="xs" ff={"Montserrat"}>
                Student Number
              </Text>
            </Box>
          </Flex>
        )}

        <Group gap={"0.8rem"} mt="xs" align="center" justify="center">
          <Button
            disabled={isLoading}
            variant="outline"
            color="red.8"
            size="xs"
            onClick={() => handleClickParams?.("edit_profile")}
          >
            Edit Profile
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            color="yellow.8"
            size="xs"
            onClick={() => handleClickParams?.("change_password")}
          >
            Change Password
          </Button>
        </Group>
      </Paper>

      <Paper withBorder shadow="xs" p="md" mt={"xs"}>
        {isLoading ? (
          <>
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </>
        ) : (
          <>
            <Title order={5} fw="400" mt={"xs"} mb={"xs"}>
              Education Info
            </Title>
            <List spacing="sm" size="sm">
              <List.Item
                ff={"Montserrat"}
                icon={
                  <ThemeIcon size={20} radius="xl" color="yellow">
                    <IconAddressBook
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <b>Education</b> – {user?.levelOfEducation}
              </List.Item>

              <List.Item
                ff={"Montserrat"}
                icon={
                  <ThemeIcon size={20} radius="xl" color="yellow">
                    <IconAddressBook
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <b>Academic Course</b> –{" "}
                {user?.academicCourse ? user?.academicCourse : "N/A"}
              </List.Item>

              <List.Item
                ff={"Montserrat"}
                icon={
                  <ThemeIcon size={20} radius="xl" color="yellow">
                    <IconAddressBook
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <b>Grade Level</b> –{" "}
                {user?.gradeLevel ? user?.gradeLevel : "N/A"}
              </List.Item>

              <List.Item
                ff={"Montserrat"}
                icon={
                  <ThemeIcon size={20} radius="xl" color="yellow">
                    <IconAddressBook
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <b>Grade Section</b> –{" "}
                {user?.gradeSection ? user?.gradeSection : "N/A"}
              </List.Item>
            </List>
          </>
        )}
      </Paper>
    </Box>
  );
};
export default UserProfile;
