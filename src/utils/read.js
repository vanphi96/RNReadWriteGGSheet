// const { google } = require('googleapis');
// pls use https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account to get secret.json
const secret = require('./credential.json')
const fs = require('fs')
// Initialize the sheet
// const doc = new GoogleSpreadsheet(
//   '1PmQ85PyghUCDSwsrQFnfu43YKXeA5ASbvoIOjz9crS8',
// )

// Initialize Auth
/* eslint-disable @typescript-eslint/no-var-requires */

const init = async () => {
  // return await doc.useServiceAccountAuth({
  //   client_email: secret.client_email, //don't forget to share the Google sheet with your service account using your client_email value
  //   private_key: secret.private_key,
  // })
}
const read = async () => {
  // await doc.loadInfo() // loads document properties and worksheets
  // const sheet = doc.sheetsByTitle.Sheet1 //get the sheet by title, I left the default title name. If you changed it, then you should use the name of your sheet
  // await sheet.loadHeaderRow() //Loads the header row (first row) of the sheet
  // const colTitles = sheet.headerValues //array of strings from cell values in the first row
  // const rows = await sheet.getRows({ limit: sheet.rowCount }) //fetch rows from the sheet (limited to row count)
  // let result = {}
  // //map rows values and create an object with keys as columns titles starting from the second column (languages names) and values as an object with key value pairs, where the key is a key of translation, and value is a translation in a respective language
  // rows.map(row => {
  //   colTitles.slice(1).forEach(title => {
  //     result[title] = result[title] || []
  //     const key = row[colTitles[0]]
  //     const content = row[title] !== '' ? row[title]?.replace('\\ n', '\n') : ''
  //     result = {
  //       ...result,
  //       [title]: {
  //         ...result[title],
  //         [key]: content,
  //       },
  //     }
  //   })
  // })

  // return result
}

const write = data => {
  // Object.keys(data).forEach(key => {
  //   fs.writeFile(
  //     `./src/languages/translations/${key}.json`,
  //     JSON.stringify(data[key], null, 2),
  //     err => {
  //       if (err) {
  //         console.error(err)
  //       }
  //     },
  //   )
  // })
}

// init()
//   .then(() => read())
//   .then(data => write(data))
//   .catch(err => console.log('ERROR!!!!', err))
