import { useEffect } from "react";

export function useHeadTitle(title: string | "OPAC BCC Library") {
  useEffect(() => {
    const originalTitle = document.title;

    if (title && title.trim() !== "") {
      document.title = title;
    }

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
