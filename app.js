import { MODEL_CONFIG } from './model-config.js';

// Pseudo WebLLM 加载
class AI {
    constructor(config) {
        this.config = config;
        this.model = null;
    }
    async loadModel() {
        // TODO: 实际加载 WebGPU LLM
        console.log("加载模型:", this.config.modelUrl);
        this.model = true; // 模拟已加载
    }
    async generateResponse(userInput, systemPrompt) {
        // 模拟 AI 回复
        return `童心说: 你刚才说了 "${userInput}"，我很喜欢这个话题！`;
    }
}

const ai = new AI(MODEL_CONFIG);
await ai.loadModel();

const chatContainer = document.getElementById("chat-container");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const systemPromptEl = document.getElementById("system-prompt");
const themeSelect = document.getElementById("theme-select");
const saveSettingsBtn = document.getElementById("save-settings");

function appendMessage(text, type="ai") {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.innerText = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;
    appendMessage(userText, "user");
    chatInput.value = "";
    const response = await ai.generateResponse(userText, systemPromptEl.value);
    appendMessage(response, "ai");
});

saveSettingsBtn.addEventListener("click", () => {
    ai.config.systemPrompt = systemPromptEl.value;
    alert("配置已保存！");
});

// 主题切换
themeSelect.addEventListener("change", () => {
    document.body.setAttribute("data-theme", themeSelect.value);
});

// 离线存储聊天记录
window.addEventListener("beforeunload", () => {
    const chats = Array.from(chatContainer.children).map(c=>c.innerText);
    localStorage.setItem("chat_history", JSON.stringify(chats));
});

// 恢复聊天记录
window.addEventListener("load", () => {
    const chats = JSON.parse(localStorage.getItem("chat_history")||"[]");
    chats.forEach(c => appendMessage(c.includes("童心说:")?c:"用户: "+c, c.includes("童心说:")?"ai":"user"));
});
