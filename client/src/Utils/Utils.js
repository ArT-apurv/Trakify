export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((error) => {
      console.error(error);
    });
  };
};

export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
