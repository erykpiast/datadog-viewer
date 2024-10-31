export function formatDuration(durationMs: number): string {
  if (durationMs < 10000) {
    return `${Math.round(durationMs)} ms`;
  } else if (durationMs < 60000) {
    const seconds = Number(durationMs / 1000).toFixed(2);
    return `${seconds} s`;
  } else {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes} m ${seconds} s`;
  }
}
