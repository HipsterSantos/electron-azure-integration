import { PkceCodes } from '@azure/msal-common';
import { CryptoProvider } from './../../src/index';
import { GuidGenerator } from './../../src/crypto/GuidGenerator';

describe('CryptoOps', () => {
    const cryptoOps = new CryptoProvider();

    // tests instantiating CryptoOps class
    test('CryptoOps() generates a valid instance', () => {
        expect(cryptoOps).toBeInstanceOf(CryptoProvider);
    });

    // tests createNewGuid() generates a GUID
    test('createNewGuid() generates a valid Guid', () => {
        const guid = cryptoOps.createNewGuid();
        expect(new GuidGenerator().isGuid(guid)).toBe(true);
    });

    // tests base64Encode() works as expected
    test('base64Encode() encodes correctly', () => {
        expect(cryptoOps.base64Encode('')).toBe('');
        expect(cryptoOps.base64Encode('f')).toBe('Zg==');
        expect(cryptoOps.base64Encode('fo')).toBe('Zm8=');
        expect(cryptoOps.base64Encode('foo')).toBe('Zm9v');
        expect(cryptoOps.base64Encode('foob')).toBe('Zm9vYg==');
        expect(cryptoOps.base64Encode('fooba')).toBe('Zm9vYmE=');
        expect(cryptoOps.base64Encode('foobar')).toBe('Zm9vYmFy');
    });

    // tests base64Decode() works as expected
    test('base64Decode() works as expected', () => {
        expect(cryptoOps.base64Decode('')).toBe('');
        expect(cryptoOps.base64Decode('Zg==')).toBe('f');
        expect(cryptoOps.base64Decode('Zm8=')).toBe('fo');
        expect(cryptoOps.base64Decode('Zm9v')).toBe('foo');
        expect(cryptoOps.base64Decode('Zm9vYg==')).toBe('foob');
        expect(cryptoOps.base64Decode('Zm9vYmE=')).toBe('fooba');
        expect(cryptoOps.base64Decode('Zm9vYmFy')).toBe('foobar');
    });

    // tests generatePkceCodes() generates PkceCodes as expected
    test('generatePkceCodes() generates PkceCodes', async () => {
        const pkceCodes: PkceCodes = await cryptoOps.generatePkceCodes();
        const pkceRegExp = new RegExp('[A-Za-z0-9-_+/]{43}');
        expect(pkceRegExp.test(pkceCodes.challenge)).toBe(true);
        expect(pkceRegExp.test(pkceCodes.verifier)).toBe(true);
    });

    describe("Localization tests", () => {
        it("Arabic", () => {
            const TEST_STRING = "????????????????12";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Chinese (Simplified)", () => {
            const TEST_STRING = "???????????????????????????????????????????????????A???E???I???O???U";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Chinese (Traditional)", () => {
            const TEST_STRING = "??????????????????????????????????????????????????????????????????????????????A???I???U???E???O?????????????????????????????????????????????????????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("German", () => {
            const TEST_STRING = "freisto?? f??r b??se";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Hebrew", () => {
            const TEST_STRING = "???? ?????????? ???? ???????? ?????????? ???????? ????????'?? ????,??.";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Hindi", () => {
            const TEST_STRING = "?????????????????? ?????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Japanese", () => {
            const TEST_STRING = "??????????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????? ????????????????????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Korean", () => {
            const TEST_STRING = "?????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Thai", () => {
            const TEST_STRING = "?????????????????????????????????????????????????????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Turkish", () => {
            const TEST_STRING = "??k??zler A????k i????????I????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Portugese", () => {
            const TEST_STRING = "????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Russian", () => {
            const TEST_STRING = "????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Italian", () => {
            const TEST_STRING = "????????????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("French", () => {
            const TEST_STRING = "????????????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Greek", () => {
            const TEST_STRING = "??????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Czech", () => {
            const TEST_STRING = "????????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Danish", () => {
            const TEST_STRING = "??????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });

        it("Finnish", () => {
            const TEST_STRING = "??????";
            expect(cryptoOps.base64Decode(cryptoOps.base64Encode(TEST_STRING))).toBe(TEST_STRING);
        });
    });
});
