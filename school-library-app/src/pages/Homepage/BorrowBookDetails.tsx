import useCurrentUser from "@pages/Authentication/hooks/useCurrentUser";

const BorrowBookDetails = () => {
  const { user } = useCurrentUser();

  return <>{user === undefined ? <>You need to login first</> : <>Borrow</>}</>;
};
export default BorrowBookDetails;
