const memoryCache = new Map();

export const cacheMiddleware = (durationInSeconds = 60) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__cache__${req.originalUrl || req.url}`;
    const cachedItem = memoryCache.get(key);

    if (cachedItem && Date.now() < cachedItem.expiry) {
      return res.json(cachedItem.data);
    }

    // Wrap res.json to cache response body
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        memoryCache.set(key, {
          data: body,
          expiry: Date.now() + durationInSeconds * 1000,
        });
      }
      return originalJson(body);
    };

    next();
  };
};

export const clearCache = (prefix = '') => {
  if (!prefix) {
    memoryCache.clear();
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.includes(prefix)) {
      memoryCache.delete(key);
    }
  }
};

