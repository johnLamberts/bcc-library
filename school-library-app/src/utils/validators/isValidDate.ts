export default function isValidDate(dateString: number): boolean {
  const dateObject = new Date(dateString + new Date().getTime());
  return (
    !isNaN(dateObject.getTime()) && dateObject.toString() !== "Invalid Date"
  );
}
