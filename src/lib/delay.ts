export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomDelay(minMs = 400, maxMs = 900): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  return delay(ms);
}
