from selenium import webdriver
from time import sleep
import sys

from selenium.webdriver.support.select import Select


def testLoadSite(self):
    try:
        #LOAD SITE
        self.driver.get("http://svm00165.ecs.soton.ac.uk")
        sleep(2)
        print("TEST PASSED - Loading Site")
    except:
        print("TEST FAILED - Loading Site")
        sleep(2)
        sys.exit()

def testLoggedOutNavBar(self):
    try:
        #TEST ALL BUTTONS ON LOGGED OUT NAVBAR
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Workbook\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Login\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"FAQ\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Frequently Asked Questions\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Contact Us\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Contact\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Register\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Register\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Login\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Login\"]")
        sleep(2)
        print("TEST PASSED - Logged Out Nav Bar")
    except:
        print("TEST FAILED - Logged Out Nav Bar")
        sleep(2)
        sys.exit()

def testRegisterPage(self):
    try:
        #TEST T&C AND DATA AGREEMENT LINKS ON REGISTER PAGE
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Register\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Register\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Terms and conditions\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Terms and conditions\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Register\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Register\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Data agreement\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Terms and conditions\"]")
        sleep(2)

        print("TEST PASSED - Register Page Links")
    except:
        print("TEST FAILED - Register Page Links")
        sleep(2)

def testRegisterErrors(self):
    try:
        #EMAIL ALREADY TAKEN
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Register\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Register\"]")
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"confirmPassword\"]").send_keys("Test123")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"termsAndConds\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"dataAgreement\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Register\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORDS DO NOT MATCH
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"confirmPassword\"]").send_keys("Test12")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"termsAndConds\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"dataAgreement\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Register\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORD HAS NO UPPERCASE
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("test123")
        self.driver.find_element_by_xpath("//input[@name=\"confirmPassword\"]").send_keys("test123")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"termsAndConds\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"dataAgreement\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Register\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        # PASSWORD HAS NO LOWERCASE
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("TEST123")
        self.driver.find_element_by_xpath("//input[@name=\"confirmPassword\"]").send_keys("TEST123")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"termsAndConds\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"dataAgreement\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Register\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORD HAS NO NUMBERS
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("TestTest")
        self.driver.find_element_by_xpath("//input[@name=\"confirmPassword\"]").send_keys("TestTest")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"termsAndConds\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"dataAgreement\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Register\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORD IS TOO SHORT
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Tt1")
        self.driver.find_element_by_xpath("//input[@name=\"confirmPassword\"]").send_keys("Tt1")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"termsAndConds\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//input[@name=\"dataAgreement\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Register\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        print("TEST PASSED - Registration Errors")
    except:
        print("TEST FAILED - Registration Errors")
        sleep(2)

def testForgotPasswordErrors(self):
    try:
        #TEST FORGOT PASSWORD LINK
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Login\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Login\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Forgot Password\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Forgotten Password\"]")
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//button[text()=\"Reset Password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")
        print("TEST PASSED - Forgotten Password Page")
    except:
        print("TEST FAILED - Forgotten Password Page")
        sleep(2)

def testLogin(self):
    try:
        # WRONG EMAIL
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Login\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Login\"]")
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Login\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        # WRONG PASSWORD
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("WrongTest123")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Login\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #CORRECT DETAILS
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"email\"]").send_keys("auto@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Login\"]"))
        sleep(2)
        self.driver.find_element_by_xpath("//h1[text()=\"Workbook!\"]")

        print("TEST PASSED - Login Page")
    except:
        print("TEST FAILED - Login Page")
        sleep(2)
        sys.exit()

def testLoggedInNavBar(self):
    try:
        #TEST ALL BUTTONS ON LOGGED IN NAVBAR
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Admin\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Admin Area\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Workbook\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Workbook!\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"FAQ\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Frequently Asked Questions\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Contact Us\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Contact\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Profile\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"My Profile\"]")
        sleep(2)
        print("TEST PASSED - Logged In Nav Bar")
    except:
        print("TEST FAILED - Logged In Nav Bar")
        sleep(2)
        sys.exit()

def testWorkbook(self):
    try:
        #TEST WORKBOOK BUTTONS
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Workbook\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Workbook!\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Access Workbook\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_class_name("nhsuk-pagination__title"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_class_name("nhsuk-pagination__title"))
        print("TEST PASSED - Workbook")
    except:
        print("TEST FAILED - Workbook")
        sleep(2)

