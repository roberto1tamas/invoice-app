import { ComponentPropsWithoutRef } from "react";

export function IconPlus({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
        fillRule="nonzero"
      />
    </svg>
  );
}

export function IconArrowRight({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      className="stroke-purple"
      {...props}
      width="7"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1l4 4-4 4" strokeWidth="2" fill="none" fillRule="evenodd" />
    </svg>
  );
}

export function IconArrowLeft({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} width="7" height="10" xmlns="http://www.w3.org/2000/svg">
      <path
        className="stroke-purple"
        d="M6.342.886L2.114 5.114l4.228 4.228"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function IconArrowDown({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} width="11" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1l4.228 4.228L9.456 1"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function IconCheck({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} width="10" height="8" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 4.5l2.124 2.124L8.97 1.28"
        stroke="#FFF"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}
export function IconDelete({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} width="13" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
        fillRule="nonzero"
      />
    </svg>
  );
}

export function IconLogout({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" strokeWidth="2"></path>
      <path d="M16 4L8 12" strokeWidth="2"></path>
      <path d="M8 6H4V16H14V12" strokeWidth="2"></path>
    </svg>
  );
}

export function IconSpinner() {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function IconInfo({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
    </svg>
  );
}
