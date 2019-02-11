import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import expect from "expect"

import "lib/tests/renderUntil"
Enzyme.configure({ adapter: new Adapter() })

// Waiting on https://github.com/thymikee/snapshot-diff/pull/17
import diff from "snapshot-diff"
expect.extend({ toMatchDiffSnapshot: (diff as any).toMatchDiffSnapshot })

jest.mock("react-tracking")
// Mock this separately so react-tracking can be unmocked in tests but not result in the `window` global being accessed.
jest.mock("react-tracking/build/dispatchTrackingEvent")

jest.mock("./lib/NativeModules/NotificationsManager.tsx", () => ({
  NotificationsManager: {
    addListener: jest.fn(),
  },
}))

jest.mock("@mapbox/react-native-mapbox-gl", () => ({
  MapView: () => null,
  StyleURL: {
    Light: null,
  },
  setAccessToken: () => jest.fn(),
  StyleSheet: {
    create: () => jest.fn(),
  },
  ShapeSource: () => null,
  SymbolLayer: () => null,
}))

function mockedModule(path: string, mockModuleName: string) {
  jest.mock(path, () => mockModuleName)
}

const originalConsoleError = console.error

// TODO: Remove once we're no longer using JSDOM for enzyme static rendering.
console.error = (message?: any) => {
  if (
    typeof message === "string" &&
    (message.includes("is using uppercase HTML. Always use lowercase HTML tags in React.") ||
      /Warning: React does not recognize the `\w+` prop on a DOM element\./.test(message) ||
      /Warning: The tag <\w+> is unrecognized in this browser\./.test(message) ||
      /Warning: Unknown event handler property `\w+`\./.test(message) ||
      /Warning: Received `\w+` for a non-boolean attribute `\w+`\./.test(message))
  ) {
    // NOOP
  } else {
    originalConsoleError(message)
  }
}

mockedModule("./lib/Components/SwitchView.tsx", "SwitchView")
mockedModule("./lib/Components/Spinner.tsx", "ARSpinner")
mockedModule("./lib/Components/OpaqueImageView.tsx", "AROpaqueImageView")
mockedModule("./lib/Components/ArtworkGrids/InfiniteScrollGrid.tsx", "ArtworksGrid")

// Artist tests
mockedModule("./lib/Components/Artist/Shows/index.tsx", "PartnerShows")
mockedModule("./lib/Components/Artist/Artworks/index.tsx", "Artworks")
mockedModule("./lib/Components/Artist/Header.tsx", "Header")
mockedModule("./lib/Components/Artist/About.tsx", "About")

// Gene tests
mockedModule("./lib/Components/Gene/Header.tsx", "Header")

// Native modules
import { NativeModules } from "react-native"
NativeModules.ARTakeCameraPhotoModule = {
  errorCodes: {
    cameraNotAvailable: "cameraNotAvailable",
    imageMediaNotAvailable: "imageMediaNotAvailable",
    cameraAccessDenied: "cameraAccessDenied",
    saveFailed: "saveFailed",
  },
}
NativeModules.ARCocoaConstantsModule = {
  UIApplicationOpenSettingsURLString: "UIApplicationOpenSettingsURLString",
}
NativeModules.ARSwitchBoardModule = {
  presentNavigationViewController: jest.fn(),
  presentModalViewController: jest.fn(),
  presentMediaPreviewController: jest.fn(),
  presentArtworksSet: jest.fn(),
}
