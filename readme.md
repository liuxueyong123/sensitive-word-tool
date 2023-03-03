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

const sensitiveWordTool = new SensitiveWordTool()
sensitiveWordTool.addWords(['王八蛋', '王八羔子', '测试', '江南皮革厂'])
const banWords = sensitiveWordTool.match('江南 皮革厂老板王$八$蛋，带着小姨子跑了')
console.log(banWords) // ['江南皮革厂', '王八蛋']

const banWords2 = sensitiveWordTool.match('皮革厂老板带着小姨子跑了')
console.log(banWords2) // []

sensitiveWordTool.addWords(['小姨子'])
const banWords3 = sensitiveWordTool.match('江南皮革厂老板带着小姨子跑了')
console.log(banWords3) // ['江南皮革厂', '小姨子']
```

## TODOs

- [x] 增加单元测试
- [ ] 打包代码压缩
- [ ] 支持 CI
- [x] 提供 readme 文档
- [ ] 提供默认的敏感词
- [x] 支持配置干扰词: `setNoiseWords`
- [ ] 支持从敏感词库中删除敏感词： `deleteWords`
- [ ] 支持对敏感词进行过滤替代： `filter`
- [ ] 支持校验文本中是否有敏感词： `verify`
