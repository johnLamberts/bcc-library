import { MIN_SIZE_STUDENT_NUMBER } from "src/shared/constant";

export function generateStudentNumber(numVal: number, suffix: string) {
  // const startValue = 0;
  const currentYear = new Date().getFullYear();
  let newNum = numVal.toString();

  for (let num = newNum.length; num < MIN_SIZE_STUDENT_NUMBER; num++) {
    newNum = "0" + newNum;
  }

  const incrementNum = `${suffix}${currentYear}-${newNum}`;

  return incrementNum;
}
