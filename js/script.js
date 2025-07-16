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
        const usePublicKeyBtn = document.getElementById('use-public-key-btn');
        const chatInput = document.getElementById('chat-input');
        const chatContainer = document.getElementById('chat-container');
        const apiKeyInput = document.getElementById('api-key-input');
        const scenarioTableBody = document.querySelector('.data-table tbody');

        let messages = [
            {
                role: 'system',
                content: `You are a top-tier cybersecurity exercise designer, known as 'Scenario Architect'. Your task is to assist users in creating detailed and realistic attack-defense scenarios for a training platform.

Interaction Flow:
1.  **Greeting & Clarification**: Start by greeting the user and asking clarifying questions to fully understand their request. Dig deep into the objectives, target technologies, and desired complexity.
2.  **Confirmation**: Once you have enough information, confirm your understanding with the user.
3.  **Structured Output**: After confirmation, generate the final scenario plan using the following Markdown format. **YOU MUST USE THIS MARKDOWN FORMAT.**

---

### 场景名称
*   **[A clear, concise name for the scenario]**

### 场景概述
*   **[A brief, one-paragraph summary of the scenario's story and purpose.]**

### 核心技术点
*   **[List the key technologies involved, e.g., Web, Active Directory, SCADA, etc.]**

### 攻击方 (红方)
*   **起始点**: [Where the attacker begins, e.g., 'An external network with access to the public-facing web server.']
*   **主要目标**: [The ultimate goal for the attacker, e.g., 'Gain Domain Admin rights and exfiltrate the 'customer_data.db' file from the finance server.']
*   **攻击路径建议**:
    1.  **Initial Access**: [e.g., 'Exploit Log4Shell vulnerability (CVE-2021-44228) on the public web server.']
    2.  **Privilege Escalation**: [e.g., 'Use Mimikatz to dump credentials.']
    3.  **Lateral Movement**: [e.g., 'Use retrieved credentials to access the internal file server via SMB.']
    4.  **Action on Objectives**: [e.g., 'Locate and exfiltrate the target file.']

### 防守方 (蓝方)
*   **主要目标**: [The ultimate goal for the defender, e.g., 'Detect the attack, identify the full attack chain, and eradicate the attacker's presence from the network.']
*   **胜利条件**:
    *   Detect initial exploitation within 15 minutes.
    *   Prevent lateral movement to the Domain Controller.
    *   Prevent data exfiltration.
*   **关键监测点**:
    *   Web server logs for unusual JNDI lookups.
    *   Endpoint security logs for suspicious PowerShell commands or Mimikatz execution.
    *   Network traffic for unusual SMB connections.
`
            }
        ];

        const openModal = () => aiChatModal.style.display = 'flex';
        const closeModal = () => aiChatModal.style.display = 'none';

        const renderMarkdown = (text) => {
            let html = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // Process headers, bold, and lists
            html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
                       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // Handle lists more robustly
            let inList = false;
            let listHtml = '';
            html.split('\n').forEach(line => {
                if (line.trim().startsWith('* ')) {
                    if (!inList) {
                        listHtml += '<ul>';
                        inList = true;
                    }
                    // Handle nested bold within list items
                    let itemContent = line.trim().substring(2);
                    itemContent = itemContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    listHtml += `<li>${itemContent}</li>`;
                } else {
                    if (inList) {
                        listHtml += '</ul>';
                        inList = false;
                    }
                    // Add other lines, preserving headers
                    if (line.startsWith('<h3>')) {
                        listHtml += line;
                    } else if (line.trim()) {
                        listHtml += `<p>${line}</p>`;
                    }
                }
            });
            if (inList) {
                listHtml += '</ul>';
            }
            return listHtml;
        };


        const addMessageToChat = (role, content, isLoading = false) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', role);
            if (isLoading) {
                messageElement.classList.add('loading');
                messageElement.textContent = content;
            } else {
                 if (role === 'assistant') {
                    messageElement.innerHTML = renderMarkdown(content);
                } else {
                    messageElement.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
                }
            }
            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            return messageElement;
        };

        const handleUsePublicKey = () => {
            apiKeyInput.value = 'sk-40d2e2ad125045bda1f60e8801e90921';
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

            const aiContent = lastMessage.content;
            let scenarioName = '未命名场景'; // Default name

            // New, more robust parsing logic to handle structured Markdown
            const lines = aiContent.split('\n');
            const nameHeaderIndex = lines.findIndex(line => line.trim() === '### 场景名称');

            if (nameHeaderIndex !== -1 && lines.length > nameHeaderIndex + 1) {
                // Find the next non-empty line which should contain the name
                let nextLine = '';
                for (let i = nameHeaderIndex + 1; i < lines.length; i++) {
                    if (lines[i].trim() !== '') {
                        nextLine = lines[i].trim();
                        break;
                    }
                }
                
                if (nextLine) {
                    // Clean up common markdown from the line: *, **, []
                    scenarioName = nextLine.replace(/^\*\s*\*\*/, '')
                                           .replace(/\*\*$/, '')
                                           .replace(/^\*/, '')
                                           .replace(/^\[|\]$/g, '')
                                           .trim();
                }
            } else {
                // Fallback for any other format: find the first available h3
                const fallbackMatch = aiContent.match(/### (.*)/);
                if (fallbackMatch && fallbackMatch[1]) {
                    scenarioName = fallbackMatch[1].trim();
                }
            }

            // Final check to ensure we don't add an empty name
            if (!scenarioName) {
                scenarioName = 'AI 生成场景';
            }

            const creator = 'AI Assistant';
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            
            const newRow = document.createElement('tr');
            // Store the full AI content in a data attribute
            newRow.dataset.aiContent = lastMessage.content;
            newRow.innerHTML = `
                <td>${scenarioName}</td>
                <td>${creator}</td>
                <td>${timestamp}</td>
                <td>${timestamp}</td>
                <td><span class="status status-draft">草稿</span></td>
                <td><a href="#" class="action-link edit-ai-draft">编辑</a> <a href="#" class="action-link action-danger">删除</a></td>
            `;

            scenarioTableBody.insertBefore(newRow, scenarioTableBody.firstChild);

            closeModal();
            // Reset for next time
            createFromAiBtn.style.display = 'none';
        };

        // --- Edit AI Draft Logic ---
        const editDraftModal = document.getElementById('edit-draft-modal');
        const closeEditModalBtn = document.getElementById('close-edit-draft-modal-btn');
        const editDraftForm = document.getElementById('edit-draft-form');
        const editScenarioNameInput = document.getElementById('edit-scenario-name');
        const editAiContentInput = document.getElementById('edit-ai-content');
        let currentRowToEdit = null;

        const openEditModal = (row) => {
            currentRowToEdit = row;
            const currentName = row.cells[0].textContent;
            const aiContent = row.dataset.aiContent;
            
            editScenarioNameInput.value = currentName;
            editAiContentInput.value = aiContent;
            editDraftModal.style.display = 'flex';
        };

        const closeEditModal = () => {
            editDraftModal.style.display = 'none';
            currentRowToEdit = null;
        };

        // Use event delegation on the table body to handle clicks on future edit buttons
        scenarioTableBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-ai-draft')) {
                e.preventDefault();
                const row = e.target.closest('tr');
                openEditModal(row);
            }
        });

        editDraftForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentRowToEdit) return;

            const newName = editScenarioNameInput.value;
            const newAiContent = editAiContentInput.value;

            // Update the table cell for the name
            currentRowToEdit.cells[0].textContent = newName;
            // Update the data attribute with the new content
            currentRowToEdit.dataset.aiContent = newAiContent;

            closeEditModal();
        });

        closeEditModalBtn.addEventListener('click', closeEditModal);
        window.addEventListener('click', (e) => {
            if (e.target === editDraftModal) {
                closeEditModal();
            }
        });
        // --- End Edit Logic ---

        createScenarioBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button or link behavior
            openModal();
        });

        closeModalBtn.addEventListener('click', closeModal);
        usePublicKeyBtn.addEventListener('click', handleUsePublicKey);
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

