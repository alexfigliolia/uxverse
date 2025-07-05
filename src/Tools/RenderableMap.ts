export class RenderableMap<K, V> extends Map<K, V> {
  public map<U>(callback: (value: V, key: K, index: number) => U) {
    const results: U[] = [];
    let pointer = -1;
    for (const [key, value] of this) {
      results.push(callback(value, key, ++pointer));
    }
    return results;
  }
}
