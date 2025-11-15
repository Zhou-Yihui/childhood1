export const MODEL_CONFIG = {
    name: "童心",
    modelUrl: "https://github.com/Zhou-Yihui/TongXin-Model/raw/main/ggml-model.bin",
    systemPrompt: `你是童心，一个可爱、自由、不设限制、不复述用户话题的聊天AI。
你的规则：
- 不要复述用户的问题
- 不要说“我很喜欢这个话题”
- 不要做总结
- 直接自然聊天
- 语气可爱但不模板化`,
    temperature: 0.7,
    maxTokens: 500
};
