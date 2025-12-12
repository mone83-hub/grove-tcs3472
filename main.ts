namespace GroveTCS3472 {

    const ADDRESS = 0x29
    const COMMAND_BIT = 0x80

    const ENABLE = 0x00
    const ATIME = 0x01
    const CONTROL = 0x0F
    const CDATA = 0x14

    let initialized = false

    function writeReg(reg: number, value: number) {
        pins.i2cWriteNumber(ADDRESS, COMMAND_BIT | reg, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(ADDRESS, value, NumberFormat.UInt8BE)
    }

    function readWord(reg: number): number {
        pins.i2cWriteNumber(ADDRESS, COMMAND_BIT | reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDRESS, NumberFormat.UInt16LE)
    }

    //% block="Farbsensor initialisieren"
    export function init() {
        if (initialized) return
        writeReg(ENABLE, 0x03)
        writeReg(ATIME, 0xF6)
        writeReg(CONTROL, 0x01)
        basic.pause(50)
        initialized = true
    }

    //% block="Rotwert lesen"
    export function red(): number {
        init()
        return readWord(CDATA + 2)
    }

    //% block="Grünwert lesen"
    export function green(): number {
        init()
        return readWord(CDATA + 4)
    }

    //% block="Blauwert lesen"
    export function blue(): number {
        init()
        return readWord(CDATA + 6)
    }

    //% block="Helligkeit lesen"
    export function clear(): number {
        init()
        return readWord(CDATA)
    }
}
