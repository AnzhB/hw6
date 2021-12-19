// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');
const { Login } = require("../../src/PO/login.po");
const { CustomPage } = require("../../src/PO/custom_page.po");
const { CustomPage2 } = require("../../src/PO/custom_page_2.po");
const { Table } = require("../../src/PO/tables/table.po");
const Subscribe = require('../../src/PO/forms/subscribe.model');
const { LeftRailPO } = require('../../src/PO/leftRailPO');

When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
    await browser.maximizeWindow();
});

When(/^I check the texts of the elements:$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        expect(await $(row.selector).getText())
            .toEqual(row.text)
    }
});

When(/^I expect element: "([^"]*)" (text|value): "([^"]*)"$/, async function (selector, type, text) {
    const methods = {
        text: 'getText',
        value: 'getValue'
    }
    expect(await $(selector)[methods[type]]())
        .toEqual(text)
});

When('I go to {string} menu item', async function (item) {
    await $('a[href="./formSubscription.html"]').click();
});

When('I click Create User menu item', async function () {
    await LeftRailPO.clickCreateUser();
});

When('I click Create Subscription menu item', async function () {
    await LeftRailPO.createSubscriptionItem();
});

When('I click list of Subscriptions menu item', async function () {
    await LeftRailPO.listOfSubscriptions();
});

When('I click log out', async function () {
    await $('#dashboard > header > div > div > a:nth-child(2)').click();
});


When('I login as: {string}, {string}', async function (login, password) {
    await Login.login({ username: login, password: password });
});

async function invokeMethodOnPo(action, pretext, po, element, parameters) {
    if ('string' === (typeof parameters)) {
        if (parameters.includes('[')) {
            paramsArr = JSON.parse(parameters)
            await eval(po)[element][action](...paramsArr);
            return
        }
        await eval(po)[element][action](parameters);
    }
}

When(/^I (\w+) (on|at|in|into) (\w+) (\w+)(?:| with parameters:)$/, async function (action, pretext, po, element) {
    await invokeMethodOnPo(action, pretext, po, element)
});

When(/^I (\w+) (on|at|in|into) (\w+) (\w+) with parameters: '([^']*)'$/, async function (action, pretext, po, element, parameters) {
    await invokeMethodOnPo(action, pretext, po, element, parameters)
});


When(/^I search for "([^"]*)"$/, async function (text) {
    await CustomPage.search.setValue(text);
    await CustomPage2.header.search.setValue(text);
});

When(/^I sort table by "([^"]*)"$/, async function (name) {
    const data = await Table.data();
    const head = await (await Table.headers()).filter(item => item.name === name)[0].element.click();
    console.log({ head });
    console.log({ data })
    // console.log(JSON.stringify(data));
});

When(/^I fill user form:$/, async function (formYaml) {
    const formData = YAML.parse(formYaml);
   // console.log({ formData });
    const fieldsToFill = ["email", "password", "address1","address2", "city","zip", "description"];
        const fillFormUsingYaml = async function (obj, userForm) {
            for (const field in userForm) {
              await $(`#${userForm[field]}`).setValue(obj[`${userForm[field]}`]);
            }
          };
        //  await $("//a[contains(@href,'./formUser.html')]").click();
          await fillFormUsingYaml(formData, fieldsToFill);
          await $('#dashboard > div > div > div > form > button').click(); 
       //   await browser.pause(15000);
});

When(/^I fill  subscribtion form:$/, async function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log({ formData });
    console.log(Subscribe.model)
    for (const elModel of Subscribe.model) {
        const el = new elModel.type(elModel.selector);
        await el.set(formData[elModel.name]);
        await browser.pause(200);
    }
    await $('#dashboard > div > div > div > form > button').click();
    await browser.pause(5000);

});

Then (/^I expect to see the corresponding data for first user in List of Subscribtions table$/, async function () {
    expect(await $('#table > div.tabulator-tableholder > div > div > div:nth-child(1)').getText()).toEqual("EDU")
    expect(await $('#table > div.tabulator-tableholder > div > div > div:nth-child(2)').getText()).toEqual("test@test.com")
    expect(await $('#table > div.tabulator-tableholder > div > div > div:nth-child(3)').getText()).toEqual("10")
    expect(await $('#table > div.tabulator-tableholder > div > div > div:nth-child(4)').getText()).toEqual("NaN")
    expect(await $('#table > div.tabulator-tableholder > div > div > div:nth-child(6)').getText()).toEqual("description")

});

Then (/^I expect to see the corresponding data for the second user in List of Subscribtions table$/, async function () {
    expect(await $('#table > div.tabulator-tableholder > div > div.tabulator-row.tabulator-selectable.tabulator-row-even > div:nth-child(1)').getText()).toEqual("EDU")
    expect(await $('#table > div.tabulator-tableholder > div > div.tabulator-row.tabulator-selectable.tabulator-row-even > div:nth-child(2)').getText()).toEqual("test2@test.com")
    expect(await $('#table > div.tabulator-tableholder > div > div.tabulator-row.tabulator-selectable.tabulator-row-even > div:nth-child(3)').getText()).toEqual("10")
    expect(await $('#table > div.tabulator-tableholder > div > div.tabulator-row.tabulator-selectable.tabulator-row-even > div:nth-child(4)').getText()).toEqual("NaN")
    expect(await $('#table > div.tabulator-tableholder > div > div.tabulator-row.tabulator-selectable.tabulator-row-even > div:nth-child(6)').getText()).toEqual("description2")
    
});

Then (/^I expect to see the corresponding data for the third user in List of Subscribtions table$/, async function () {
    expect(await $('#table > div.tabulator-tableholder > div > div:nth-child(3) > div:nth-child(1)').getText()).toEqual("PREM")
    expect(await $('#table > div.tabulator-tableholder > div > div:nth-child(3) > div:nth-child(2)').getText()).toEqual("test3@test.com")
    expect(await $('#table > div.tabulator-tableholder > div > div:nth-child(3) > div:nth-child(3)').getText()).toEqual("5")
    expect(await $('#table > div.tabulator-tableholder > div > div:nth-child(3) > div:nth-child(4)').getText()).toEqual("NaN")
    expect(await $('#table > div.tabulator-tableholder > div > div:nth-child(3) > div:nth-child(6)').getText()).toEqual("description3")
    
});