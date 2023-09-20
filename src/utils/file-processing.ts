/**
 * 获取文件数据
 * @param {String} path - 文件路径
 */
async function getFileData(path: string) {
  let arr: Array<any> = [];
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const csvData = await response.text(); // 解析响应为文本
    const lines = csvData.trim().split("\n");

    // 循环遍历每行数据
    for (let i = 0; i < lines.length; i++) {
      // 将每行数据按逗号拆分成值
      let values = lines[i].split(",");
      arr[i] = [];
      values.map((el) => arr[i].push(el.trim()));
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
  return arr;
}

export { getFileData };
