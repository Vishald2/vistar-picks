export function getMarketplace(countryCode: string | null): string {
  if (countryCode === "IN") {
    return "Amazon.in";
  }

  return "Amazon.com";
}