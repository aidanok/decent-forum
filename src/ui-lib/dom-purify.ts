import createDOMPurify from 'dompurify'

export const DOMPurify = createDOMPurify(window)

/* Protocols we linkify. The default set doesnt have magent or tox */ 

export const ALLOWED_LINK_PROTOCOLS = {
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|magnet|tox):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
}
export const LINK_ONLY_OPTIONS = Object.assign(
  {
    ALLOWED_TAGS: ['a']
  }, 
  ALLOWED_LINK_PROTOCOLS
);

