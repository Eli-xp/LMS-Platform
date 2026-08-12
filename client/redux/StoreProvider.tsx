"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { initializeUser } from "./slices/auth.slice";
import { useRouter } from "next/navigation";
import { refreshToken, setSessionExpiredHandler } from "@/services/apiClient";

export default function StoreProvider({
  children,
  user,
  needsRefresh,
}: {
  children: React.ReactNode;
}) {
  // Redux store
  const storeRef = useRef<AppStore | null>(null);
  // Redirect state
  const router = useRouter();
  // Prevent mulitple Session Expired requests
  const handlingSession = useRef(false);

  // create redux store & initialize User
  if (!storeRef.current) {
    console.log("STORE CREATED");
    console.log("INITIAL USER:", user);
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeUser(user));
  }

  // Sync server user
  useEffect(() => {
    console.log(`StoreProvider:: Sync User ${user}`);
    storeRef.current?.dispatch(initializeUser(user));
  }, [user]);

  useEffect(() => {
    if (!needsRefresh) {
      console.log("StorePtovider:: No NEED TO CALL refreshToken ");
      return;
    }

    console.log("StorePtovider:: Called refreshToken ");
    const handleRefresh = async () => {
      try {
        await refreshToken();
        console.log("StorePtovider:: AFTER refreshToken Call ");
        router.refresh();
        console.log("StorePtovider:: SERVER COMPONENT REFRESHHH ");
      } catch (error) {
        console.error(`StorePtovider:: CATCH: ${error}`);
      }
    };

    handleRefresh();
  }, [needsRefresh, router]);

  // if refresh token is also expired::
  // useEffect(() => {
  //   console.log("StoreProvider:: useEffect ran");
  //   setSessionExpiredHandler(() => {
  //     if (handlingSession.current) {
  //       return;
  //     }
  //     handlingSession.current = true;
  //     storeRef.current?.dispatch(clearUser());
  //     console.log("StoreProvider: clearUser ran");
  //     router.replace("/login");
  //   });
  // }, [router]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
