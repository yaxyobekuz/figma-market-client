/**
 * Bot Detection Utility
 *
 * Intelligently detects if the current visitor is a bot/crawler or a real user.
 * Uses multiple detection strategies for accuracy.
 */

/**
 * Known bot user agents (common crawlers)
 */
const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "slurp", // Yahoo
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "sogou",
  "exabot",
  "facebot",
  "facebookexternalhit",
  "ia_archiver",
  "ahrefsbot",
  "semrushbot",
  "dotbot",
  "mj12bot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "developers.google.com/+/web/snippet",
  "slackbot",
  "vkshare",
  "w3c_validator",
  "redditbot",
  "applebot",
  "whatsapp",
  "flipboard",
  "tumblr",
  "bitlybot",
  "skypeuripreview",
  "nuzzel",
  "discordbot",
  "qwantify",
  "pinterestbot",
  "bitrix",
  "python-requests",
  "curl",
  "wget",
  "scrapy",
  "axios",
  "node-fetch",
  "got",
  "superagent",
];

/**
 * Check if user agent matches known bot patterns
 */
const isKnownBot = () => {
  if (typeof navigator === "undefined") return true;

  const userAgent = navigator.userAgent.toLowerCase();

  return BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));
};

/**
 * Check if browser has essential features (bots often lack these)
 */
const hasBrowserFeatures = () => {
  if (typeof window === "undefined") return false;

  // Check for essential browser APIs
  const hasWebGL = (() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  })();

  const hasLocalStorage = (() => {
    try {
      return typeof localStorage !== "undefined";
    } catch {
      return false;
    }
  })();

  const hasSessionStorage = (() => {
    try {
      return typeof sessionStorage !== "undefined";
    } catch {
      return false;
    }
  })();

  return (
    (hasWebGL &&
      hasLocalStorage &&
      hasSessionStorage &&
      "ontouchstart" in window) ||
    "onmousedown" in window
  );
};

/**
 * Check for headless browser indicators
 */
const isHeadlessBrowser = () => {
  if (typeof navigator === "undefined") return true;

  // Check for common headless browser indicators
  return (
    navigator.webdriver === true ||
    window.navigator.webdriver === true ||
    !navigator.plugins ||
    navigator.plugins.length === 0 ||
    !navigator.languages ||
    navigator.languages.length === 0
  );
};

/**
 * Check if visitor has interacted with the page
 * This creates a promise that resolves when user shows interaction
 */
const waitForUserInteraction = (timeout = 3000) => {
  return new Promise((resolve) => {
    let interacted = false;
    const timer = setTimeout(() => resolve(interacted), timeout);

    const markInteraction = () => {
      if (!interacted) {
        interacted = true;
        clearTimeout(timer);
        cleanup();
        resolve(true);
      }
    };

    // Listen for various interaction events
    const events = [
      "mousedown",
      "mousemove",
      "touchstart",
      "scroll",
      "keydown",
    ];
    events.forEach((event) => {
      window.addEventListener(event, markInteraction, {
        once: true,
        passive: true,
      });
    });

    const cleanup = () => {
      events.forEach((event) => {
        window.removeEventListener(event, markInteraction);
      });
    };
  });
};

/**
 * Main bot detection function
 * Returns true if visitor is likely a real user, false if likely a bot
 */
export const isRealUser = async () => {
  // Server-side rendering - don't track
  if (typeof window === "undefined") {
    return false;
  }

  // Check 1: Known bot user agent
  if (isKnownBot()) {
    return false;
  }

  // Check 2: Missing essential browser features
  if (!hasBrowserFeatures()) {
    return false;
  }

  // Check 3: Headless browser detection
  if (isHeadlessBrowser()) {
    return false;
  }

  // Check 4: Wait for user interaction (with timeout)
  // Real users typically interact within a few seconds
  const hasInteracted = await waitForUserInteraction(3000);

  return hasInteracted;
};

/**
 * Synchronous version - checks without waiting for interaction
 * Useful for immediate checks
 */
export const isLikelyRealUser = () => {
  if (typeof window === "undefined") return false;

  return !isKnownBot() && hasBrowserFeatures() && !isHeadlessBrowser();
};

/**
 * Get a unique session identifier for tracking
 * Uses sessionStorage to identify unique page sessions
 */
export const getSessionId = () => {
  if (typeof window === "undefined") return null;

  try {
    const SESSION_KEY = "figma_market_session";
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}`;
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  } catch {
    return null;
  }
};

/**
 * Check if this design was already viewed in this session
 * Prevents duplicate view counts from page refreshes
 */
export const hasViewedInSession = (designId) => {
  if (typeof window === "undefined") return true;

  try {
    const VIEWED_KEY = "figma_market_viewed_designs";
    const viewed = JSON.parse(sessionStorage.getItem(VIEWED_KEY) || "[]");
    return viewed.includes(designId);
  } catch {
    return false;
  }
};

/**
 * Mark a design as viewed in this session
 */
export const markAsViewed = (designId) => {
  if (typeof window === "undefined") return;

  try {
    const VIEWED_KEY = "figma_market_viewed_designs";
    const viewed = JSON.parse(sessionStorage.getItem(VIEWED_KEY) || "[]");

    if (!viewed.includes(designId)) {
      viewed.push(designId);
      sessionStorage.setItem(VIEWED_KEY, JSON.stringify(viewed));
    }
  } catch {
    // Fail silently
  }
};