// =================================================================================
// Create Red vs Blue Modal Logic for red_vs_blue.html
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('create-rvb-btn');
    const modal = document.getElementById('create-rvb-modal');

    if (createBtn && modal) {
        const closeModalBtn = document.getElementById('close-create-rvb-modal-btn');
        const createForm = document.getElementById('create-rvb-form');
        const gridContainer = document.querySelector('.rvb-grid');

        const openModal = () => modal.style.display = 'flex';
        const closeModal = () => {
            modal.style.display = 'none';
            createForm.reset();
        };

        createBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        createForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('rvb-name').value;
            const redTeam = document.getElementById('rvb-red-team').value;
            const blueTeam = document.getElementById('rvb-blue-team').value;
            
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            const newCard = document.createElement('div');
            newCard.className = 'rvb-card';
            newCard.innerHTML = `
                <div class="card-header">
                    <h3>${name}</h3>
                    <span class="status status-pending">未开始</span>
                </div>
                <div class="card-body">
                    <div class="team red-team">
                        <span class="team-name">红方: ${redTeam}</span>
                        <div class="score">0</div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team blue-team">
                        <span class="team-name">蓝方: ${blueTeam}</span>
                        <div class="score">0</div>
                    </div>
                </div>
                <div class="card-footer">
                    <span>创建时间: ${timestamp}</span>
                    <button class="btn btn-sm">开始演练</button>
                </div>
            `;

            gridContainer.insertBefore(newCard, gridContainer.firstChild);

            closeModal();
        });
    }
}); 