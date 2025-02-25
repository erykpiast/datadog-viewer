export async function maybeDecodeDeflate(encoded: string): Promise<string> {
  try {
    const byteArray = new Uint8Array(encoded.length);
    for (let i = 0; i < encoded.length; i++) {
      byteArray[i] = encoded.charCodeAt(i);
  }

  const decompressedStream = new Response(
    new Blob([byteArray])
      .stream()
        .pipeThrough(new DecompressionStream("deflate"))
    );

    return await decompressedStream.text();
  } catch {
    return encoded;
  }
}
