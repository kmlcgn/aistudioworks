#!/usr/bin/env python3
"""
Simple HTTP server with clean URL support for local development.
Usage: python3 server.py [port]
"""

import http.server
import socketserver
import os
import urllib.parse
from pathlib import Path

PORT = 8000

# URL routing map
ROUTES = {
    '/home': 'index.html',
    '/blog': 'blog.html',
    '/careers': 'jobs.html',
    '/jobs': 'jobs.html',
    # Job pages
    '/job-software-engineer': 'job-software-engineer.html',
    '/job-senior-ios-developer': 'job-senior-ios-developer.html',
    '/job-performance-marketing': 'job-performance-marketing.html',
    '/job-email-marketing': 'job-email-marketing.html',
    '/job-growth-marketing-manager': 'job-growth-marketing-manager.html',
    '/job-product-research': 'job-product-research.html',
    '/job-full-stack-developer': 'job-full-stack-developer.html',
    # Blog posts
    '/blog-post-1': 'blog-post-1.html',
    '/blog-post-2': 'blog-post-2.html',
    '/blog-post-3': 'blog-post-3.html',
    '/blog-post-4': 'blog-post-4.html',
    '/blog-post-5': 'blog-post-5.html',
    '/blog-post-6': 'blog-post-6.html',
    # Privacy Policy
    '/privacy-policy': 'privacy-policy.html',
    # Terms of Service
    '/terms-of-service': 'terms-of-service.html',
}


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        # Check if it's a route mapping
        if path in ROUTES:
            self.path = '/' + ROUTES[path]
        # If no extension, try adding .html
        elif not os.path.splitext(path)[1] and path != '/':
            # Check if .html version exists
            html_path = path + '.html'
            if os.path.exists(html_path.lstrip('/')):
                self.path = html_path
            else:
                # Try the route mapping
                if path in ROUTES:
                    self.path = '/' + ROUTES[path]
                else:
                    self.send_error(404, "File not found")
                    return

        # Serve the file
        return super().do_GET()

    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == "__main__":
    import sys
    
    # Allow custom port
    if len(sys.argv) > 1:
        PORT = int(sys.argv[1])
    
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print(f"Try: http://localhost:{PORT}/home")
        print(f"Try: http://localhost:{PORT}/blog")
        print(f"Try: http://localhost:{PORT}/careers")
        print("\nPress Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

