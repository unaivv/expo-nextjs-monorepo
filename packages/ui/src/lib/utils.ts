// Utility function for combining CSS classes
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter(Boolean)
    .join(' ');
}

// Example utility function for your custom components
export function formatText(text: string): string {
  return text.trim();
}
