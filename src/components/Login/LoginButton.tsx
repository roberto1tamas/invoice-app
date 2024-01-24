import { useContext, useState } from "react";
import Button from "../ui/Button";

import { getFakerUser } from "../../utils/utils";
import { AuthContext } from "../../providers/AuthProvider";
import { signUpNewUser } from "../../services/supabase";

export default function LoginButton() {
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Login as demo user");

  const { handleSetAuthState } = useContext(AuthContext);

  const handleLoggin = async () => {
    setIsLogging(true);
    setButtonText("Generating a new user..");

    const { email, password } = getFakerUser();

    try {
      const { data, error } = await signUpNewUser(email, password);

      if (error) {
        setButtonText(error.message);
        return;
      }

      handleSetAuthState(data);
    } catch (error) {
      throw new Error(`Something went wrong in signUpNewUser: ${error}`);
    }
  };

  return (
    <Button
      color={isLogging ? "dark" : "purple"}
      onClick={handleLoggin}
      showSpinner={isLogging}
      disabled={isLogging}
      fullWidth
    >
      {buttonText}
    </Button>
  );
}
