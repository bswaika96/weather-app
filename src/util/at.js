const path = require('path')

const at = (...args) => {
    const rootFolder = path.join(__dirname, '../../')
    return path.join(rootFolder, ...args)
}

module.exports = at