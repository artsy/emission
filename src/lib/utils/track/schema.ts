/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */

/**
 * The global tracking-info keys in Artsy’s schema.
 */
export interface Global {
  /**
   * The name of an event.
   *
   * Options are: Tap, Fail, Success
   *
   * This is unique to a "Track" event, meaning a "screen view" in Segment does not have this
   * This is how we distinguish the two type of events in Eigen
   * Track data inherits the screen view (called "context_screen") properties
   *
   */
  action_type: ActionTypes

  /**
   * The description of an event
   *
   * E.g. Conversation artwork attachment tapped
   */
  action_name: ActionNames

  /**
   * OPTIONAL: Additional properties of the action
   */
  additional_properties?: object
}

export interface Entity extends Global {
  /**
   * The ID of the entity in its database. E.g. the Mongo ID for entities that reside in Gravity.
   */
  owner_id: string

  /**
   * The public slug for this entity.
   */
  owner_slug: string

  /**
   * The type of entity, e.g. Artwork, Artist, etc.
   */
  owner_type: OwnerEntityTypes
}

export interface PageView {
  /**
   * The root container component should specify this as the screen context.
   */
  context_screen: PageNames

  /**
   * The public slug for the entity that owns this page (e.g. for the Artist page)
   */
  context_screen_owner_slug?: string

  /**
   * The ID of the entity in its database. E.g. the Mongo ID for entities that reside in Gravity.
   *
   * OPTIONAL: This may not always be available before the relay call for props has been made
   */
  context_screen_owner_id?: string

  /**
   * The type of entity (owner), E.g. Artist, Artwork, etc.
   */
  context_screen_owner_type: OwnerEntityTypes
}

export enum PageNames {
  ArtistPage = "Artist",
  BidFlowMaxBidPage = "YourMaxBid",
  BidFlowConfirmBidPage = "ConfirmYourBid",
  BidFlowBillingAddressPage = "YourBillingAddress",
  BidFlowRegistration = "Registration",
  BidFlowRegistrationResultConfirmed = "RegistrationConfirmed",
  BidFlowRegistrationResultPending = "RegistrationPending",
  BidFlowRegistrationResultError = "RegistrationError",
  ConversationPage = "Conversation",
  ConsignmentsWelcome = "ConsignmentsWelcome",
  ConsignmentsOverView = "ConsignmentsOverview",
  ConsignmentsSubmission = "ConsignmentsSubmit",
  GenePage = "Gene",
  FairPage = "Fair",
  ShowPage = "Show",
  InboxPage = "Inbox",
  InquiryPage = "Inquiry",
  HomeArtistsWorksForYou = "HomeArtistsWorksForYou",
  HomeForYou = "HomeForYou",
  HomeAuctions = "HomeAuctions",
  SavesAndFollows = "SavesAndFollows",
}

export enum OwnerEntityTypes {
  Artist = "Artist",
  Artwork = "Artwork",
  Conversation = "Conversation",
  Gene = "Gene",
  Fair = "Fair",
  Show = "Show",
  Invoice = "Invoice",
  Consignment = "ConsignmentSubmission",
}

export enum ActionTypes {
  /**
   * User actions
   */
  Tap = "tap",

  /**
   * Events / results
   */
  Fail = "fail",
  Success = "success",
}

/**
 * Action event discriptors / names
 */
export enum ActionNames {
  /**
   * Artist Page Events
   */
  ArtistAbout = "artistAbout",
  ArtistFollow = "artistFollow",
  ArtistUnfollow = "artistUnfollow",
  ArtistWorks = "artistWorks",
  ArtistShows = "artistShows",

  /**
   * Gene Page Events
   */
  GeneAbout = "geneAbout",
  GeneFollow = "geneFollow",
  GeneUnfollow = "geneUnfollow",
  GeneWorks = "geneWorks",
  Refine = "geneRefine",

  /**
   * Home page events
   */
  HomeArtistRailFollow = "homeArtistRailFollow",
  HomeArtistArtworksBlockFollow = "homeArtistArtworksBlockFollow",

  /**
   * Conversations / Inbox / Messaging Events
   */
  ConversationSelected = "conversationSelected",
  ConversationSendReply = "conversationSendReply",
  ConversationAttachmentShow = "conversationAttachmentShow",
  ConversationAttachmentArtwork = "conversationAttachmentArtwork",
  ConversationAttachmentInvoice = "conversationAttachmentInvoice",
  ConversationLink = "conversationLinkUsed",
  InquiryCancel = "inquiryCancel",
  InquirySend = "inquirySend",

  /**
   *  Saves And Follows Events
   */
  SavesAndFollowsWorks = "savesAndFollowsWorks",
  SavesAndFollowsArtists = "savesAndFollowsArtists",
  SavesAndFollowsCategories = "savesAndFollowsCategories",

  /**
   *  Consignment flow
   */
  ConsignmentDraftCreated = "consignmentDraftCreated",
  ConsignmentSubmitted = "consignmentSubmitted",

  /**
   * Bid flow
   */
  BidFlowAddBillingAddress = "addBillingAddress",
  BidFlowPlaceBid = "placeBid",
  BidFlowSaveBillingAddress = "saveBillingAddress",
}
