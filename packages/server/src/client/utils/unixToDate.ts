export default (unix: number): Date => {
    return new Date(unix * 1000)
}