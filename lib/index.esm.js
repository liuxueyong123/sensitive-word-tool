const defaultNoiseWords = ' \t\r\n~!@#$%^&*()_+-=【】、{}|;\':"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠＝≤≥＜＞≮≯∷±＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄';

class SensitiveWordTool {
    map = {};
    noiseWordMap = SensitiveWordTool.generateNoiseWordMap(defaultNoiseWords);
    static LeafKey = '__leaf__';
    /**
     * @description: 初始化
     * @param {Options} options
     * @return {*}
     */
    constructor(options = {}) {
        const { wordList = [], noiseWords = '' } = options;
        noiseWords && this.setNoiseWords(noiseWords);
        this.addWords(wordList);
    }
    /**
     * @description: 构建特殊字符的哈希表
     * @return {*}
     */
    static generateNoiseWordMap(noiseWords) {
        const noiseWordMap = {};
        for (let i = 0, j = noiseWords.length; i < j; i++) {
            noiseWordMap[noiseWords.charCodeAt(i)] = true;
        }
        return noiseWordMap;
    }
    /**
     * @description: 当前对象是否是叶子节点
     * @param {WordMap} point
     * @return {*}
     */
    static isLeaf(point) {
        return Reflect.has(point, SensitiveWordTool.LeafKey);
    }
    /**
     * @description: 生成敏感词叶子节点
     * @return {*}
     */
    static generateLeafObj() {
        return {
            [SensitiveWordTool.LeafKey]: true
        };
    }
    /**
     * @description: 过滤掉字符串中的特殊字符
     * @param {string} word 待过滤字符串
     * @return {*}
     */
    filterIgnoredChar(word) {
        let ignoredWord = '';
        for (let i = 0, len = word.length; i < len; i++) {
            if (!this.noiseWordMap[word.charCodeAt(i)]) {
                ignoredWord += word.charAt(i);
            }
        }
        return ignoredWord;
    }
    /**
     * @description: 手动设置干扰词，不设置时将采用默认干扰词
     * @param {string} noiseWords
     * @return {*}
     */
    setNoiseWords(noiseWords) {
        this.noiseWordMap = SensitiveWordTool.generateNoiseWordMap(noiseWords);
    }
    /**
     * @description: 清空敏感词
     * @return {*}
     */
    clearWords() {
        this.map = {};
    }
    /**
     * @description: 添加敏感词
     * @param {string[]} wordList 敏感词数组
     * @return {*}
     */
    addWords(wordList) {
        for (let i = 0, len = wordList.length; i < len; i++) {
            let point = this.map;
            // 对于配置的敏感词也过滤掉特殊符号
            const word = this.filterIgnoredChar(wordList[i]);
            for (let j = 0, wordLen = word.length; j < wordLen; j++) {
                // 当前节点已经是子节点，说明有更简短的敏感词，当前敏感词也就不需要再往下继续了
                if (SensitiveWordTool.isLeaf(point))
                    break;
                const char = word.charAt(j).toLowerCase();
                if (j === wordLen - 1) {
                    point[char] = SensitiveWordTool.generateLeafObj();
                    break;
                }
                point = point[char] = (point[char] || {});
            }
        }
    }
    /**
     * @description: 在内容中匹配敏感词
     * @param {string} content 待匹配内容
     * @return {string[]} 匹配到的敏感词数组
     */
    match(content) {
        const result = [];
        let stack = [];
        let point = this.map;
        for (let i = 0, len = content.length; i < len; i++) {
            const code = content.charCodeAt(i);
            if (this.noiseWordMap[code])
                continue;
            const char = content.charAt(i);
            point = point[char.toLowerCase()];
            if (point && !SensitiveWordTool.isLeaf(point)) {
                stack.push(char);
                continue;
            }
            if (!point) {
                i = i - stack.length;
            }
            else if (SensitiveWordTool.isLeaf(point)) {
                stack.push(char);
                result.push(stack.join(''));
            }
            stack = [];
            point = this.map;
        }
        return result;
    }
}

export { SensitiveWordTool as default };
//# sourceMappingURL=index.esm.js.map
