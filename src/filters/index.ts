
/**
 * Any Vue filters for templates can be defined here and they will
 * be available to all templates. 
 * 
 */
export default [
  [ 'displayForumPath', 
      (value: string) => value.split('/').join(' > ') 
  ],
] as [string, (val: any) => any ][]