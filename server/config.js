function isImage(link) {
    const re = /.*(?:jpeg|jpg|png|gif)$/i;
    return re.test(link);
}

function tagName(href, type) {
    if (isImage(href)) {
        return "img";
    }
    return "a";
}

function target(href, type) {
    if (type !== "url") {
        return "";
    }
    if (isImage(href)) {
        return "";
    }
    return "_blank";
}

function formatHref(href, type) {
    if (isImage(href)) {
        return "";
    }
    return href;
}

function attributes(href, type) {
    if (isImage(href)) {
        return {
            src: href,
        };
    }
    return null;
}

function format(href, type) {
    if (isImage(href)) {
        return "";
    }
    return href;
}

const config = {
  // Highlight Links
  highlightLinks: true,

  // Linkify Settings
  linkify: {
    className: 'talk-plugin-rich-text-link',
    tagName: tagName,
    target: target,
    formatHref: formatHref,
    attributes: attributes,
    format: format,
  },

  // TODO: move to admin eventually
  // Super strict rules to make sure users only submit the tags they are allowed
  dompurify: {
    ALLOWED_TAGS: ['b', 'i', 'blockquote', 'br', 'div', 'span', 'del', 'strike', 'em', 'strong'],
    ALLOWED_ATTR: [],
  },

  // Secure config for jsdom even when DOMPurify creates a document without a browsing context
  jsdom: {
    features: {
      FetchExternalResources: false, // disables resource loading over HTTP / filesystem
      ProcessExternalResources: false, // do not execute JS within script blocks
    },
  },
};

module.exports = config;
