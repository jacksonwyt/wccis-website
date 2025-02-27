// src/utils/logger.ts
import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define the log directory
const logDir = path.join(__dirname, '../../logs');

// Create the logger
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'wccis-backend' },
  transports: [
    // Write all logs with importance level of 'error' or less to error.log
    new transports.File({ 
      filename: path.join(logDir, `error-${new Date().toISOString().slice(0, 10)}.log`), 
      level: 'error' 
    }),
    // Write all logs with importance level of 'info' or less to combined.log
    new transports.File({ 
      filename: path.join(logDir, `combined-${new Date().toISOString().slice(0, 10)}.log`) 
    })
  ]
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export { logger };