const uuidv4Re =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isValidUUIDv4(str: string): boolean {
  return str && uuidv4Re.test(str)
}

export function logWithTime(...messages: any): void {
  const now = new Date()
  const localTime = now.toLocaleString() // 获取本地时间表示
  console.info(localTime, '======', ...messages)
}
