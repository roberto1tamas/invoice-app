import LoginButton from "../components/Login/LoginButton";
import LoginIllustration from "../components/Login/LoginIllustration";
import LogoVector from "../components/ui/LogoVector";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col content-stretch items-center justify-center bg-dark p-4">
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-stretch rounded-xl bg-[#e9e9e9] p-3 sm:flex-row sm:justify-between">
        <section className="flex flex-col items-center justify-center sm:flex-grow sm:basis-3/5 sm:content-stretch sm:px-8 sm:py-10">
          <LoginIllustration className="h-auto w-[calc(100%-4rem)] sm:w-full" />
        </section>
        <section className="flex flex-col items-center rounded-xl bg-white px-2 sm:basis-2/5 sm:px-4 lg:px-16">
          <div className="flex h-full flex-col items-center justify-center">
            <LogoVector className="h-20 w-20 fill-purple " />
            <h1 className="mb-4 mt-4 text-hl text-dark-cinder">Welcome!</h1>
            <p className="text-center text-sm text-grey-regent">
              This app is deployed for portfolio showcase. <br />
              Click the button bellow to be signed in as a new generated user.
            </p>
            <div className="mt-16 w-full">
              <LoginButton />
            </div>

            <div className="mt-2 text-center text-sm text-grey-regent">
              Developed by&nbsp;
              <a
                href="https://github.com/roberto1tamas"
                target="_blank"
                className="hover:text-dark"
              >
                Roberto Tamas
              </a>
              .
            </div>
          </div>

          <div className="mb-4 mt-20 flex w-full flex-row items-end justify-center sm:mt-auto">
            <p className="text-center text-base text-grey-yankees">
              React • TypeScript
              <span> • </span>
              <a href="https://reactrouter.com/en/main" target="_blank">
                React Router
              </a>
              <span> • </span>
              <a href="https://react-hook-form.com/" target="_blank">
                React Hook Form
              </a>
              <span> • </span>
              <a href="https://zod.dev/" target="_blank">
                Zod
              </a>
              <span> • </span>
              <a href="https://fakerjs.dev/" target="_blank">
                Faker
              </a>
              <span> • </span>
              <a href="https://tailwindcss.com/" target="_blank">
                TailwindCSS
              </a>
              <span> • </span>
              <a href="https://headlessui.com/" target="_blank">
                Headless UI
              </a>
              <span> • </span>
              <a href="https://supabase.com/" target="_blank">
                Supabase
              </a>
              <span> • </span>
              <a href="https://vercel.com/" target="_blank">
                Vercel
              </a>
              <span> • </span>
              <a href="https://vitejs.dev/" target="_blank">
                Vite
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
