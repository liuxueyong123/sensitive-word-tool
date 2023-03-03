interface Options {
    wordList?: string[];
    noiseWords?: string;
}
declare class SensitiveWordTool {
    private map;
    private noiseWordMap;
    private static readonly LeafKey;
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
     * @description: 当前对象是否是叶子节点
     * @param {WordMap} point
     * @return {*}
     */
    private static isLeaf;
    /**
     * @description: 生成敏感词叶子节点
     * @return {*}
     */
    private static generateLeafObj;
    /**
     * @description: 过滤掉字符串中的特殊字符
     * @param {string} word 待过滤字符串
     * @return {*}
     */
    private filterIgnoredChar;
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
     * @param {string} content 待匹配内容
     * @return {string[]} 匹配到的敏感词数组
     */
    match(content: string): string[];
}

export { Options, SensitiveWordTool as default };
