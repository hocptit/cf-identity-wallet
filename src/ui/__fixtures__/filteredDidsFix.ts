import {
  IdentifierShortDetails,
  IdentifierType,
} from "../../core/agent/agent.types";

const filteredDidsFix: IdentifierShortDetails[] = [
  {
    id: "did:key:z6MkpNyGdYK5Ey1pCf5cy1S9gbLD1857nQoZxVeeGifA1ZQv",
    method: IdentifierType.KEY,
    displayName: "Anonymous ID",
    createdAtUTC: "2023-01-01T19:23:24Z",
    colors: ["#92FFC0", "#47FF94"],
  },
  {
    id: "did:key:z6MkpNyGdYK5Ey1pCf5cyQoZxVeeGifA1ZQv1S9gbLD1857n",
    method: IdentifierType.KEY,
    displayName: "Public ID",
    createdAtUTC: "2023-01-01T19:23:24Z",
    colors: ["#FFBC60", "#FFA21F"],
  },
  {
    id: "did:key:z6MkpNycy1S9gpCf5857nQoZxVbLD1GdYK5Ey1eeGifA1ZQv",
    method: IdentifierType.KEY,
    displayName: "Offline ID",
    createdAtUTC: "2023-01-01T19:23:24Z",
    colors: ["#D9EDDF", "#ACD8B9"],
  },
  {
    id: "did:key:z6MkpNyGd9gbLD1857nQoZYK5Ey1pCf5cy1SxVeeGifA1ZQv",
    method: IdentifierType.KERI,
    displayName: "Professional ID",
    createdAtUTC: "2023-01-01T19:23:24Z",
    colors: ["#47E0FF", "#00C6EF"],
  },
  {
    id: "did:key:z6MkpNycy1S9gpCf5857nQoZxVbLD1GdYK5Ey1eeGifA1ZQvb",
    method: IdentifierType.KERI,
    displayName: "Offline ID",
    createdAtUTC: "2023-01-01T19:23:24Z",
    colors: ["#FF9780", "#FF5833"],
  },
];

export { filteredDidsFix };
