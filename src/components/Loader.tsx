import { useEffect, useState } from "react";

type LoadingProp = {
  children: React.ReactNode;
  delayMs?: number;
};

const Loading = ({ children, delayMs }: LoadingProp): JSX.Element => {
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setIsShowing(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);
  return <> {isShowing && <div>{children}</div>}</>;
};

export default Loading;
