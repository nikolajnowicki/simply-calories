export const fetchUserData = async (userEmail: string) => {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });
    if (res.ok) {
      return await res.json();
    } else {
      console.error("Failed to fetch user data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
