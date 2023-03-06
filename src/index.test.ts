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
  })

  it('字母（关键字大写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['HER', 'HEQ', 'XSHR'] })

    const banWords = sensitiveWordTool.match('xsher')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('her')

    const isIncludes = sensitiveWordTool.verify('xsher')
    expect(isIncludes).toBeTruthy()
  })

  it('字母（关键字小写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })

    const banWords = sensitiveWordTool.match('XSHER')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('HER')

    const isIncludes = sensitiveWordTool.verify('XSHER')
    expect(isIncludes).toBeTruthy()
  })

  it('字母（全大写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['HER', 'HEQ', 'XSHR'] })

    const banWords = sensitiveWordTool.match('XSHER')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('HER')

    const isIncludes = sensitiveWordTool.verify('XSHER')
    expect(isIncludes).toBeTruthy()
  })

  it('字母（全小写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })

    const banWords = sensitiveWordTool.match('xsher')
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('her')

    const isIncludes = sensitiveWordTool.verify('xsher')
    expect(isIncludes).toBeTruthy()
  })

  it('未匹配到', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['ABCE', 'BCF'] })

    const banWords = sensitiveWordTool.match('ABCDE')
    expect(banWords).toHaveLength(0)

    const isIncludes = sensitiveWordTool.verify('ABCDE')
    expect(isIncludes).toBeFalsy()
  })

  it('匹配到多个词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })

    const banWords = sensitiveWordTool.match('123_her_heq_xsher_heqher')
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('her')
    expect(banWords).toContain('heq')

    const isIncludes = sensitiveWordTool.verify('123_her_heq_xsher_heqher')
    expect(isIncludes).toBeTruthy()
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
  })

  it('setNoiseWords 自定义干扰词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })
    sensitiveWordTool.setNoiseWords(' &')

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(1)
    expect(banWords).toContain('测试')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()
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
  })
})

describe('添加敏感词', () => {
  const text = '怎么还可以这么测& 试呢，这个库可真好用呀。王@@八***羔 子112334'

  it('初始化时添加敏感词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['测试', '王八蛋', '王八羔子', '测试一下'] })

    const banWords = sensitiveWordTool.match(text)
    expect(banWords).toHaveLength(2)
    expect(banWords).toContain('测试')
    expect(banWords).toContain('王八羔子')

    const isIncludes = sensitiveWordTool.verify(text)
    expect(isIncludes).toBeTruthy()
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

    sensitiveWordTool.addWords(['好用'])
    const banWords2 = sensitiveWordTool.match(text)
    expect(banWords2).toHaveLength(3)
    expect(banWords2).toContain('测试')
    expect(banWords2).toContain('王八羔子')
    expect(banWords2).toContain('好用')
    const isIncludes2 = sensitiveWordTool.verify(text)
    expect(isIncludes2).toBeTruthy()
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

    sensitiveWordTool.clearWords()
    const banWords2 = sensitiveWordTool.match(text)
    expect(banWords2).toHaveLength(0)
    const isIncludes2 = sensitiveWordTool.verify(text)
    expect(isIncludes2).toBeFalsy()

    sensitiveWordTool.addWords(['好用'])
    const banWords3 = sensitiveWordTool.match(text)
    expect(banWords3).toHaveLength(1)
    expect(banWords3).toContain('好用')
    const isIncludes3 = sensitiveWordTool.verify(text)
    expect(isIncludes3).toBeTruthy()
  })
})
