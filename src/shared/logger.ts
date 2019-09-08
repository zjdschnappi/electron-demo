import logger from "electron-log";

logger.transports.file.level = "silly";
logger.transports.console.level = "silly";
export default logger;
