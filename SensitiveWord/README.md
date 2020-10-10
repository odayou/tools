# 作用：判断、过滤文本中出现的敏感词
## test
``` js
var sensitiveWord = new SensitiveWord(['sb','草泥马',"萝莉","泥马","草d泥",'日', 'fuck'])
// console.log(sensitiveWord)

// 1.
sensitiveWord.filterWord('草1泥泥马') // {passed: false, txt: "草1泥*"}

// 2.
sensitiveWord.isReplace = false 
sensitiveWord.filterWord('草1泥泥马') // {passed: false, txt: "草1泥泥马"}

// 3.
sensitiveWord.isReplace = true
sensitiveWord.filterWord('草1泥泥马', 'aaa') // {padded: false, txt: "草1泥aaa"}

// 4.
sensitiveWord.filterWord('good words', 'aaa') // {padded: true, txt: "good words"}
```
