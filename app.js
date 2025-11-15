import { MODEL_CONFIG } from './model-config.js';

// Pseudo WebLLM 模拟 AI
class AI {
    constructor(config) {
        this.config = config;
        this.model = null;
    }

    async loadModel() {
        console.log("加载模型:", this.config.modelUrl);
        this.model = true;
    }

    // 自由聊天
    async generateResponse(userInput, systemPrompt) {
        const cuteReplies = [
            "😊 哇，我明白了，我们继续聊吧！",
            "✨ 好呀，这个话题真有趣~",
            "🤗 哈哈，你真有趣！",
            "😆 这个真的好棒，我们接着聊！",
            "💖 哇，你的想法真可爱！",
            "🌸 哦哦，我懂了，继续说吧！"
        ];
        return cuteReplies[Math.floor(Math.random() * cuteReplies.length)];
    }

    // 生成故事/文章
    async generateStory(prompt) {
        const paragraphs = [
            "从前有一个小精灵，住在彩虹森林里……",
            "一天，他遇到神秘流星雨，决定踏上冒险之旅……",
            "旅途中，他遇到各种奇怪的朋友和挑战……",
            "最终，他完成了使命，也收获了友情和快乐。"
        ];
        return paragraphs.map(p => p + "\n\n").join("");
    }
}

const ai = new AI(MODEL_CONFIG);
await ai.loadModel();

const chatContainer = document.getElementById("chat-container");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const generateStoryBtn = document.getElementById("generate-story-btn");
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

// 普通聊天
sendBtn.addEventListener("click", async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;
    appendMessage(userText, "user");
    chatInput.value = "";
    const response = await ai.generateResponse(userText, systemPromptEl.value);
    appendMessage(response, "ai");
});

// 生成故事/文章
generateStoryBtn.addEventListener("click", async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;
    appendMessage(`📖 正在创作故事：${userText}`, "ai");
    const story = await ai.generateStory(userText);
    appendMessage(story, "ai");
});

// 保存系统提示
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
    const chats = Array.from(chatContainer.children).map(c => c.innerText);
    localStorage.setItem("chat_history", JSON.stringify(chats));
});

// 恢复聊天记录
window.addEventListener("load", () => {
    const chats = JSON.parse(localStorage.getItem("chat_history") || "[]");
    chats.forEach(c => {
        if (c.startsWith("😊") || c.startsWith("✨") || c.startsWith("🤗") || c.startsWith("😆") || c.startsWith("💖") || c.startsWith("🌸") || c.startsWith("📖")) {
            appendMessage(c, "ai");
        } else {
            appendMessage(c, "user");
        }
    });
});
