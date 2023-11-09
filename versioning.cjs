const fs = require('fs')
const path = require('path')

const versionFilePath = path.join(__dirname, 'package.json')
const versionFile = require(versionFilePath)

function incrementVersion(part) {
    const currentVersion = versionFile.version
        .split('.')
        .map((num) => parseInt(num, 10))

    if (part === 'major') {
        currentVersion[0] += 1
        currentVersion[1] = 0
        currentVersion[2] = 0
    } else if (part === 'minor') {
        currentVersion[1] += 1
        currentVersion[2] = 0
    } else if (part === 'patch') {
        currentVersion[2] += 1
    }

    return currentVersion.join('.')
}

const part = process.argv[2]
if (!part) {
    console.error(
        'Please specify version part to increment: major, minor, or patch'
    )
    process.exit(1)
}

const newVersion = incrementVersion(part)
versionFile.version = newVersion

fs.writeFileSync(versionFilePath, JSON.stringify(versionFile, null, 2) + '\n')

console.log(`Version updated to: ${newVersion}`)
