export async function detectCountry(): Promise<string | null> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data: { country_code?: string } = await response.json();

    console.log("Detected country code:", data.country_code);

    return data.country_code?.toUpperCase() ?? null;
  } catch {
    return null;
  }
}