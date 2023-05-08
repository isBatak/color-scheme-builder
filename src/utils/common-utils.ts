export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error(`Error copying "${text}" to clipboard:`, err);
    return false;
  }
}
