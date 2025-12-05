#!/bin/sh
set -e

# This script generates a small JS file (env-config.js) served at /env-config.js and
# sets window.__RUNTIME__ = { VITE_API_BASE_URL: '...'} so that client code can read
# configuration at runtime without rebuilding the image.

OUTPUT_FILE=/usr/share/nginx/html/env-config.js

# Write runtime configuration for the frontend app
echo "// Auto-generated runtime configuration" > $OUTPUT_FILE
echo "window.__RUNTIME__ = {" >> $OUTPUT_FILE
echo "  VITE_API_BASE_URL: \"${VITE_API_BASE_URL:-}\"" >> $OUTPUT_FILE
echo "};" >> $OUTPUT_FILE

exec nginx -g 'daemon off;'
