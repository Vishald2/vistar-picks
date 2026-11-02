export function formatPrice(
  price: number,
  marketplace: string
) {
  const locale =
    marketplace === "Amazon.in" ? "en-IN" :
    marketplace === "Amazon.co.uk" ? "en-GB" :
    marketplace === "Amazon.ca" ? "en-CA" :
    "en-US";

    console.log(`formatPrice: price=${price}, marketplace=${marketplace}, locale=${locale}`);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatReviewCount(
  count: number,
  marketplace: string
): string {
  const locale =
    marketplace === "Amazon.in" ? "en-IN" :
    marketplace === "Amazon.co.uk" ? "en-GB" :
    marketplace === "Amazon.ca" ? "en-CA" :
    "en-US";

  return new Intl.NumberFormat(locale).format(count);
}