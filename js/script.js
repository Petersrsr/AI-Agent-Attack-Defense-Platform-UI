document.addEventListener('DOMContentLoaded', function() {
    // --- Countdown Timer for Competition Page ---
    const timerElement = document.getElementById('competition-timer');

    if (timerElement) {
        const initialTime = timerElement.textContent.trim();
        const timeParts = initialTime.split(':').map(Number);
        
        if (timeParts.length === 3) {
            let totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

            // Don't start the timer if the time is already zero
            if (totalSeconds <= 0) {
                timerElement.textContent = "00:00:00";
                return;
            }

            const intervalId = setInterval(() => {
                totalSeconds--;

                if (totalSeconds <= 0) {
                    clearInterval(intervalId);
                    timerElement.textContent = "00:00:00";
                    // You could add a message here, e.g., by changing another element's text.
                    // For example: document.querySelector('.status-running').textContent = "● 比赛已结束";
                    return;
                }

                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                // Update the timer display
                timerElement.textContent = 
                    String(hours).padStart(2, '0') + ':' + 
                    String(minutes).padStart(2, '0') + ':' + 
                    String(seconds).padStart(2, '0');

            }, 1000);
        }
    }

    // --- Navigation for Scenario Management Button ---
    const scenarioMgmtBtn = document.getElementById('scenario-mgmt-btn');
    if (scenarioMgmtBtn) {
        scenarioMgmtBtn.addEventListener('click', function() {
            window.location.href = 'scenario_management.html';
        });
    }

    // --- Other JavaScript functionalities can be added below ---

}); 

document.addEventListener('DOMContentLoaded', function () {
    const resourceItems = document.querySelectorAll('.resource-item');

    if (resourceItems.length > 0) {
        setInterval(() => {
            resourceItems.forEach(item => {
                const baseValue = parseFloat(item.dataset.base);
                const metric = item.dataset.metric;
                const fluctuation = (Math.random() - 0.5) * 5; // Fluctuation range
                let newValue = baseValue + fluctuation;

                if (metric === '%') {
                    newValue = Math.max(0, Math.min(100, newValue)); // Clamp between 0 and 100
                } else {
                    newValue = Math.max(0, newValue);
                }

                const valueElement = item.querySelector('.resource-value');
                const barElement = item.querySelector('.bar-fill');

                valueElement.textContent = `${newValue.toFixed(metric === '%' ? 1 : 0)}${metric}`;
                
                const barPercent = Math.max(0, Math.min(100, newValue));
                barElement.style.width = `${barPercent}%`;
            });
        }, 2000);
    }

    // Scenario Monitoring Page Logic
    const scenarioTimer = document.getElementById('scenario-timer');
    if (scenarioTimer) {
        let seconds = 15 * 60 + 42; // Start from 00:15:42
        setInterval(() => {
            seconds++;
            const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const s = String(seconds % 60).padStart(2, '0');
            scenarioTimer.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    const canvas = document.getElementById('canvas');
    if (canvas) {
        const nodes = canvas.querySelectorAll('.node');
        const nodeTitle = document.getElementById('node-title');
        const nodeIcon = document.getElementById('node-icon');
        const nodeName = document.getElementById('node-name');
        const nodeIp = document.getElementById('node-ip');
        const nodeStatus = document.getElementById('node-status');

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                // Remove highlight from other nodes
                nodes.forEach(n => n.classList.remove('node-selected'));
                // Highlight clicked node
                node.classList.add('node-selected');

                const name = node.querySelector('text').textContent.trim();
                const ip = node.querySelector('.ip-text').textContent.trim();
                const icon = node.querySelector('.icon').textContent;
                let status, statusClass;

                if (node.classList.contains('node-compromised')) {
                    status = '已失陷';
                    statusClass = 'status-compromised';
                } else if (node.classList.contains('node-alert')) {
                    status = '告警';
                    statusClass = 'status-alert';
                } else {
                    status = '正常';
                    statusClass = 'status-ok';
                }
                
                if(nodeTitle) nodeTitle.textContent = `节点监控: ${name}`;
                if(nodeIcon) nodeIcon.textContent = icon;
                if(nodeName) nodeName.textContent = name;
                if(nodeIp) nodeIp.textContent = ip;
                if(nodeStatus) {
                    nodeStatus.textContent = status;
                    nodeStatus.className = statusClass;
                }
            });
        });
    }

}); 