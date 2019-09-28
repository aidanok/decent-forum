import { ForumCache } from 'decent-forum-api';
import { PendingTxTracker } from 'decent-forum-api';
  
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
}

export type CurrentUser = LoggedInUser | AnonymouUser;

export interface LoggedInUser {
  loggedIn: true 
  wallet: any // jwk
  walletAddress: string
  pending: PendingTxTracker
}

export interface AnonymouUser {
  loggedIn: false 
}
