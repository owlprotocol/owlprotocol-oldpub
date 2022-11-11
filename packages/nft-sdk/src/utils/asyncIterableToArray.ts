export async function asyncIterableToArray<T>(iter: AsyncIterable<T>): Promise<T[]> {
    const result: T[] = [];
    for await (const item of iter) {
        result.push(item);
    }
    return result;
}
