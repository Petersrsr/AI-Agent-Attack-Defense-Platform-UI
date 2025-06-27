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

// =====================
// 攻防竞技页面倒计时功能
// =====================
// 倒计时初始时间（单位：秒）
const initialCountdownSeconds = 1 * 60 * 60 + 28 * 60 + 45; // 1小时28分45秒

// 获取.timer元素
const timerElement = document.querySelector('.timer');

// 只有在当前页面存在.timer元素时才执行倒计时
if (timerElement) {
    let remainingSeconds = initialCountdownSeconds;

    // 格式化秒为HH:MM:SS
    function formatTime(seconds) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    // 每秒更新倒计时
    function updateTimer() {
        if (remainingSeconds > 0) {
            timerElement.textContent = formatTime(remainingSeconds);
            remainingSeconds--;
        } else {
            timerElement.textContent = '比赛已结束';
            clearInterval(timerInterval);
        }
    }

    // 立即显示初始时间
    timerElement.textContent = formatTime(remainingSeconds);
    // 启动定时器
    const timerInterval = setInterval(updateTimer, 1000);
}

// ... existing code ... 