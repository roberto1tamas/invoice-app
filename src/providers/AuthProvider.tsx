import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../services/supabase";
import { Session, User } from "@supabase/supabase-js";

const initialState: AuthState = { session: null, user: null };

export type AuthState = {
  session: Session | null;
  user: User | null;
};

export type AuthStateContext = {
  supabase: typeof supabase;
  authState: AuthState;
  handleSetAuthState: (newAuthState: AuthState) => void;
};

export const AuthContext = createContext<AuthStateContext>({
  supabase,
  authState: initialState,
  handleSetAuthState: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const handleSetAuthState = (newAuthState: AuthState) => {
    const session = newAuthState.session;
    setAuthState({ session, user: session?.user ?? null });

    //console.log("Setting session: ", session, " user: ", session?.user);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetAuthState({ session, user: session?.user ?? null });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetAuthState({ session, user: session?.user ?? null });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ supabase, authState, handleSetAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
