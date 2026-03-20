/**
 * Tiny Home Builder - Dashboard JS
 * Handles interactive elements for User and Admin Dashboards.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Progress Bar Logic (User Dashboard)
    const progressSections = document.querySelectorAll('.dashboard-progress-item');
    if (progressSections.length > 0) {
        progressSections.forEach(item => {
            const progress = item.dataset.progress || 0;
            const bar = item.querySelector('.progress-bar');
            if (bar) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 500);
            }
        });
    }

    // 2. Select Finishes Selection Logic
    const finishCards = document.querySelectorAll('.finish-option-card');
    if (finishCards.length > 0) {
        finishCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                const siblings = document.querySelectorAll(`.finish-option-card[data-category="${category}"]`);

                siblings.forEach(s => s.classList.remove('selected', 'border-primary'));
                card.classList.add('selected', 'border-primary');

                showFeedback(`Selected: ${card.querySelector('h6').innerText}`);
            });
        });
    }

    // 3. Admin Overview Chart Simulation (Simple CSS-based implementation)
    // We'll simulate data updates if there are statistics counters.
    const counters = document.querySelectorAll('.admin-stat-counter');
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = +counter.innerText;
            let count = 0;
            const timer = setInterval(() => {
                count += Math.ceil(target / 20);
                if (count >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = count;
                }
            }, 50);
        });
    }

    // 4. Content Management Actions (Admin Dashboard)
    const deleteButtons = document.querySelectorAll('.admin-delete-item');
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemRow = btn.closest('tr');
                if (confirm('Are you sure you want to delete this item?')) {
                    itemRow.style.opacity = '0.3';
                    setTimeout(() => {
                        itemRow.remove();
                        showFeedback('Item deleted successfully!');
                    }, 500);
                }
            });
        });
    }

    // 5. Utility: Feedback Notification
    function showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'dashboard-feedback toast align-items-center text-white bg-primary border-0 show';
        feedback.setAttribute('role', 'alert');
        feedback.setAttribute('aria-live', 'assertive');
        feedback.setAttribute('aria-atomic', 'true');
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.zIndex = '1050';

        feedback.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        document.body.appendChild(feedback);
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    // 6. Sidebar Active State Toggle
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only toggle if it's an internal hash link
            if (this.getAttribute('href').startsWith('#')) {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});
