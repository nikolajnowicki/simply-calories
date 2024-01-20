import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUserData } from "../app/actions/users/fetchUserData";
import { User } from "../models/User";

export function useUserData() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session && session.user && session.user.email) {
      fetchUserData(session.user.email).then((data: User) => setUser(data));
    }
  }, [session]);

  return user;
}
