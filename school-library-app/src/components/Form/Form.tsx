import {
  Box,
  Code,
  Grid as WrapperGrid,
  GridProps,
  GridColProps,
  ButtonProps,
  Button,
  BoxProps,
  Flex,
} from "@mantine/core";
import React from "react";
///home/johnlambert/Desktop/mini-js/index.js

export default function Form({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{children}</form>;
}

Form.Box = function FormBox({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement> &
  BoxProps) {
  return <Box {...props}>{children}</Box>;
};

Form.Title = function FormTitle({ children }: { children: React.ReactNode }) {
  return <Code m={"lg"}>{children}</Code>;
};

Form.Grid = function FormGrid({
  children,
  ...props
}: { children: React.ReactNode } & GridProps) {
  return <WrapperGrid {...props}>{children}</WrapperGrid>;
};

Form.Col = function FormCol({
  children,
  ...props
}: { children: React.ReactNode } & GridColProps) {
  return <WrapperGrid.Col {...props}>{children}</WrapperGrid.Col>;
};

Form.SubmitButton = function SubmitButton({
  alias,
  ...props
}: {
  alias?: React.ReactNode;
} & ButtonProps &
  React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <Flex gap={"md"}>
        <Button {...props} type="submit" variant="light">
          {!alias && "Submit"}
          {alias && alias}
        </Button>
      </Flex>
    </>
  );
};

// Form.Input = function Input(
//   props: TextInputProps & React.HTMLAttributes<HTMLInputElement>
// ) {
//   return (
//     <>
//       <TextInput {...props} />
//     </>
//   );
// };
