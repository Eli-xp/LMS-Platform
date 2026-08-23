"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { clearUser, initializeUser, setUser } from "./slices/auth.slice";
import { useRouter } from "next/navigation";
import { getCurrentUserOnClient } from "@/services/auth/currentUser.client-user";

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
      console.log(`received user from server!${user}`);
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

        const res = await getCurrentUserOnClient();
        console.log(res);
        if (res.status === 401) {
          console.log("refreshToken is EXPIRED...");
          storeRef.current?.dispatch(clearUser());
          return;
        }

        console.log(`StorePtovider:: getCurrentUserOnClient ${res}`);
        storeRef.current?.dispatch(setUser(res));
      } catch (error) {
        console.error(`StorePtovider:: Refresh Failed, CATCH=> ${error}`);
        storeRef.current?.dispatch(clearUser());
      }
    };
    handleRefresh();
  }, [router, user]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
