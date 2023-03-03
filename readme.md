# sensitive-word-tool

![npm](https://img.shields.io/npm/dm/sensitive-word-tool)

基于 dfa 算法实现，非常轻巧的 JavaScript 敏感词过滤库🚀

## 安装

- 使用 npm

```sh
npm install sensitive-word-tool
```

- 使用 yarn

```sh
yarn add sensitive-word-tool
```

- 使用 pnpm

```sh
pnpm add sensitive-word-tool
```

## 使用

### 导入包

- CommonJS 导入

```js
const SensitiveWordTool = require('sensitive-word-tool')
```

- ESModule 导入

```js
import SensitiveWordTool from 'sensitive-word-tool'
```

### 进行敏感词检测

```ts
import SensitiveWordTool from 'sensitive-word-tool'

const sensitiveWordTool = new SensitiveWordTool({
  wordList: ['王八蛋', '王八羔子', '测试', '江南皮革厂']
})
const banWords = sensitiveWordTool.match('浙江温州，浙江温州，江南 皮革厂老板王$八&蛋，带着小姨子跑了')
console.log(banWords) // ['江南皮革厂', '王八蛋']


const banWords2 = sensitiveWordTool.match('皮革厂老板带着小姨子跑了')
console.log(banWords2) // []


sensitiveWordTool.addWords(['小姨子']) // 继续增加敏感词
const banWords3 = sensitiveWordTool.match('江南皮革厂老板带着小姨子跑了')
console.log(banWords3) // ['江南皮革厂', '小姨子']


sensitiveWordTool.clearWords() // 清空当前的敏感词
sensitiveWordTool.addWords(['江南皮革厂'])
const banWords4 = sensitiveWordTool.match('江南皮革厂老板带着小姨子跑了')
console.log(banWords4) // ['江南皮革厂']


sensitiveWordTool.clearWords()
sensitiveWordTool.setNoiseWords(' $') // 主动设置干扰词（不设置将使用默认干扰词），敏感词检测时会将文本中的干扰词删除再匹配
sensitiveWordTool.addWords(['王八蛋', '王八羔子', '测试', '江南皮革厂'])
const banWords5 = sensitiveWordTool.match('浙江温州，浙江温州，江南 皮革$厂老板王$八&蛋，带着小姨子跑了')
console.log(banWords5) // ['江南皮革厂']


const sensitiveWordTool2 = new SensitiveWordTool({
  wordList: ['王八蛋', '王八羔子', '测试', '江南皮革厂'],
  noiseWords: ' $'
}) // 初始化时主动设置干扰词
const banWords6 = sensitiveWordTool2.match('浙江温州，浙江温州，江南 皮革$厂老板王$八&蛋，带着小姨子跑了')
console.log(banWords6) // ['江南皮革厂']


const sensitiveWordTool3 = new SensitiveWordTool() // 初始化时不带任何参数
sensitiveWordTool3.addWords(['王八蛋', '王八羔子', '测试', '江南皮革厂'])
const banWords6 = sensitiveWordTool3.match('浙江温州，浙江温州，江南 皮革$厂老板王$八&蛋，带着小姨子跑了')
console.log(banWords6) // ['江南皮革厂', '王八蛋']
```

### API

文档待补充

## TODOs

- [x] 增加单元测试
- [X] 打包代码压缩
- [ ] 支持 CI
- [x] 提供 readme 文档
- [ ] 提供默认的敏感词
- [x] 支持配置干扰词: `setNoiseWords`
- [ ] 支持从敏感词库中删除敏感词： `deleteWords`
- [ ] 支持对敏感词进行过滤替代： `filter`
- [ ] 支持校验文本中是否有敏感词： `verify`
