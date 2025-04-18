import { Decoder } from "./Decoder";
import { ensureAsyncIterable } from "./utils/stream";
import type { DecoderOptions } from "./Decoder";
import type { ReadableStreamLike } from "./utils/stream";
import type { SplitUndefined } from "./context";

/**
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
export async function decodeAsync<ContextType = undefined>(
  streamLike: ReadableStreamLike<ArrayLike<number> | Uint8Array | ArrayBufferView | ArrayBuffer>,
  options?: DecoderOptions<SplitUndefined<ContextType>>,
): Promise<unknown> {
  const stream = ensureAsyncIterable(streamLike);
  const decoder = new Decoder(options);
  return decoder.decodeAsync(stream as AsyncIterable<ArrayLike<number> | Uint8Array | ArrayBufferView | ArrayBuffer>);
}

/**
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
export function decodeArrayStream<ContextType>(
  streamLike: ReadableStreamLike<ArrayLike<number> | Uint8Array | ArrayBufferView | ArrayBuffer>,
  options?: DecoderOptions<SplitUndefined<ContextType>>,
): AsyncGenerator<unknown, void, unknown> {
  const stream = ensureAsyncIterable(streamLike);
  const decoder = new Decoder(options);
  return decoder.decodeArrayStream(stream as AsyncIterable<Uint8Array | ArrayBuffer | ArrayLike<number> | ArrayBufferView>);
}

/**
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
export function decodeMultiStream<ContextType>(
  streamLike: ReadableStreamLike<ArrayLike<number> | Uint8Array | ArrayBufferView | ArrayBuffer>,
  options?: DecoderOptions<SplitUndefined<ContextType>>,
): AsyncGenerator<unknown, void, unknown> {
  const stream = ensureAsyncIterable(streamLike);
  const decoder = new Decoder(options);
  return decoder.decodeStream(stream as AsyncIterable<Uint8Array | ArrayBuffer | ArrayLike<number> | ArrayBufferView>);
}

/**
 * @deprecated Use {@link decodeMultiStream} instead.
 */
export const decodeStream: never = undefined as never;
