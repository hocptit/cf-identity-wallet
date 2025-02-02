import {
  getNextGenerateSeedPhraseRoute,
  getNextOnboardingRoute,
  getNextSetPasscodeRoute,
  getNextRoute,
  updateStoreAfterSetPasscodeRoute,
  getNextVerifySeedPhraseRoute,
} from "./nextRoute";
import { RootState } from "../../store";
import { RoutePath } from "../index";
import { setAuthentication } from "../../store/reducers/stateCache";
import { FIFTEEN_WORDS_BIT_LENGTH } from "../../ui/globals/constants";
import { DataProps } from "./nextRoute.types";
import { OperationType } from "../../ui/globals/types";

describe("NextRoute", () => {
  let localStorageMock: any;
  let storeMock: RootState;
  let data = {};

  beforeEach(() => {
    localStorageMock = {};
    storeMock = {
      stateCache: {
        initialized: true,
        routes: [],
        authentication: {
          loggedIn: false,
          time: 0,
          passcodeIsSet: false,
          seedPhraseIsSet: false,
          passwordIsSet: false,
          passwordIsSkipped: true,
        },
        currentOperation: OperationType.IDLE,
        queueConnectionCredentialRequest: {
          isProcessing: false,
          queues: [],
          isPaused: false,
        },
      },
      seedPhraseCache: {
        seedPhrase160: "",
        seedPhrase256: "",
        selected: FIFTEEN_WORDS_BIT_LENGTH,
      },
      identifiersCache: { identifiers: [], favourites: [] },
      credsCache: { creds: [], favourites: [] },
      connectionsCache: {
        connections: [],
      },
    };
    data = {
      store: storeMock,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return correct route for /onboarding when passcodeIsSet is true and seedPhrase is not set", () => {
    localStorageMock.getItem = jest.fn().mockReturnValue(null);
    storeMock.stateCache.authentication.passcodeIsSet = true;

    const result = getNextOnboardingRoute(data as DataProps);

    expect(result).toEqual({
      pathname: RoutePath.CREATE_PASSWORD,
    });
  });

  test("should return correct route for /onboarding when passcodeIsSet is false and seedPhrase is set", () => {
    localStorageMock.getItem = jest.fn().mockReturnValue("someSeedPhrase");

    const result = getNextOnboardingRoute(data as DataProps);

    expect(result).toEqual({
      pathname: RoutePath.SET_PASSCODE,
    });
  });

  test("should return correct route for /setpasscode when seedPhrase is not set", () => {
    localStorageMock.getItem = jest.fn().mockReturnValue("someSeedPhrase");

    const result = getNextSetPasscodeRoute(storeMock);

    expect(result).toEqual({
      pathname: RoutePath.CREATE_PASSWORD,
    });
  });

  test("should update store correctly after /setpasscode route", () => {
    const expectedAuthentication = {
      ...storeMock.stateCache.authentication,
      loggedIn: true,
      time: expect.any(Number),
      passcodeIsSet: true,
    };

    const result = updateStoreAfterSetPasscodeRoute({ store: storeMock });

    expect(result).toEqual(setAuthentication(expectedAuthentication));
  });

  test("should return correct route for /generateseedphrase", () => {
    const result = getNextGenerateSeedPhraseRoute();

    expect(result).toEqual({
      pathname: RoutePath.VERIFY_SEED_PHRASE,
    });
  });

  test("should return correct route for /verifyseedphrase", () => {
    const result = getNextVerifySeedPhraseRoute();

    expect(result).toEqual({
      pathname: RoutePath.TABS_MENU,
    });
  });
});

describe("getNextRoute", () => {
  const storeMock: RootState = {
    stateCache: {
      initialized: true,
      routes: [],
      authentication: {
        loggedIn: false,
        time: 0,
        passcodeIsSet: true,
        seedPhraseIsSet: false,
        passwordIsSet: false,
        passwordIsSkipped: true,
      },
      currentOperation: OperationType.IDLE,
      queueConnectionCredentialRequest: {
        isProcessing: false,
        queues: [],
        isPaused: false,
      },
    },
    seedPhraseCache: {
      seedPhrase160: "",
      seedPhrase256: "",
      selected: FIFTEEN_WORDS_BIT_LENGTH,
    },
    identifiersCache: { identifiers: [], favourites: [] },
    credsCache: { creds: [], favourites: [] },
    connectionsCache: {
      connections: [],
    },
  };
  const state = {};
  const payload = {};

  test("should return the correct Onboarding next route", () => {
    let result = getNextRoute(RoutePath.ONBOARDING, {
      store: storeMock,
      state,
      payload,
    });

    expect(result.nextPath).toEqual({
      pathname: RoutePath.CREATE_PASSWORD,
    });

    storeMock.stateCache.authentication.passcodeIsSet = false;

    result = getNextRoute(RoutePath.ONBOARDING, {
      store: storeMock,
      state,
      payload,
    });

    expect(result.nextPath).toEqual({ pathname: RoutePath.SET_PASSCODE });
  });

  test("getNextSetPasscodeRoute should return the correct next path when seed phrase is set", () => {
    storeMock.seedPhraseCache = {
      seedPhrase160: "example seed phrase 160",
      seedPhrase256: "example seed phrase 256",
      selected: FIFTEEN_WORDS_BIT_LENGTH,
    };

    const result = getNextSetPasscodeRoute(storeMock);
    expect(result).toEqual({
      pathname: RoutePath.TABS_MENU,
    });
  });

  test("getNextSetPasscodeRoute should return the correct next path when seed phrase is not set", () => {
    storeMock.seedPhraseCache.seedPhrase160 = "";
    storeMock.seedPhraseCache.seedPhrase256 = "";

    const result = getNextSetPasscodeRoute(storeMock);
    expect(result).toEqual({
      pathname: RoutePath.CREATE_PASSWORD,
    });
  });
});
