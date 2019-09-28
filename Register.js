class Register {
    taxRate = 10;
    notTaxableCategories = ['Groceries'];
    today = new Date();
    discountApplicable = false;
    discountRate = 5;
    purchasedItems = [];
    subTotal = 0;
    discountAmount = 0;
    taxesDue = 0;
    total = 0;

    constructor(hasLoyaltyCard = false) {
        if(this.today.getMonth() === 7) { // Back-To-School
            this.notTaxableCategories.push('Clothing');
            this.notTaxableCategories.push('SchoolSupplies');
        }
        if(hasLoyaltyCard) {
            this.discountApplicable = true;
            console.log("Welcome, loyal customer!");
        }
    }

    addItem(name, price, category) {
        let isTaxable = (this.notTaxableCategories.includes(category)) ? false : true ;

        this.purchasedItems.push(new Item(name, price, category, isTaxable));

        console.log(name + ": " + this.formatMoneyOuput(price));

        this.calculateSubTotal();
    }

    calculateSubTotal() {
        this.subTotal = this.purchasedItems.reduce((subT, item) => Math.round(100 * (subT = subT +item.price)) / 100, 0);
        this.total = this.subTotal;

        console.log("Sub Total: " + this.formatMoneyOuput(this.subTotal));
    }

    calculateTotal() {
        if(this.discountApplicable) {
            // Math.round(100*X)/100;
            this.discountAmount = Math.round(100 * (this.total * (this.discountRate / 100))) / 100;

            console.log("Discount: " + this.formatMoneyOuput(this.discountAmount));

            this.total = Math.round(100 * (this.total - this.discountAmount)) / 100;
        }

        this.taxesDue = Math.round(100 * (this.purchasedItems.reduce((tax, item) => {
             return tax += (item.isTaxable) ? (item.price * (this.taxRate / 100)) : 0 ;
        }, 0))) / 100;

        console.log("Tax: " + this.formatMoneyOuput(this.taxesDue));

        this.total = Math.round(100 * (this.total + this.taxesDue)) / 100;

        console.log("Total: " + this.formatMoneyOuput(this.total));
    }

    customerPaid(amountPaid) {
        console.log("Amount Paid: " + this.formatMoneyOuput(amountPaid));
        console.log("Change Due: " + this.formatMoneyOuput(Math.round(100 * (amountPaid - this.total)) / 100));
    }

    formatMoneyOuput(moneyInput) {
        moneyInput += ".";
        let moneyParts = moneyInput.split(".");
        if(moneyParts[1].length === 0) {
            moneyParts[1] = "00";
        }
        else if(moneyParts[1].length === 1) {
            moneyParts[1] += "0";
        }
        return "$"+moneyParts[0]+"."+moneyParts[1];
    }
}
