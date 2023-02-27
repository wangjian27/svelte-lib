// 使用正则处理需要语音播报的文章
const replaceByRegExp = (str: string) => {
  return str
    .replace(/<span class="sp-parent(.*?)><span class="sp-robot(.*?)<\/span><\/span>/g, '')
    .replace(/<script\b[^>]*>[\s\S]*<\/script>/g, '')
    .replace(/\s{2,}/g, '')
    .replace(/[\r\n]/g, '')
    .replace(/<img[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp/g, '&')
    .replace(/&;/g, '&')
    .replace(/<table(.*?)<\/table>/g, '')
    .replace(/<style(.*?)<\/style>/g, '')
    .replace(/表格支持左右滑动/g, '')
    .replace(/<[^>]*[^/]>/gi, '')
    .replace(/>{1,}/g, '')
    .replace(/&gt;/g, '')
    .replace(/_{2,}/g, '');
};
const searchSubStr = (str, subStr) => {
  const res = [];
  let pos = str.indexOf(subStr);
  while (pos > -1) {
    res.push(str.slice(0, pos + 1));
    str = str.slice(pos + 1);
    pos = str.indexOf(subStr);
  }
  if (str) {
    res.push(str);
  }
  return res;
};
const getStrArr = (stringParams, getType) => {
  return (
    searchSubStr(stringParams, '。')
      // 处理为二维数组
      .map((item) => {
        if (item.indexOf('；') > -1) {
          item = searchSubStr(item, '；');
        }
        return item;
      })
      // 处理为一维数组
      .reduce((item, cur) => {
        if (getType(cur) === 'array') {
          item = [...item, ...cur];
        } else {
          item.push(cur);
        }
        return item;
      }, [])
  );
};
const greaterThanClientNum = ({ strArr, clientNum, result, i }) => {
  let temp = '';
  while (strArr[i].length > clientNum) {
    temp = strArr[i].slice(0, clientNum - 1);
    strArr[i] = strArr[i].slice(clientNum - 1);
    if (temp) {
      result.push(temp);
    }
    temp = '';
  }
  if (strArr[i + 1]) {
    strArr[i + 1] = strArr[i] + strArr[i + 1];
  } else {
    temp = strArr[i];
    if (temp) {
      result.push(temp);
    }
  }
  return { strArr, result };
};
const lessClientNum = ({ strArr, i, clientNum, result }) => {
  let temp = '';
  temp = strArr[i];
  if ((temp + strArr[i + 1]).length < clientNum) {
    while (temp.length < clientNum && strArr[i + 1]) {
      temp = temp + strArr[i + 1];
      i++;
    }
  }
  if (temp) {
    result.push(temp);
  }
  return { result, strArr, i };
};
// 对文本进行512字符切分以适应客户端协议
const splitStrForNative = (stringParams) => {
  const num8 = 8;
  const getType = (obj) => Object.prototype.toString.call(obj).slice(num8, -1).toLowerCase();
  let result = [];
  let strArr = getStrArr(stringParams, getType);
  const clientNum = 512;
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i].length > clientNum) {
      const greaterResult = greaterThanClientNum({ strArr, clientNum, result, i });
      strArr = greaterResult.strArr;
      result = greaterResult.result;
    } else {
      const lessResult = lessClientNum({ strArr, i, clientNum, result });
      strArr = lessResult.strArr;
      result = lessResult.result;
      i = lessResult.i;
    }
  }
  return result;
};
export const dealContent = (content: string) => {
  const originData = replaceByRegExp(content);
  const origniformatData = splitStrForNative(originData);
  return {
    origniformatData,
    dataLength: originData.length
  };
};
