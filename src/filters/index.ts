

export default [
  [ 'displayForumPath', (value: string) => value.split('/').join(' > ') ],
  [ 'displayShortAddress', (value: string) => `${value.substr(0, 3)}...${value.substr(value.length-3)}` ]
] as [string, (val: any) => any ][]