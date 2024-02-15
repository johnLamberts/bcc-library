import { IStudents } from "@features/Student/models/student.interface";
import { ITeacher } from "@features/Teachers/models/teacher.interface";
import {
  rem,
  Grid,
  SimpleGrid,
  Text,
  Image,
  Group,
  Box,
  ThemeIcon,
} from "@mantine/core";
import classes from "@pages/ProfilePage/profile-page.module.css";
import { IconAt, IconUser, IconNumber } from "@tabler/icons-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserProfile = ({ user }: { user: IStudents | ITeacher | undefined }) => {
  // const items = features.map((feature) => (
  //   <div key={feature.title}>
  //     <Group>
  //       <ThemeIcon size={28} radius="md" variant="light" color="#5C0505">
  //         <feature.icon
  //           style={{ width: rem(24), height: rem(24) }}
  //           stroke={1.5}
  //         />
  //       </ThemeIcon>
  //       <Box>
  //         <Text fz="lg" mt="sm" fw={500}>
  //           {feature.title}
  //         </Text>
  //         <Text c="dimmed" fz="sm">
  //           {feature.description}
  //         </Text>
  //       </Box>
  //     </Group>
  //   </div>
  // ));
  return (
    <div className={classes.wrapper}>
      <Grid align="center">
        <Grid.Col span={{ base: 12, md: 5, lg: 3 }}>
          <Image
            src={
              (user as IStudents)?.studentImage ||
              (user as ITeacher)?.teacherImage
            }
            radius={"md"}
            height={"150rem"}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7, lg: 9 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            <Group>
              <ThemeIcon size={28} radius="md" variant="light" color="#5C0505">
                <IconAt
                  style={{ width: rem(24), height: rem(24) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Box>
                <Text fz="lg" mt="sm" fw={500}>
                  {user?.email}
                </Text>
                <Text c="dimmed" fz="sm">
                  Email
                </Text>
              </Box>
            </Group>

            <Group>
              <ThemeIcon size={28} radius="md" variant="light" color="#5C0505">
                <IconUser
                  style={{ width: rem(24), height: rem(24) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Box>
                <Text fz="lg" mt="sm" fw={500}>
                  {user?.firstName} {user?.middleName} {user?.lastName}
                </Text>
                <Text c="dimmed" fz="sm">
                  Full Name
                </Text>
              </Box>
            </Group>

            <Group>
              <ThemeIcon size={28} radius="md" variant="light" color="#5C0505">
                <IconNumber
                  style={{ width: rem(24), height: rem(24) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Box>
                <Text fz="lg" mt="sm" fw={500}>
                  {user?.userRole === "Student" &&
                    (user as IStudents)?.studentNumber}
                  {user?.userRole === "Teacher" &&
                    (user as ITeacher)?.teacherNumber}
                </Text>
                <Text c="dimmed" fz="sm">
                  Student Number
                </Text>
              </Box>
            </Group>

            <Group>
              <ThemeIcon size={28} radius="md" variant="light" color="#5C0505">
                <IconNumber
                  style={{ width: rem(24), height: rem(24) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Box>
                <Box>
                  <Text fz="lg" mt="sm" fw={500}>
                    {user?.levelOfEducation}
                    <br />
                    {user?.gradeLevel && `${user.gradeLevel} - ` && <br />}
                    {user?.gradeSection && user.gradeSection}

                    {user?.academicCourse && user.academicCourse}
                  </Text>
                </Box>
                <Text c="dimmed" fz="sm">
                  Education
                </Text>
              </Box>
            </Group>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
};
export default UserProfile;
