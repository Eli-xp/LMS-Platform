"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { clearUser, initializeUser } from "./slices/auth.slice";
import { useRouter } from "next/navigation";
import {
  getCurrentUserOnClient,
  refreshToken,
} from "@/services/auth/auth.client.api";

export default function StoreProvider({
  children,
  user,
}: {
  children: React.ReactNode;
}) {
  // Redux store
  const storeRef = useRef<AppStore | null>(null);
  // Redirect state
  const router = useRouter();

  // create redux store only once
  if (!storeRef.current) {
    console.log("STORE CREATED");
    storeRef.current = makeStore();

    if (user !== null) {
      console.log(`First initialUser HAPPENED!${user}`);
      storeRef.current.dispatch(initializeUser(user));
    }
  }

  useEffect(() => {
    if (user !== null) {
      console.log("user was not null");
      return;
    }

    console.log("StorePtovider:: Server user is null => handleRefresh ");
    const handleRefresh = async () => {
      try {
        // refresh browser session use refresh token
        console.log("StorePtovider:: BERFORE refreshToken Call ");

        const res = await refreshToken();
        if (res.status === 401) {
          console.log("refreshToken is EXPIRED...");
          storeRef.current?.dispatch(clearUser());

          return;
        }

        console.log("StorePtovider:: AFTER refreshToken Call ");
        // get the user using the NEW browser cookie
        const secondTryUser = await getCurrentUserOnClient();
        if (secondTryUser !== null) {
          console.log(`Second initialUser is not null! ${secondTryUser}`);
          storeRef.current?.dispatch(initializeUser(secondTryUser));
          return;
        }

        // Refresh succeeded but auth/me still gets 401
        console.log("StorePtovider:: Second initialUser is null ");

        storeRef.current?.dispatch(clearUser());
      } catch (error) {
        console.error(`StorePtovider:: Refresh Failed, CATCH=> ${error}`);
        storeRef.current?.dispatch(clearUser());
      }
    };
    handleRefresh();
  }, [router, user]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
