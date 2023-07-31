interface Options {
    wordList?: string[];
    noiseWords?: string;
    useDefaultWords?: boolean;
}
declare class SensitiveWordTool {
    private map;
    private noiseWordMap;
    private static readonly WordEndTag;
    /**
     * @description: 初始化
     * @param {Options} options
     * @return {*}
     */
    constructor(options?: Options);
    /**
     * @description: 构建特殊字符的哈希表
     * @return {*}
     */
    private static generateNoiseWordMap;
    /**
     * @description: 当前对象是否达到了敏感词的结束
     * @param {WordMap} point
     * @return {*}
     */
    private static isWordEnd;
    /**
     * @description: 过滤掉字符串中的特殊字符
     * @param {string} word 待过滤字符串
     * @return {*}
     */
    private filterNoiseChar;
    /**
     * @description: 手动设置干扰词，不设置时将采用默认干扰词
     * @param {string} noiseWords
     * @return {*}
     */
    setNoiseWords(noiseWords: string): void;
    /**
     * @description: 清空敏感词
     * @return {*}
     */
    clearWords(): void;
    /**
     * @description: 添加敏感词
     * @param {string[]} wordList 敏感词数组
     * @return {*}
     */
    addWords(wordList: string[]): void;
    /**
     * @description: 在内容中匹配敏感词
     * @param {string} content 待匹配文本内容
     * @return {string[]} 匹配到的敏感词数组
     */
    match(content: string): string[];
    /**
     * @description: 检测文本中是否包含敏感词
     * @param {string} content 待匹配文本内容
     * @return {boolean}
     */
    verify(content: string): boolean;
    /**
     * @description: 对文本中的敏感词进行过滤替代
     * @param {string} content 待匹配文本内容
     * @param {string} filterChar 敏感词替代符，默认为'*'
     * @return {*}
     */
    filter(content: string, filterChar?: string): string;
}

export { Options, SensitiveWordTool, SensitiveWordTool as default };
