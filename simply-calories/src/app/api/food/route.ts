const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;

const BASE_URL = "https://api.edamam.com/api/food-database/v2/parser";

export async function GET(request: Request) {
  const urlParams = new URL(request.url).searchParams;
  const query = urlParams.get("query");

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const url = `${BASE_URL}?ingr=${encodeURIComponent(
    query
  )}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Edamam API");
    }
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching food data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
