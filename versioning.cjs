const fs = require('fs')
const path = require('path')
const semver = require('semver')

const versionFilePath = path.join(__dirname, 'package.json')

function readPackageFile() {
    return require(versionFilePath)
}

function incrementVersion(currentVersion, part) {
    return semver.inc(currentVersion, part)
}

function writePackageFile(versionFile) {
    fs.writeFileSync(
        versionFilePath,
        JSON.stringify(versionFile, null, 2) + '\n'
    )
}

function main() {
    const part = process.argv[2]

    if (!part) {
        console.error(
            'Please specify a valid version part to increment: major, minor, patch'
        )
        process.exit(1)
    }

    const versionFile = readPackageFile()
    const currentVersion = versionFile.version
    const newVersion = incrementVersion(currentVersion, part)

    versionFile.version = newVersion
    writePackageFile(versionFile)

    console.log(`Version updated to: ${newVersion}`)
}

main()
