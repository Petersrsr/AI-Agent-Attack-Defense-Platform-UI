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


// =================================================================================
// AI Chat Modal Logic for scenario_management.html
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the scenario management page and the modal exists
    const createScenarioBtn = document.getElementById('create-scenario-btn');
    const aiChatModal = document.getElementById('ai-chat-modal');
    
    if (createScenarioBtn && aiChatModal) {
        const closeModalBtn = document.getElementById('close-modal-btn');
        const sendChatBtn = document.getElementById('send-chat-btn');
        const createFromAiBtn = document.getElementById('create-from-ai-btn');
        const chatInput = document.getElementById('chat-input');
        const chatContainer = document.getElementById('chat-container');
        const apiKeyInput = document.getElementById('api-key-input');
        const scenarioTableBody = document.querySelector('.data-table tbody');

        let messages = [
            {
                role: 'system',
                content: 'You are an expert in cybersecurity attack and defense scenarios. Your goal is to help users design a competition scenario based on their description. Ask for clarification if needed, and finally, provide a structured summary of the scenario, including objectives, network topology, key vulnerabilities, and winning conditions.'
            }
        ];

        const openModal = () => aiChatModal.style.display = 'flex';
        const closeModal = () => aiChatModal.style.display = 'none';

        const addMessageToChat = (role, content, isLoading = false) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', role);
            if (isLoading) {
                messageElement.classList.add('loading');
                messageElement.textContent = content;
            } else {
                messageElement.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
            }
            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            return messageElement;
        };

        const handleSendChat = async () => {
            const userInput = chatInput.value.trim();
            const apiKey = apiKeyInput.value.trim();

            if (!userInput) return;

            if (!apiKey) {
                alert('请输入您的 DeepSeek API Key。');
                apiKeyInput.focus();
                return;
            }

            // Add user message to UI and history
            addMessageToChat('user', userInput);
            messages.push({ role: 'user', content: userInput });
            chatInput.value = '';
            chatInput.disabled = true;
            sendChatBtn.disabled = true;

            // Add loading indicator
            const loadingIndicator = addMessageToChat('assistant', 'AI 正在思考中...', true);

            try {
                const response = await fetch('https://api.deepseek.com/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: messages,
                        stream: false
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API Error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                const assistantReply = data.choices[0].message.content;

                // Remove loading indicator and show AI response
                loadingIndicator.remove();
                addMessageToChat('assistant', assistantReply);

                // Add AI response to history
                messages.push({ role: 'assistant', content: assistantReply });

                // Show the "Create from AI" button
                createFromAiBtn.style.display = 'inline-block';

            } catch (error) {
                loadingIndicator.remove();
                addMessageToChat('assistant', `抱歉，调用API时发生错误: ${error.message}`);
                console.error("API Call Failed:", error);
            } finally {
                chatInput.disabled = false;
                sendChatBtn.disabled = false;
                chatInput.focus();
            }
        };

        const handleCreateFromAI = () => {
            const lastMessage = messages[messages.length - 1];
            if (!lastMessage || lastMessage.role !== 'assistant') {
                alert('没有可用的AI回复来创建场景。');
                return;
            }

            // Simple parsing: Try to find a line that looks like a title.
            // This can be improved with more structured AI output.
            const lines = lastMessage.content.split('\n');
            let scenarioName = lines.find(line => line.includes('场景名称') || line.includes('名称：')) || lines[0];
            scenarioName = scenarioName.replace(/场景名称[:：]/, '').trim();

            const creator = 'AI Assistant';
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${scenarioName}</td>
                <td>${creator}</td>
                <td>${timestamp}</td>
                <td>${timestamp}</td>
                <td><span class="status status-draft">草稿</span></td>
                <td><a href="#" class="action-link">编辑</a> <a href="#" class="action-link action-danger">删除</a></td>
            `;

            scenarioTableBody.insertBefore(newRow, scenarioTableBody.firstChild);

            closeModal();
            // Reset for next time
            createFromAiBtn.style.display = 'none';
        };

        createScenarioBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button or link behavior
            openModal();
        });

        closeModalBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === aiChatModal) {
                closeModal();
            }
        });

        sendChatBtn.addEventListener('click', handleSendChat);
        createFromAiBtn.addEventListener('click', handleCreateFromAI);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendChat();
            }
        });
    }
}); 


// =================================================================================
// Create Target Modal Logic for target_management.html
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const createTargetBtn = document.getElementById('create-target-btn');
    const createTargetModal = document.getElementById('create-target-modal');

    if (createTargetBtn && createTargetModal) {
        const closeModalBtn = document.getElementById('close-create-target-modal-btn');
        const createTargetForm = document.getElementById('create-target-form');
        const targetTableBody = document.querySelector('.data-table tbody');

        const openModal = () => createTargetModal.style.display = 'flex';
        const closeModal = () => {
            createTargetModal.style.display = 'none';
            createTargetForm.reset();
        };

        createTargetBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === createTargetModal) {
                closeModal();
            }
        });

        createTargetForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('target-name').value;
            const ip = document.getElementById('target-ip').value;
            const os = document.getElementById('target-os').value;
            const vulns = document.getElementById('target-vulns').value || '-';
            
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${ip}</td>
                <td>${os}</td>
                <td>${vulns}</td>
                <td><span class="status-dot offline"></span> 离线</td>
                <td>${timestamp}</td>
                <td class="action-buttons">
                    <button class="btn-action">配置</button>
                    <button class="btn-action start">启动</button>
                    <button class="btn-action delete">删除</button>
                </td>
            `;

            targetTableBody.insertBefore(newRow, targetTableBody.firstChild);

            closeModal();
        });
    }
}); 