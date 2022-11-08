class transaction {
    constructor (id, date, vendor, amount, category, account, program, account_group, budget, description) {
        this.id = id
        this.date = date
        this.vendor = vendor
        this.amount = amount
        this.category = category
        this.account = account
        this.program = program
        this.account_group = account_group
        this.budget = budget
        this.description = description
    }
}

module.exports = transaction