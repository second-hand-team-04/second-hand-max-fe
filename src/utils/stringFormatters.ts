export function formatAsPrice(input: string) {
  const extractedDigits = input.replace(/[^0-9]/g, "");

  const formattedPrice = extractedDigits
    ? parseInt(extractedDigits).toLocaleString("en-US")
    : "";

  return formattedPrice;
}

export function keepLastNeighborhood(address: string): string {
  const parts = address.split(" ");

  return parts[parts.length - 1];
}
