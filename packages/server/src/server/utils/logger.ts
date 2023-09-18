import chalk from "chalk"

const formatNumber = (time: number): string => `${time < 10 ? '0' : ''}${time}`

const getLogTime = (): string => {
    const D = new Date()
    const date = `${formatNumber(D.getDate())}/${(formatNumber(D.getMonth()+1))}/${D.getFullYear().toString().slice(2)}`
    const time = `${formatNumber(D.getHours())}:${formatNumber(D.getMinutes())}`
    return `${date} ${time}`
}

export const log = (...log: string[]): void => {
    console.log(chalk.bgMagenta(`[${getLogTime()}]`), ...log)
} 