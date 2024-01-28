/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";

type TContextFormProps = {
  bookType?: string | null;
  setBookType?: (e: string | null) => void;
  roleType?: string | null;
  setRoleType?: (e: string | null) => void;
  children?: React.ReactNode;
};

type TContextFormState = TContextFormProps;

export const CatalogContext = createContext<TContextFormState>(
  {} as TContextFormState
);

const CatalogueFormContext = ({
  bookType,
  setBookType,
  setRoleType,
  roleType,
  children,
}: Partial<TContextFormProps>) => {
  return (
    <CatalogContext.Provider
      value={{ bookType, setBookType, setRoleType, roleType }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogueContext = () => {
  const context = useContext(CatalogContext);

  if (context === undefined)
    throw new Error(
      "useContext must used only within the CatalogueFormContext"
    );

  return context;
};
export default CatalogueFormContext;
