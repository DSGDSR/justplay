export const formatList = (list: string[]) => {
    const last = list.pop()
    return list.length === 0 ? 
            last :  [list.join(', '), last].join(' and ')  // TODO i18n
}