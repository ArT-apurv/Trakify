export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((error) => {
      console.error(error);
    });
  };
};
