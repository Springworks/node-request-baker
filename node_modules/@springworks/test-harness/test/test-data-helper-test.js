const test_data_helper = require('../test-data-helper');

describe('test/test-data-helper-test.js', () => {

  describe('uniqueObjectIdString', () => {

    it('should return a string', () => {
      test_data_helper.uniqueObjectIdString()
        .should.be.instanceOf(String);
    });

  });

  describe('uniquePrefixedString', () => {

    it('should return a string', () => {
      test_data_helper.uniquePrefixedString()
        .should.be.instanceOf(String);
    });

    it('should have the prefix at the start', () => {
      const prefix = 'test-';
      const uniquePrefixedString = test_data_helper.uniquePrefixedString(prefix);
      uniquePrefixedString.indexOf(prefix).should.be.equal(0);
    });

  });

  describe('uniqueEmail', () => {

    it('should return a string', () => {
      test_data_helper.uniqueEmail()
        .should.be.instanceOf(String);
    });

    it('should contain an @ somewhere', () => {
      test_data_helper.uniqueEmail().indexOf('@').should.not.equal(-1);
    });

    it('should not equal another unique email', () => {
      const email1 = test_data_helper.uniqueEmail();
      const email2 = test_data_helper.uniqueEmail();
      email1.should.not.equal(email2);
    });

  });

  describe('randomIMEI', () => {

    it('should return a string', () => {
      test_data_helper.randomIMEI().should.be.instanceOf(String);
    });

    it('it should have 15 characters', () => {
      const expected_IMEI_length = 15;
      test_data_helper.randomIMEI().length
        .should.be.equal(expected_IMEI_length);
    });

  });

  describe('randomIMSI', () => {

    it('should return a string', () => {
      test_data_helper.randomIMSI().should.be.instanceOf(String);
    });

    it('it should at least have 14 characters', () => {
      const min_IMSI_length = 14;
      test_data_helper.randomIMSI().length
        .should.be.greaterThan(min_IMSI_length);
    });

  });

  describe('uniqueShortId', () => {

    it('should return a string', () => {
      test_data_helper.randomShortId().should.be.instanceOf(String);
    });

    it('should have 6 characters', () => {
      const expected_length = 6;
      test_data_helper.randomShortId().length.should.equal(expected_length);
    });

  });

  describe('uniqueFleetId', () => {

    it('should return a string', () => {
      test_data_helper.uniqueFleetId().should.be.instanceOf(String);
    });

    it('should be unique for successive calls', () => {
      test_data_helper.uniqueFleetId()
        .should.not.equal(test_data_helper.uniqueFleetId());
    });

  });

  describe('uniqueUserId', () => {

    it('should return a string', () => {
      test_data_helper.uniqueUserId().should.be.instanceOf(String);
    });

    it('should be unique for successive calls', () => {
      test_data_helper.uniqueUserId()
        .should.not.equal(test_data_helper.uniqueUserId());
    });

  });

  describe('uniqueDeviceId', () => {

    it('should return a string', () => {
      test_data_helper.uniqueDeviceId().should.be.instanceOf(String);
    });

    it('should be unique for successive calls', () => {
      test_data_helper.uniqueDeviceId()
        .should.not.equal(test_data_helper.uniqueDeviceId());
    });

  });

  describe('randomVin', () => {

    it('should return a string', () => {
      test_data_helper.randomVin().should.be.instanceOf(String);
    });

    it('should be unique for successive calls', () => {
      test_data_helper.randomVin()
        .should.not.equal(test_data_helper.randomVin());
    });

  });

  describe('randomRegNumber', () => {

    it('should return a string', () => {
      test_data_helper.randomRegNumber()
        .should.be.instanceOf(String);
    });

    it('should be unique for successive calls', () => {
      test_data_helper.randomRegNumber()
        .should.not.equal(test_data_helper.randomRegNumber());
    });

  });

  describe('randomLetters', () => {

    it('should return a string', () => {
      const desired_length = 7;

      test_data_helper.randomLetters(desired_length).should.be.instanceOf(String);
    });

    it('should have the correct length', () => {
      const desired_length = 7;

      test_data_helper.randomLetters(desired_length).length
        .should.equal(desired_length);
    });

    it('should only contain lowercase letters', () => {
      const desired_length = 7;
      const random_letters = test_data_helper.randomLetters(desired_length);
      random_letters.search(/[^a-z]/).should.equal(-1);

    });

  });


  describe('randomNumbers', () => {

    it('should return a string', () => {
      const desired_length = 5;

      test_data_helper.randomNumbers(desired_length).should.be.instanceOf(String);
    });

    it('should have the correct length', () => {
      const desired_length = 3;

      test_data_helper.randomNumbers(desired_length).length
        .should.equal(desired_length);
    });

    it('should only contain lowercase letters', () => {
      const desired_length = 12;
      const random_letters = test_data_helper.randomNumbers(desired_length);
      random_letters.search(/[^0-9]/).should.equal(-1);

    });

  });

});
