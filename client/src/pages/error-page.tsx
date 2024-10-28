import { useRouteError } from "react-router-dom";

type Error = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-center text-muted-foreground">
        {(error as Error)?.message ||
          (error as { statusText?: string })?.statusText}
      </p>
    </div>
  );
}
