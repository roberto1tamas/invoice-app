import { useNavigate, useRouteError } from "react-router-dom";
import imgEmpty from "../assets/illustration-empty.svg";
import ButtonGoBack from "../components/ui/ButtonGoBack";

type ErrorPage = {
  statusText: string;
  message: string;
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorPage;

  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <div>
        <img
          src={imgEmpty}
          className="md:w-80"
          alt="Illustration invoice list empty"
        />
      </div>
      <div>
        <h1 className="py-6 text-center text-hm text-dark-cinder dark:text-white">
          Oops!
        </h1>
        <p className="text-center text-grey-regent dark:text-link-water">
          Sorry, an unexpected error has occurred. <br />
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <div>
        <ButtonGoBack onClick={() => navigate("/")} />
      </div>
    </div>
  );
}
