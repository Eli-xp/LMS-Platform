"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { clearUser, initializeUser } from "./slices/auth.slice";
import { useRouter } from "next/navigation";
import { getCurrentUserOnClient } from "@/services/auth/currentUser.client-user";

export default function StoreProvider({
  children,
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
  }

  useEffect(() => {
    console.log("StorePtovider ran ");
    const handleRefresh = async () => {
      try {
        // Get current user on client
        const res = await getCurrentUserOnClient();
        console.log(res);

        console.log(`StorePtovider:: getCurrentUserOnClient ${res}`);
        if (res) {
          storeRef.current?.dispatch(initializeUser(res));
        } else {
          // if !res
          storeRef.current?.dispatch(clearUser());
        }
      } catch (error) {
        console.log(`StorePtovider Failed:: => ${error}`);
        // clear redux
        storeRef.current?.dispatch(clearUser());
      }
    };

    handleRefresh();
  }, [router]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
