export function fourPoint(value) {
    value = value.replace(/[^\d.]/g, '') //清除 ”數字“ ”.“ 以外的字符
    value = value.replace(/\.{2,}/g, '.') //保留第一個 "." ，清除其他的
    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3') //只能輸入四個小數
    if (value.indexOf('.') < 0 && value != '') { //如果沒有小數點，首位不能為0。ex:01, 02
        value = parseFloat(value)
    }
    return value
}