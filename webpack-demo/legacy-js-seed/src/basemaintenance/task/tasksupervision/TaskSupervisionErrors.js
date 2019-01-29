class MandatoryUserError extends Error {
    constructor(message) {
        super(message)
        this.name = 'MandatoryUserError'
        this.message = message
    }
}

class MandatoryCrewsFieldIdError extends Error {
    constructor(message) {
        super(message)
        this.name = 'MandatoryCrewsFieldIdError'
        this.message = message
    }
}

class InvalidCrewsFieldTypeError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidCrewsFieldTypeError'
        this.message = message
    }
}

module.exports = {
    MandatoryUserError,
    MandatoryCrewsFieldIdError,
    InvalidCrewsFieldTypeError
}
