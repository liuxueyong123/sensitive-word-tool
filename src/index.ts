import { defaultNoiseWords } from './config'

interface WordMap { [property: string]: WordMap | boolean }

class SensitiveWordTool {
  private readonly map: WordMap = {}
  private noiseWordMap = SensitiveWordTool.generateNoiseWordMap(defaultNoiseWords)
  private static readonly LeafKey = '__leaf__'

  /**
   * @description: 初始化敏感词
   * @param {string} wordList 需要过滤的敏感词
   * @return {*}
   */
  constructor (wordList: string[] = []) {
    this.addWords(wordList)
  }

  /**
   * @description: 构建特殊字符的哈希表
   * @return {*}
   */
  private static generateNoiseWordMap (noiseWords: string): Record<number, boolean> {
    const noiseWordMap: Record<number, boolean> = {}
    for (let i = 0, j = noiseWords.length; i < j; i++) {
      noiseWordMap[noiseWords.charCodeAt(i)] = true
    }
    return noiseWordMap
  }

  /**
   * @description: 当前对象是否是叶子节点
   * @param {WordMap} point
   * @return {*}
   */
  private static isLeaf (point: WordMap): boolean {
    return Reflect.has(point, SensitiveWordTool.LeafKey)
  }

  /**
   * @description: 生成敏感词叶子节点
   * @return {*}
   */
  private static generateLeafObj (): WordMap {
    return {
      [SensitiveWordTool.LeafKey]: true
    }
  }

  /**
   * @description: 过滤掉字符串中的特殊字符
   * @param {string} word 待过滤字符串
   * @return {*}
   */
  private filterIgnoredChar (word: string): string {
    let ignoredWord = ''
    for (let i = 0, len = word.length; i < len; i++) {
      if (!this.noiseWordMap[word.charCodeAt(i)]) {
        ignoredWord += word.charAt(i)
      }
    }
    return ignoredWord
  }

  /**
   * @description: 手动设置干扰词，不设置时将采用默认干扰词
   * @param {string} noiseWords
   * @return {*}
   */
  public setNoiseWords (noiseWords: string): void {
    this.noiseWordMap = SensitiveWordTool.generateNoiseWordMap(noiseWords)
  }

  /**
   * @description: 清空敏感词
   * @return {*}
   */
  public clearWords (): void {
    this.noiseWordMap = {}
  }

  /**
   * @description: 添加敏感词
   * @param {string[]} wordList 敏感词数组
   * @return {*}
   */
  public addWords (wordList: string[]): void {
    for (let i = 0, len = wordList.length; i < len; i++) {
      let point = this.map
      // 对于配置的敏感词也过滤掉特殊符号
      const word = this.filterIgnoredChar(wordList[i])
      for (let j = 0, wordLen = word.length; j < wordLen; j++) {
        // 当前节点已经是子节点，说明有更简短的敏感词，当前敏感词也就不需要再往下继续了
        if (SensitiveWordTool.isLeaf(point)) break

        const char = word.charAt(j).toLowerCase()
        if (j === wordLen - 1) {
          point[char] = SensitiveWordTool.generateLeafObj()
          break
        }

        point = point[char] = (point[char] || {}) as WordMap
      }
    }
  }

  /**
   * @description: 在内容中匹配敏感词
   * @param {string} content 待匹配内容
   * @return {string[]} 匹配到的敏感词数组
   */
  public match (content: string): string[] {
    const result: string[] = []
    let stack: string[] = []
    let point = this.map
    for (let i = 0, len = content.length; i < len; i++) {
      const code = content.charCodeAt(i)
      if (this.noiseWordMap[code]) continue

      const char = content.charAt(i)
      point = point[char.toLowerCase()] as WordMap
      if (point && !SensitiveWordTool.isLeaf(point)) {
        stack.push(char)
        continue
      }

      if (!point) {
        i = i - stack.length
      } else if (SensitiveWordTool.isLeaf(point)) {
        stack.push(char)
        result.push(stack.join(''))
      }

      stack = []
      point = this.map
    }
    return result
  }
}

export default SensitiveWordTool
