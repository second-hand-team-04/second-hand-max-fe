export function formatAsPrice(input: string) {
  const extractedDigits = input.replace(/[^0-9]/g, "");

  const formattedPrice = extractedDigits
    ? parseInt(extractedDigits).toLocaleString("en-US")
    : "";

  return formattedPrice;
}
