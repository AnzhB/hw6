class LeftRailPO {
    // components
    get leftMenu() {
        return $('#sidebarMenu');
    }

    get createUserItem() {
        return this.leftMenu.$('a[href="./formUser.html"]');
    }
  
    get createSubscriptionItem() {
        return this.leftMenu.$('a[href="./formSubscription.html"]');
    }

    get listOfSubscriptions() {
        return this.leftMenu.$('a[href="./Subscriptions.html"]');
    }


    // actions
    async clickCreateUser() {
        await this.createUserItem.click();  
    }
    async clickCreateSubscription() {
        await this.createSubscriptionItem.click();    
    }
    async clickListOfSubscriptions() {
        await this.listOfSubscriptions.click();  
    }

}

module.exports = { LeftRailPO: new LeftRailPO() }
