export const selectAll = {
    // 為 <template> 的 v-select-all（aBccD -> v-a-bcc-d）
    inserted(el) {
        let input = el.querySelector('.q-field__native')
        input.addEventListener('focus', () => {
            if (input.value.length) {
                input.select()
            }
        })
    }
}