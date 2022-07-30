import applicationUtil from './package.json' assert { type: 'json' };

export const port = applicationUtil.config.port;
export const version = applicationUtil.version;