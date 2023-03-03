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

- 基础用法

```ts
import SensitiveWordTool from 'sensitive-word-tool'

const sensitiveWordTool = new SensitiveWordTool()
sensitiveWordTool.addWords(['王八蛋', '王八羔子', '测试', '江南皮革厂'])
sensitiveWordTool.match('浙江温州，浙江温州，江南 皮革厂老板王$八&蛋，带着小姨子跑了') // ['江南皮革厂', '王八蛋']
sensitiveWordTool.match('皮革厂老板带着小姨子跑了') // []
```

- 进阶用法

```ts
// 初始化时设置敏感词
const sensitiveWordTool = new SensitiveWordTool({ wordList: ['王八蛋', '王八羔子', '测试', '江南皮革厂'] })

// 支持继续增加敏感词
sensitiveWordTool.addWords(['小姨子'])
sensitiveWordTool.match('江南皮革厂老板带着小姨子跑了')  // ['江南皮革厂', '小姨子']


// 支持清空当前的敏感词
sensitiveWordTool.clearWords()
sensitiveWordTool.addWords(['江南皮革厂'])
sensitiveWordTool.match('江南皮革厂老板带着小姨子跑了')  // ['江南皮革厂']


// 支持主动设置干扰词（不设置将使用默认干扰词），敏感词检测时会将文本中的干扰词删除再匹配
sensitiveWordTool.setNoiseWords(' $')
sensitiveWordTool.match('浙江温州，浙江温州，江南 皮革$厂老板王$八&蛋，带着小姨子跑了')  // ['江南皮革厂']


// 初始化时主动设置干扰词
const sensitiveWordTool2 = new SensitiveWordTool({
  wordList: ['王八蛋', '王八羔子', '测试', '江南皮革厂'],
  noiseWords: ' $'
})
sensitiveWordTool2.match('浙江温州，浙江温州，江南 皮革$厂老板王$八&蛋，带着小姨子跑了')  // ['江南皮革厂']
```

### API

### Constructor

构造函数

#### 示例

```ts
const sensitiveWordTool2 = new SensitiveWordTool({
  wordList: ['王八蛋', '王八羔子', '测试', '江南皮革厂'],
  noiseWords: ' $'
})
```

##### 参数

- `wordList`: 可选。用于设置初始的敏感词。默认值：`[]`
- `noiseWords`: 可选。用于设置干扰词，敏感词检测时会将待检测文本中的干扰词删除后再匹配。默认值：

```
 \t\r\n~!@#$%^&*()_+-=【】、{}|;\':"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠＝≤≥＜＞≮≯∷±＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄
```

### `setNoiseWords`

设置干扰词。

##### 示例

```ts
sensitiveWordTool.setNoiseWords(' $')
```

### `clearWords`

清空当前设置的干扰词。

##### 示例

```ts
sensitiveWordTool.clearWords()
```

### `addWords`

继续增加敏感词。

##### 示例

```ts
sensitiveWordTool.addWords(['王八蛋', '王八羔子', '测试', '江南皮革厂'])
```

### `match`

从文本中匹配出所有出现过的敏感词。返回匹配到的敏感词数组，如未匹配则返回空数组。

##### 示例

```ts
sensitiveWordTool2.match('浙江温州，浙江温州，江南 皮革$厂老板王$八&蛋，带着小姨子跑了')
```

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
