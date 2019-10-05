import { ForumCache } from 'decent-forum-api';
import { PendingTxTracker } from 'decent-forum-api';
import { BlockWatcher } from 'decent-forum-api/block-watcher/block-watcher';
import { ContentWatcher } from 'decent-forum-api/content-watcher/content-watcher';
  
/**
 * Shared Global State
 * 
 * This is passed around to all views, and sometimes components if they need it. 
 * 
 * It is created in the root App component.
 * 
 * Views & Components should _generally treat it as a read only object_
 * and use api methods or services which will update it. These apis
 * and services will expose a Promise based api that returns once the 
 * shared state is updated, so the view can trigger/untrigger loading 
 * operations etc.
 * 
 * 
 */

export interface SharedState {
  user: CurrentUser
  cache: ForumCache
  tracker: PendingTxTracker
  blockWatcher: BlockWatcher
  contentWatcher: ContentWatcher
}

export interface LoggedInUser {
  loggedIn: true 
  wallet: any // jwk
  walletAddress: string
}

export interface AnonymouUser {
  loggedIn: false 
}

export type CurrentUser = LoggedInUser | AnonymouUser;


/**
 * We initialize shared state here as a singleton, 
 * this is really just for live-reload, as all these
 * components get reloaded otherwise if we change the App 
 * root component.
 * 
 */



export function getSharedState() {

  let sharedState: SharedState = (window as any).___df_SsS 


  if (!sharedState) {
    const cache = new ForumCache();
    const blockWatcher = new BlockWatcher();
    const tracker = new PendingTxTracker(cache, blockWatcher);
    const contentWatcher = new ContentWatcher(blockWatcher);
    sharedState = {
      user: { loggedIn: false },
      cache, 
      tracker,
      blockWatcher,
      contentWatcher,
    }
  }

  (window as any).___df_SsS = sharedState;
  return sharedState;
}

