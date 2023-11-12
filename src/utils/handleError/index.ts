export function handleError(error: Error, message: string): never {
  throw new Error(`${message}: ${error.message}`);
}
