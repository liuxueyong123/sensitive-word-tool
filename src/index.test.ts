import SensitiveWordTool from './index'

describe('基础测试', () => {
  it('中文:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['拼多多', '多少'])

    const banWords = sensitiveWordTool.match('拼多少，多少多')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('多少')

    const isIncludes = sensitiveWordTool.verify('拼多少，多少多')
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter('拼多少，多少多', '*')
    expect(filteredText).toBe('拼**，**多')
  })

  it('字母（关键字大写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['HER', 'HEQ', 'XSHR'] })

    const banWords = sensitiveWordTool.match('xsher')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('her')

    const isIncludes = sensitiveWordTool.verify('xsher')
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter('xsher', '*')
    expect(filteredText).toBe('xs***')
  })

  it('字母（关键字小写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })

    const banWords = sensitiveWordTool.match('XSHER')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('HER')

    const isIncludes = sensitiveWordTool.verify('XSHER')
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter('XSHER', '*')
    expect(filteredText).toBe('XS***')
  })

  it('字母（全大写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['HER', 'HEQ', 'XSHR'] })

    const banWords = sensitiveWordTool.match('XSHER')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('HER')

    const isIncludes = sensitiveWordTool.verify('XSHER')
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter('XSHER', '*')
    expect(filteredText).toBe('XS***')
  })

  it('字母（全小写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })

    const banWords = sensitiveWordTool.match('xsher')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('her')

    const isIncludes = sensitiveWordTool.verify('xsher')
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter('xsher', '*')
    expect(filteredText).toBe('xs***')
  })

  it('未匹配到', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['ABCE', 'BCF'] })

    const banWords = sensitiveWordTool.match('ABCDE')
    expect(banWords).toHaveLength(0)

    const isIncludes = sensitiveWordTool.verify('ABCDE')
    expect(isIncludes).toBeFalsy()

    const filteredText = sensitiveWordTool.filter('ABCDE', '*')
    expect(filteredText).toBe('ABCDE')
  })

  it('匹配到多个词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })

    const banWords = sensitiveWordTool.match('123_her_heq_xsher_heqher')
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('her')
    expect(banWords).toContain('heq')

    const isIncludes = sensitiveWordTool.verify('123_her_heq_xsher_heqher')
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter('123_her_heq_xsher_heqher', '*')
    expect(filteredText).toBe('123_***_***_xs***_******')
  })
})

describe('干扰词', () => {
  const text = '怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334'

  it('使用默认干扰词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。*@@***** *112334')
  })

  it('初始化时自定义干扰词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({
      wordList: ['测试', '王八蛋', '王八羔子', '测试一下'],
      noiseWords: ' &'
    })

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('测试')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。王@@八***羔 子112334')
  })

  it('setNoiseWords 自定义干扰词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })
    sensitiveWordTool.setNoiseWords(' &')

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('测试')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。王@@八***羔 子112334')
  })

  it('自定义干扰词覆盖初始化的干扰词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({
      wordList: ['测试', '王八蛋', '王八羔子', '测试一下'],
      noiseWords: ' &'
    })
    sensitiveWordTool.setNoiseWords(' &@*')

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。*@@***** *112334')
  })
})

describe('添加敏感词', () => {
  const text = '怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334'

  it('使用默认敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ useDefaultWords: true })

    const text = '怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334出售 炸药weg'
    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('炸药')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334出售 **weg')
  })

  it('初始化时添加敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。*@@***** *112334')
  })

  it('使用 addWords 添加敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool()

    sensitiveWordTool.addWords(['测试', '王八蛋', '王八羔子', '测试一下'])
    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')
    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()
    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。*@@***** *112334')

    sensitiveWordTool.addWords(['好用'])
    const banWords2 = sensitiveWordTool.match(text)
    expect(banWords2).toHaveLength(3)
    expect(banWords2).toContain('测试')
    expect(banWords2).toContain('王八羔子')
    expect(banWords2).toContain('好用')
    const isIncludes2 = sensitiveWordTool.verify(text)
    expect(isIncludes2).toBeTruthy()
    const filteredText2 = sensitiveWordTool.filter(text, '*')
    expect(filteredText2).toBe('怎么还可以这么*& *呢，这个库可真**呀。*@@***** *112334')
  })

  it('初始化后继续使用 addWords 添加敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })
    sensitiveWordTool.addWords(['好用'])
    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(3)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')
    expect(banWords).toContain('好用')
    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()
    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真**呀。*@@***** *112334')
  })
})

describe('清空敏感词', () => {
  it('清空敏感词:', () => {
    const text = '怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334'
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })
    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')
    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()
    const filteredText = sensitiveWordTool.filter(text, '*')
    expect(filteredText).toBe('怎么还可以这么*& *呢，这个库可真好用呀。*@@***** *112334')

    sensitiveWordTool.clearWords()
    const banWords2 = sensitiveWordTool.match(text)
    expect(banWords2).toHaveLength(0)
    const isIncludes2 = sensitiveWordTool.verify(text)
    expect(isIncludes2).toBeFalsy()
    const filteredText2 = sensitiveWordTool.filter(text, '*')
    expect(filteredText2).toBe('怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334')

    sensitiveWordTool.addWords(['好用'])
    const banWords3 = sensitiveWordTool.match(text)
    expect(banWords3).toHaveLength(1)
    expect(banWords3).toContain('好用')
    const isIncludes3 = sensitiveWordTool.verify(text)
    expect(isIncludes3).toBeTruthy()
    const filteredText3 = sensitiveWordTool.filter(text, '*')
    expect(filteredText3).toBe('怎么还可以这么测& 试呢，这个库可真**呀。王@@八***羔 子112334')
  })
})

describe('边界测试', () => {
  const text = '这个库真的写了@好多 好*多的测试& 用例，希望未来能覆盖%更 多的边#界场景，不断变好'
  it('多个重复的敏感词match只返回一遍，但filter会全部过滤:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['好多', '测试'])

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('好多')
    expect(banWords).toContain('测试')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text, '$')
    expect(filteredText).toBe('这个库真的写了@$$ $*$的$$& 用例，希望未来能覆盖%更 多的边#界场景，不断变好')
  })

  it('文本中出现连续的敏感词，要求全部能识别到:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['测试', '试用'])

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('试用')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text)
    expect(filteredText).toBe('这个库真的写了@好多 好*多的**& *例，希望未来能覆盖%更 多的边#界场景，不断变好')
  })

  it('敏感词之间出现包含关系:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['测试用', '测试', '测试用例'])

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(3)
    expect(banWords).toContain('测试用')
    expect(banWords).toContain('测试')
    expect(banWords).toContain('测试用例')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text)
    expect(filteredText).toBe('这个库真的写了@好多 好*多的**& **，希望未来能覆盖%更 多的边#界场景，不断变好')
  })

  it('句首出现敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['这个', '试用', '好人'])

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('这个')
    expect(banWords).toContain('试用')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text)
    expect(filteredText).toBe('**库真的写了@好多 好*多的测*& *例，希望未来能覆盖%更 多的边#界场景，不断变好')
  })

  it('句尾出现敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['测试', '变好', '好人'])

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('变好')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()

    const filteredText = sensitiveWordTool.filter(text)
    expect(filteredText).toBe('这个库真的写了@好多 好*多的**& 用例，希望未来能覆盖%更 多的边#界场景，不断**')
  })
})
