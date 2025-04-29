export function sortImagesByName(urls: string[]): string[] {
  return urls.slice().sort((a, b) => {
    const nameA = a.split('/').pop() ?? '';
    const nameB = b.split('/').pop() ?? '';
    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  });
}
