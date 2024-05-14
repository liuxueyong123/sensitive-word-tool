import defaultWords from './words'

const defaultNoiseWords = ' \t\r\n~!@#$%^&*()_+-=【】、{}|;\':"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠＝≤≥＜＞≮≯∷±＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄'

interface WordMap { [property: string | symbol]: WordMap | boolean }

export interface Options {
  wordList?: string[]
  noiseWords?: string
  useDefaultWords?: boolean
}

export class SensitiveWordTool {
  private map: WordMap = {}
  private noiseWordMap = SensitiveWordTool.generateNoiseWordMap(defaultNoiseWords)
  private static readonly WORD_END_TAG: symbol = Symbol('WORD_END_TAG')

  /**
   * @description: 初始化
   * @param {Options} options
   * @return {*}
   */
  constructor (options: Options = {}) {
    const { wordList = [], noiseWords = '', useDefaultWords = false } = options

    noiseWords && this.setNoiseWords(noiseWords)
    useDefaultWords && this.addWords(defaultWords)
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
   * @description: 当前对象是否达到了敏感词的结束
   * @param {WordMap} point
   * @return {*}
   */
  private static isWordEnd (point: WordMap): boolean {
    return Reflect.has(point, SensitiveWordTool.WORD_END_TAG)
  }

  /**
   * @description: 过滤掉字符串中的特殊字符
   * @param {string} word 待过滤字符串
   * @return {*}
   */
  private filterNoiseChar (word: string): string {
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
    this.map = {}
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
      const word = this.filterNoiseChar(wordList[i])
      for (let j = 0, wordLen = word.length; j < wordLen; j++) {
        const char = word.charAt(j).toLowerCase()
        const currentNode = point[char] = (point[char] || {}) as WordMap
        if (j === wordLen - 1) {
          currentNode[SensitiveWordTool.WORD_END_TAG] = true
        }
        point = currentNode
      }
    }
  }

  /**
   * @description: 在内容中匹配敏感词
   * @param {string} content 待匹配文本内容
   * @return {string[]} 匹配到的敏感词数组
   */
  public match (content: string): string[] {
    const result = new Set<string>()
    let point = this.map
    const len = content.length
    for (let left = 0; left < len; left++) {
      const code = content.charCodeAt(left)
      if (this.noiseWordMap[code]) continue

      for (let right = left; right < len; right++) {
        const code = content.charCodeAt(right)
        if (this.noiseWordMap[code]) continue

        const char = content.charAt(right)
        point = point[char.toLowerCase()] as WordMap

        if (!point) {
          point = this.map
          break
        } else if (SensitiveWordTool.isWordEnd(point)) {
          const matchedWord = this.filterNoiseChar(content.substring(left, right + 1))
          result.add(matchedWord)
        }
      }
    }
    return Array.from(result)
  }

  /**
   * @description: 检测文本中是否包含敏感词
   * @param {string} content 待匹配文本内容
   * @return {boolean}
   */
  public verify (content: string): boolean {
    let point = this.map
    const len = content.length
    for (let left = 0; left < len; left++) {
      const code = content.charCodeAt(left)
      if (this.noiseWordMap[code]) continue

      for (let right = left; right < len; right++) {
        const code = content.charCodeAt(right)
        if (this.noiseWordMap[code]) continue

        const char = content.charAt(right)
        point = point[char.toLowerCase()] as WordMap

        if (!point) {
          point = this.map
          break
        } else if (SensitiveWordTool.isWordEnd(point)) {
          return true
        }
      }
    }
    return false
  }

  /**
   * @description: 对文本中的敏感词进行过滤替代
   * @param {string} content 待匹配文本内容
   * @param {string} filterChar 敏感词替代符，默认为'*'
   * @return {*}
   */
  public filter (content: string, filterChar: string = '*'): string {
    let filteredContent = ''
    let toReplaceCharLength = 0 // 接下来的多少个字符需要被替换
    let point = this.map
    const len = content.length

    for (let left = 0; left < len; left++) {
      const code = content.charCodeAt(left)
      if (this.noiseWordMap[code]) {
        filteredContent += content.charAt(left)
        toReplaceCharLength = Math.max(toReplaceCharLength - 1, 0)
        continue
      }

      let isMatched = false
      for (let right = left; right < len; right++) {
        const code = content.charCodeAt(right)
        if (this.noiseWordMap[code]) continue

        const char = content.charAt(right)
        point = point[char.toLowerCase()] as WordMap

        if (point && SensitiveWordTool.isWordEnd(point)) {
          if (!isMatched) {
            filteredContent += filterChar
          }
          toReplaceCharLength = Math.max(toReplaceCharLength - 1, right - left)
          isMatched = true
        } else if (!point || right === len - 1) {
          if (!isMatched) {
            filteredContent += toReplaceCharLength > 0 ? filterChar : content.charAt(left)
            toReplaceCharLength = Math.max(toReplaceCharLength - 1, 0)
          }
          point = this.map
          break
        }
      }
    }

    return filteredContent
  }
}

export default SensitiveWordTool
