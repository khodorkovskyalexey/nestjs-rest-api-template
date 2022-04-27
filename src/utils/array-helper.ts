export const removeDuplicateItems = <T>(arr: T[]): T[] => [...new Set(arr)];
