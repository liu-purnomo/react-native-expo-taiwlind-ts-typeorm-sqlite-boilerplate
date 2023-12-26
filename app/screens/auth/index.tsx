import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export default function Auth() {
  const [pageToShow, setPageToShow] = useState<"login" | "register">("login");

  return (
    <>
      {pageToShow === "register" ? (
        <RegisterScreen pageToShow={pageToShow} setPageToShow={setPageToShow} />
      ) : (
        <LoginScreen pageToShow={pageToShow} setPageToShow={setPageToShow} />
      )}
    </>
  );
}
