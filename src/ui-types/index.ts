import { ForumCache } from 'decent-forum-api';
import { PendingTxTracker } from 'decent-forum-api';
import { BlockWatcher } from 'decent-forum-api/block-watcher/block-watcher';
  
/**
 * Shared Global State
 * 
 * This is passed around to all views. (not components)
 * It exists in the root App components data. 
 * 
 */
export interface SharedState {
  user: CurrentUser
  cache: ForumCache
  tracker: PendingTxTracker
  blockWatcher: BlockWatcher
}

export type CurrentUser = LoggedInUser | AnonymouUser;

export interface LoggedInUser {
  loggedIn: true 
  wallet: any // jwk
  walletAddress: string
  
}

export interface AnonymouUser {
  loggedIn: false 
}
