export function getMarketplace(countryCode: string | null): string {
  switch (countryCode) {
    case "US":
      return "Amazon.com";

    case "IN":
      return "Amazon.in";

    case "FR":
      return "Amazon.fr";

    default:
      return "Amazon.com";
  }
}