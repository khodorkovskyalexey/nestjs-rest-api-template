// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ignoreFavicon = (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
};
