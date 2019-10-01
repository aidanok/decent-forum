
/**
 * Any Vue filters for templates can be defined here and they will
 * be available to all templates. 
 * 
 */
export default [
  [ 'displayForumPath', 
      (value: string[]) =>  value.join(' > ')
  ],
] as [string, (val: any) => any ][]