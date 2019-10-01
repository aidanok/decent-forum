import { ForumTreeNode, encodeForumPath } from 'decent-forum-api';
import { PostTreeNode } from 'decent-forum-api/cache/post-tree-node';
import { scoreByVotesAndTime } from 'decent-forum-api/sorting';


/**
 * Transform ForumTree & PostTree graphs into more friendly formats for UI views
 * 
 */


 /**
  * Summarizes a forum (boards style)
  * 
  * We want to display it something like this: 
  * 
  * Forum Title 
  * -------------
  * Sub-Forum (no posts, last post time) - votes/score
  * Sub-Forum (no posts, last post time) - votes/score
  * ------------- 
  * ThreadTitle - User - last post time - votes/score
  * ThreadTitle - User - last post time - votes/score
  * 
  * And sort by score in each section. 
  * 
  * @param forum 
  */
export function summarizeForumBoardsStyle(forum: ForumTreeNode) {
  Object.entries(forum.children).map(([seg, forum]) => {

  })
}

/**
 * Summarizes a forum ignoring sub-forums. 
 * 
 * @param forum 
 */
export function simpleForumContents(forum: ForumTreeNode) {
  return {
    path: forum.segments,
    threads: Object.entries(forum.posts).map(([id, node]) => summarizeThread(id, node))
  }
}

export type SimpleForumContents = ReturnType<typeof simpleForumContents>;


/**
 * Summarize a thread.  
 * 
 * [ thumbnail? / link? ] Title - user - last post time - votes/score 
 * 
 * @param rootNode 
 */
export function summarizeThread(id: string, rootNode: PostTreeNode) {
  if (!rootNode.isRootPost()) {
    throw new Error('This is not the first post in the thread, cannot summarize');
  }
  const lasPostTime = findMaxTimeInTree(rootNode);
  return {
    id,
    referenceTo: '', // string to thumbnail or link, prob should be object.
    description: rootNode.latestEdit().post.tags.description || '<untitled>',
    from: rootNode.post.from,
    lastPostTime: lasPostTime,
    upVotes: rootNode.post.upVotes,
    downVotes: rootNode.post.downVotes,
    score: scoreByVotesAndTime(rootNode.post.upVotes, rootNode.post.downVotes, lasPostTime)
  }
}

export interface ForumSummary {
  path: string[]
  encodedPath: string 
  posts: number 
  lastPostTime: Date 
  votes: { upVotes: number, downVotes: number }
  subForums: ForumSummary[]
}

export interface ForumSummaryAggregates extends ForumSummary{
  aggregate: {
    upVotes: number,
    downVotes: number, 
    lastPostTime: Date, 
  }
}

/**
 * Summarize a forum 
 * 
 * Title - total posts - last post .. agg votes 
 * 
 * @param id 
 * @param forumNode 
 */
export function summarizeForum(forumNode: ForumTreeNode, subForums = true): ForumSummary {
  return {
    path: forumNode.segments,
    encodedPath: encodeForumPath(forumNode.segments),
    posts: Object.keys(forumNode.posts).length,
    lastPostTime: findMaxTimeInForumTree(forumNode),
    votes: countVotes(forumNode),
    subForums: !subForums ? [] : Object.values(forumNode.children).map(node => summarizeForum(node))
  }
}

export function summarizeForumAggregates(id: string, forumNode: ForumTreeNode): ForumSummaryAggregates {
  const summary = summarizeForum(forumNode)
  return Object.assign(
    summary, 
    { 
      aggregate: aggregateSubForumVotes(summary), 
    }
  )
}

export function summarizeForumFlat(forumNode: ForumTreeNode): ForumSummary {
  const deep = summarizeForum(forumNode);
  // flat subForums into a single array 
  const newSubForums: ForumSummary[] = [];
  const next = deep.subForums; 
  const recurse = (f: ForumSummary[]) => {
    f.forEach(next => { 
      newSubForums.push(...next.subForums);
      recurse(next.subForums);
    })
  }
  recurse(deep.subForums);
  deep.subForums = newSubForums;
  return deep;
}

function findMaxTimeInForumTree(forumNode: ForumTreeNode) {
  return new Date(
    Math.max(...Object.values(forumNode.posts).map(x => findMaxTimeInTree(x).getTime()))
  )
}

function findMaxTimeInTree(node: PostTreeNode) {
  let n = node; 
  let t = Number.NEGATIVE_INFINITY;
  const recurse = (n: PostTreeNode) => {
    t = Math.max(n.latestEdit().post.date.getTime(), t);
    Object.values(n.replies).forEach(recurse);
  }
  recurse(n);
  return new Date(t);
}


function countVotes(forumNode: ForumTreeNode) {
  let upVotes = 0, downVotes = 0;
  Object.values(forumNode.posts).forEach(x => { upVotes += x.post.upVotes; downVotes += x.post.downVotes });
  return { upVotes, downVotes }
}

function aggregateSubForumVotes(summary: ForumSummary) {
  let upVotes = 0, downVotes = 0;
  let lastPostTime = 0;
  const count = (summary: ForumSummary) => {
    upVotes += summary.votes.upVotes;
    downVotes += summary.votes.downVotes;
    lastPostTime = Math.max(lastPostTime, summary.lastPostTime.getTime());
    summary.subForums.forEach(count)
  }
  return { upVotes, downVotes, lastPostTime: new Date(lastPostTime) }
}