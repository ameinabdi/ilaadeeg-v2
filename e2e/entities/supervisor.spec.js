const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('Supervisor Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToSupervisorScreen();
  });

  const navigateToSupervisorScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('supervisorEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('supervisorEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('supervisorScreen');
  };

  it('should allow you to create, update, and delete the Supervisor entity', async () => {
    await expect(element(by.id('supervisorScreen'))).toBeVisible();

    /*
     * Create Supervisor
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('supervisorEditScrollView');
    // name
    await scrollTo('nameInput', 'supervisorEditScrollView');
    await element(by.id('nameInput')).replaceText('Fresh iterate');
    await element(by.id('nameInput')).tapReturnKey();
    // gender
    await scrollTo('genderInput', 'supervisorEditScrollView');
    await element(by.id('genderInput')).replaceText('lime virtual');
    await element(by.id('genderInput')).tapReturnKey();
    // telephone
    await scrollTo('telephoneInput', 'supervisorEditScrollView');
    await element(by.id('telephoneInput')).replaceText('1-464-661-5470 x89024');
    await element(by.id('telephoneInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'supervisorEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Supervisor - validate the creation
     */
    await waitForElementToBeVisibleById('supervisorDetailScrollView');
    // name
    await scrollTo('name', 'supervisorDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Fresh iterate');
    // gender
    await scrollTo('gender', 'supervisorDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('lime virtual');
    // telephone
    await scrollTo('telephone', 'supervisorDetailScrollView');
    await expect(element(by.id('telephone'))).toHaveLabel('1-464-661-5470 x89024');

    /*
     * Update Supervisor
     */
    await scrollTo('supervisorEditButton', 'supervisorDetailScrollView');
    await tapFirstElementByLabel('Supervisor Edit Button');
    await waitForElementToBeVisibleById('supervisorEditScrollView');
    // name
    await scrollTo('nameInput', 'supervisorEditScrollView');
    await element(by.id('nameInput')).replaceText('Fresh iterate');
    await element(by.id('nameInput')).tapReturnKey();
    // gender
    await scrollTo('genderInput', 'supervisorEditScrollView');
    await element(by.id('genderInput')).replaceText('lime virtual');
    await element(by.id('genderInput')).tapReturnKey();
    // telephone
    await scrollTo('telephoneInput', 'supervisorEditScrollView');
    await element(by.id('telephoneInput')).replaceText('1-464-661-5470 x89024');
    await element(by.id('telephoneInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'supervisorEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Supervisor - validate the update
     */
    await waitForElementToBeVisibleById('supervisorDetailScrollView');
    // name
    await scrollTo('name', 'supervisorDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Fresh iterate');
    // gender
    await scrollTo('gender', 'supervisorDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('lime virtual');
    // telephone
    await scrollTo('telephone', 'supervisorDetailScrollView');
    await expect(element(by.id('telephone'))).toHaveLabel('1-464-661-5470 x89024');

    /*
     * Delete
     */
    await scrollTo('supervisorDeleteButton', 'supervisorDetailScrollView');
    await waitThenTapButton('supervisorDeleteButton');
    await waitForElementToBeVisibleById('supervisorDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('supervisorScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
