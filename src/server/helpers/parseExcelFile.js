import xlsx from 'xlsx'

const parseExcelFile = (buffer) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const userData = xlsx.utils.sheet_to_json(sheet)
  userData.forEach((user) => {
    user.password = String(user.password)
  })

  return userData
}

export { parseExcelFile }
