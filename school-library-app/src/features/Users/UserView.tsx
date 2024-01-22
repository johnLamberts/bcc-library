import { Modal, Badge, Divider } from "@mantine/core";

interface UserViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: Record<string, any>;
}
export default function UserView({ user }: UserViewProps) {
  return (
    <>
      <Modal.Header>
        <Badge
          radius={"sm"}
          bg={" var(--mantine-color-green-light)"}
          color={" var(--mantine-color-green-light-color)"}
        >
          {user?.role}
        </Badge>
        <Modal.CloseButton />
      </Modal.Header>
      <Divider />
      <Modal.Body></Modal.Body>
    </>
  );
}
