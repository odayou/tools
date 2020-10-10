/**
* 敏感词过滤
*/
class SensitiveWord {
  constructor(sensitiveWordList) {
    this.isReplace = true
    this._sensitiveWordList = sensitiveWordList
    this._sensitiveMap = this.makeSensitiveMap(sensitiveWordList)
  }

  /**
   * @description
   * 构造敏感词map
   * @parma sensitiveWordList array  自定义的敏感词数组
   */
  makeSensitiveMap(sensitiveWordList) {
    // 构造根节点
    const result = new Map();
    // 遍历所有词
    for (const word of sensitiveWordList) {
      let map = result;
      for (let i = 0; i < word.length; i++) {
        // 依次获取字
        const char = word.charAt(i);
        // 判断是否存在
        if (map.get(char)) {
          // 转到下一层节点
          map = map.get(char);
        } else {
          const item = new Map();
          // 新增节点默认为结尾节点
          item.set('laster', false);
          map.set(char, item);
          map = map.get(char);
        }

        if (i == word.length -1) {
          map.set('laster', true)
        }
      }

    }
    return result;
  }

  /**
   * @description
   * 检查敏感词是否存在
   * @private
   * @param {any} txt
   * @param {any} index
   * @returns {flag,sensitiveWord}
   */
  checkSensitiveWord(sensitiveMap, txt, index) {
    let currentMap = sensitiveMap;
    let flag = false;
    let wordNum = 0;//记录过滤
    let sensitiveWord = ''; //记录过滤出来的敏感词
    for (let i = index; i < txt.length; i++) {
      const word = txt.charAt(i);
      currentMap = currentMap.get(word);
      if (currentMap) {
        wordNum++;
        sensitiveWord += word;
        if (currentMap.get('laster') === true) {
          // 表示已到词的结尾
          flag = true;
          break;
        }
      } else {
        break;
      }
    }
    // 两字成词
    /*if (wordNum < 2) {
      flag = false;
    }*/
    return { flag, sensitiveWord };
  }

  /**
   * @description
   * 判断文本中是否存在敏感词
   * @param {any} txt
   * @returns
   */
  filterWord(txt, replaceStr = '*') {
    let matchResult = { flag: false, sensitiveWord: '' };
    var hasSensitiveWord = false
    // 过滤掉除了中文、英文、数字之外的
    const txtTrim = txt.replace(/[^\u4e00-\u9fa5\u0030-\u0039\u0061-\u007a\u0041-\u005a]+/g, '');
    for (let i = 0; i < txtTrim.length; i++) {
      matchResult = this.checkSensitiveWord(this._sensitiveMap, txtTrim, i);
      console.log(txt,i, matchResult)
      if (matchResult.flag) {
        //这里我们可以返回false提示用户不能提交 或者把敏感词全部替换为*
        hasSensitiveWord = true
        console.log(`sensitiveWord:${matchResult.sensitiveWord}`);
        if (this.isReplace) {
          txt = txt.replace(new RegExp(matchResult.sensitiveWord, "gi"), replaceStr)
        }
      }
    }
    return {passed: hasSensitiveWord, txt: txt};
  }
}