def testAdmin(self):
    try:
        #NEW PAGE
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Admin\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Admin Area\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Editor\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"New Page\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Create\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_elements_by_class_name("rdw-option-wrapper")[8])
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Update Content\"]"))
        self.driver.execute_script("arguments[0].click();",self.driver.find_elements_by_class_name("nhsuk-checkboxes__input")[4])
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Update Diseases\"]"))

        #NEW WORKBOOK
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Editor\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"New Workbook\"]"))
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"workbook-title\"]").send_keys("Auto Test Workbook")
        Select(self.driver.find_element_by_id('disease-selector')).select_by_visible_text('Auto Tests Only Disease')
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Submit\"]"))

        #MODIFY WORKBOOK
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Editor\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_elements_by_class_name("nhsuk-button")[-2])
        sleep(2)
        self.driver.find_element_by_xpath("//input[@value=\"Auto Test Workbook\"]").send_keys(" 2")
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Update Title\"]"))
        self.driver.find_elements_by_class_name("page-actions")[-1].find_elements_by_xpath(".//*")[0].click()
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Save\"]"))
        sleep(2)

        #DELETE WORKBOOK
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Editor\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_elements_by_class_name("nhsuk-button")[-1])
        sleep(2)
        self.driver.switch_to_alert().accept()
        sleep(2)

        #DELETE PAGE
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Editor\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"All Pages\"]"))
        sleep(2)
        self.driver.find_elements_by_class_name("page-actions")[-1].find_elements_by_tag_name("svg")[-1].click()
        sleep(2)
        self.driver.switch_to_alert().accept()
        sleep(2)

        #ANALYTICS
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Admin\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"Admin Area\"]")
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Analytics\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Workbook 1\"]"))
        sleep(2)
        options = self.driver.find_element_by_class_name("MuiTabs-flexContainer")
        for element in options.find_elements_by_xpath(".//*"):
            self.driver.execute_script("arguments[0].click();",element)
            sleep(1)
        print("TEST PASSED - Admin Area")
    except:
        print("TEST FAILED - Admin Area")
        sleep(2)

def testProfile(self):
    try:
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Profile\"]"))
        self.driver.find_element_by_xpath("//h1[text()=\"My Profile\"]")
        sleep(2)

        #CHANGE EMAIL
        #WRONG PASSWORD
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Change\"]"))
        self.driver.find_element_by_xpath("//input[@name=\"current-password\"]").send_keys("a")
        self.driver.find_element_by_xpath("//input[@name=\"new-email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"confirmEmail\"]").send_keys("auto2@test.com")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change email\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #EMAILS DO NOT MATCH
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"current-password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"new-email\"]").send_keys("auto2@test.com")
        self.driver.find_element_by_xpath("//input[@name=\"confirmEmail\"]").send_keys("auto3@test.com")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change email\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #NOTIFICATION FREQUENCY BUTTON
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Profile\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[@href=\"/profile/change-notifications\"]"))
        sleep(2)
        self.driver.find_element_by_xpath("//h2[text()=\"Change notifications frequency\"]")

        #CHANGE PASSWORD
        #WRONG CURRENT PASSWORD
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Profile\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();", self.driver.find_element_by_xpath("//a[text()=\"Change password\"]"))
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("a")
        self.driver.find_element_by_xpath("//input[@name=\"new-password\"]").send_keys("Test1234")
        self.driver.find_element_by_xpath("//input[@name=\"confirm-password\"]").send_keys("Test1234")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORDS DON'T MATCH
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"new-password\"]").send_keys("Test1234")
        self.driver.find_element_by_xpath("//input[@name=\"confirm-password\"]").send_keys("Test12345")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORD TOO SHORT
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"new-password\"]").send_keys("Tt1")
        self.driver.find_element_by_xpath("//input[@name=\"confirm-password\"]").send_keys("Tt1")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #PASSWORD HAS NO UPPERCASE
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"new-password\"]").send_keys("test1234")
        self.driver.find_element_by_xpath("//input[@name=\"confirm-password\"]").send_keys("test1234")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        # PASSWORD HAS NO LOWERCASE
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"new-password\"]").send_keys("TEST1234")
        self.driver.find_element_by_xpath("//input[@name=\"confirm-password\"]").send_keys("TEST1234")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        # PASSWORD HAS NO NUMBERS
        self.driver.refresh()
        sleep(2)
        self.driver.find_element_by_xpath("//input[@name=\"password\"]").send_keys("Test123")
        self.driver.find_element_by_xpath("//input[@name=\"new-password\"]").send_keys("TestTest")
        self.driver.find_element_by_xpath("//input[@name=\"confirm-password\"]").send_keys("TestTest")
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//button[text()=\"Change password\"]"))
        sleep(2)
        self.driver.find_element_by_class_name("nhsuk-error-message")

        #DELETE ACCOUNT BUTTON
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Profile\"]"))
        sleep(2)
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Delete account\"]"))
        sleep(2)

        print("TEST PASSED - Profile Page")
    except:
        print("TEST FAILED - Profile Page")
        sleep(2)

def testLogout(self):
    try:
        self.driver.execute_script("arguments[0].click();",self.driver.find_element_by_xpath("//a[text()=\"Logout\"]"))
        sleep(2)
        self.driver.find_element_by_xpath("//h1[text()=\"Genetic Test Sharing\"]")
        print("TEST PASSED - Logout")
        sleep(2)
    except:
        print("TEST FAILED - Logout")
        sleep(2)

class Tester:
    def __init__(self):
        self.driver = webdriver.Chrome()
        testLoadSite(self)
        testLoggedOutNavBar(self)
        testRegisterPage(self)
        testRegisterErrors(self)
        testForgotPasswordErrors(self)
        testLogin(self)
        testLoggedInNavBar(self)
        testWorkbook(self)
        testAdmin(self)
        testProfile(self)
        testLogout(self)
Tester()