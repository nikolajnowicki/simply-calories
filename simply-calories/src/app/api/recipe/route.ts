const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_RECIPE_ID;
const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_RECIPE_KEY;

const BASE_URL = "https://api.edamam.com/api/recipes/v2";

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

  const url = `${BASE_URL}?type=public&q=${encodeURIComponent(
    query
  )}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        "Edamam API responded with error:",
        response.status,
        errorBody
      );
      throw new Error(
        `Failed to fetch data from Edamam API. Status: ${response.status}`
      );
    }
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
