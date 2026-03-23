document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('dashboardSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleBtn = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');

    const toggleSidebar = () => {
        if (!sidebar || !overlay) return;
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // ESC key closes sidebar
    document.addEventListener('keydown', (e) => {
        if (sidebar && sidebar.classList.contains('active') && e.key === 'Escape') {
            toggleSidebar();
        }
    });

    // Close logic for sidebar pills
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Ensure page scrolls to top on tab change, especially important for mobile
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            if (window.innerWidth < 1024 && sidebar && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });
});
