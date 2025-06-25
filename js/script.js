// Future JavaScript for interactivity can be added here. 

// Settings Page Tab Switching
const settingsSidebar = document.querySelector('.settings-sidebar');
if (settingsSidebar) {
    const links = settingsSidebar.querySelectorAll('li a');
    const panes = document.querySelectorAll('.settings-pane');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Update active state for sidebar links
            links.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            // Show the correct pane
            const targetId = this.getAttribute('href').substring(1);
            panes.forEach(pane => {
                if (pane.id === targetId) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
}

// ... existing code ... 