#!/usr/bin/env node
/**
 * Module dependencies.
 */
declare var server: any;
declare var debug: any;
declare var http: any;
/**
 * Get port from environment and store in Express.
 */
declare var port: string | number | boolean;
/**
 * Create HTTP server.
 */
declare var server: any;
/**
 * Normalize a port into a number, string, or false.
 */
declare function normalizePort(val: string): string | number | false;
/**
 * Event listener for HTTP server "error" event.
 */
declare function onError(error: {
    syscall: string;
    code: any;
}): void;
/**
 * Event listener for HTTP server "listening" event.
 */
declare function onListening(): void;
