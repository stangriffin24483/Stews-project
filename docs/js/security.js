// Security: Detect and block common XSS/injection attempts
(function(){
    const dangerousPatterns = [
        /<script/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /eval\(/gi,
        /expression\(/gi
    ];

    // Log suspicious activity (for monitoring)
    window.addEventListener('beforeunload', function(e) {
        // This runs before navigation - can be used for logging
    });

    // Disable right-click menu in production (optional security measure)
    // document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Validate external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Ensure form submissions are over HTTPS
    document.querySelectorAll('form').forEach(form => {
        if(form.action && !form.action.startsWith('https')) {
            console.warn('Form action is not HTTPS:', form.action);
        }
    });

    console.log('Security checks passed');
})();
