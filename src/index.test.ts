import SensitiveWordTool from './index'

describe('基础测试', () => {
  it('基本测验-中文:', () => {
    const sensitiveWordTool = new SensitiveWordTool()
    sensitiveWordTool.addWords(['拼多多', '多少'])
    expect(sensitiveWordTool.match('拼多少，多少多')).toContain('多少')
  })

  it('基本测验-字母（关键字大写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['HER', 'HEQ', 'XSHR'] })
    expect(sensitiveWordTool.match('xsher')).toContain('her')
  })

  it('基本测验-字母（关键字小写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })
    expect(sensitiveWordTool.match('XSHER')).toContain('HER')
  })

  it('基本测验-字母（全大写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['HER', 'HEQ', 'XSHR'] })
    expect(sensitiveWordTool.match('XSHER')).toContain('HER')
  })

  it('基本测验-字母（全小写）:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })
    expect(sensitiveWordTool.match('xsher')).toContain('her')
  })

  it('基本测验-未匹配到', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['ABCE', 'BCF'] })
    expect(sensitiveWordTool.match('ABCDE')).toHaveLength(0)
  })

  it('基本测验-匹配到多个词:', () => {
    const sensitiveWordTool = new SensitiveWordTool({ wordList: ['her', 'heq', 'xshr'] })
    const banWords = sensitiveWordTool.match('123_her_heq_xsher_heqher')
    expect(banWords).toContain('her')
    expect(banWords).toContain('heq')
  })
})
