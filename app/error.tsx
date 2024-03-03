"use client";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error", error);

  return (
    <>
      <div>An unexpected error has occurred.</div>
      <Button onClick={() => reset()}>Retry</Button>
    </>
  );
};

export default ErrorPage;
