import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types/index";
import { useState } from "react";

const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Reestablecer Contraseña
      </h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-white-500 font-bold">por email</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}

      <footer className="py-5">
        <p className="text-center text-white">
          Todos los Derechos Reservados {new Date().getFullYear()} &copy; INEGI
        </p>
      </footer>
    </>
  );
};

export default NewPasswordView;
