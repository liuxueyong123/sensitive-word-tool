class SensitiveWordTool {
    map = {};
    static LeafKey = '__leaf__';
    static ignoredCharCodeMap = SensitiveWordTool.generateIgnoredCharCodeMap();
    /**
     * @description: 构建特殊字符的哈希表
     * @return {*}
     */
    static generateIgnoredCharCodeMap() {
        const ignoreChars = ' \t\r\n~!@#$%^&*()_+-=【】、{}|;\':"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠＝≤≥＜＞≮≯∷±＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄';
        const ignoredCharCodeMap = {};
        for (let i = 0, j = ignoreChars.length; i < j; i++) {
            ignoredCharCodeMap[ignoreChars.charCodeAt(i)] = true;
        }
        return ignoredCharCodeMap;
    }
    /**
     * @description: 过滤掉字符串中的特殊字符
     * @param {string} word 待过滤字符串
     * @return {*}
     */
    static filterIgnoredChar(word) {
        let ignoredWord = '';
        for (let i = 0, len = word.length; i < len; i++) {
            if (!SensitiveWordTool.ignoredCharCodeMap[word.charCodeAt(i)]) {
                ignoredWord += word.charAt(i);
            }
        }
        return ignoredWord;
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
     * @description: 添加敏感词
     * @param {string[]} wordList 敏感词数组
     * @return {*}
     */
    addWords(wordList) {
        for (let i = 0, len = wordList.length; i < len; i++) {
            let point = this.map;
            // 对于配置的敏感词过滤掉特殊符号
            const word = SensitiveWordTool.filterIgnoredChar(wordList[i]);
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
            if (SensitiveWordTool.ignoredCharCodeMap[code])
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
