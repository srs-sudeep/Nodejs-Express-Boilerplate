'use strict';

const { sanitize } = require('express-mongo-sanitize');

/**
 * express-mongo-sanitize assigns back to req.query, but Express 5 defines `query`
 * as a getter-only property on the prototype. We sanitize a shallow clone and
 * shadow it on the request instance.
 */
function mongoSanitizeExpress5(options = {}) {
  return function mongoSanitizeExpress5Middleware(req, res, next) {
    if (req.body && typeof req.body === 'object') {
      sanitize(req.body, options);
    }
    if (req.params && typeof req.params === 'object') {
      sanitize(req.params, options);
    }
    if (req.headers && typeof req.headers === 'object') {
      sanitize(req.headers, options);
    }
    if (req.query && typeof req.query === 'object') {
      const cleaned = sanitize(Object.assign(Object.create(null), req.query), options);
      Object.defineProperty(req, 'query', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: cleaned,
      });
    }
    next();
  };
}

module.exports = mongoSanitizeExpress5;
