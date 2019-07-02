#import <KSCrash/KSCrash.h>
#import <Foundation/Foundation.h>

#import "AppDelegate.h"
#import "ARDefaults.h"
#import "AppSetup.h"

#import "ARTopMenuViewController.h"
#import "EigenLikeNavigationController.h"
#import "ARRootViewController.h"
#import "UnroutedViewController.h"

#import <Emission/AREmission.h>
#import <Emission/ARTemporaryAPIModule.h>
#import <Emission/ARSwitchBoardModule.h>
#import <Emission/AREventsModule.h>
#import <Emission/ARRefineOptionsModule.h>
#import <Emission/ARWorksForYouModule.h>
#import <Emission/ARTakeCameraPhotoModule.h>

#import "ARStorybookComponentViewController.h"
#import <Emission/ARArtistComponentViewController.h>
#import <Emission/ARArtworkComponentViewController.h>
#import <Emission/ARArtworkAttributionClassFAQViewController.h>
#import <Emission/ARHomeComponentViewController.h>
#import <Emission/ARGeneComponentViewController.h>
#import <Emission/ARShowComponentViewController.h>
#import <Emission/ARShowArtworksComponentViewController.h>
#import <Emission/ARShowArtistsComponentViewController.h>
#import <Emission/ARShowMoreInfoComponentViewController.h>
#import <Emission/ARConversationComponentViewController.h>
#import <Emission/ARFairMoreInfoComponentViewController.h>
#import <Emission/ARCityFairListComponentViewController.h>
#import <Emission/ARCitySectionListComponentViewController.h>
#import <Emission/ARFairComponentViewController.h>
#import <Emission/ARFairBoothComponentViewController.h>
#import <Emission/ARFairArtworksComponentViewController.h>
#import <Emission/ARFairExhibitorsComponentViewController.h>
#import <Emission/ARFairBMWArtActivationComponentViewController.h>
#import <Emission/ARFairArtistsComponentViewController.h>
#import <Emission/ARCitySavedListComponentViewController.h>
#import <Emission/ARCityBMWListComponentViewController.h>
#import <Keys/EmissionKeys.h>

#import <React/RCTUtils.h>
#import <TargetConditionals.h>
#import "AuthenticationManager.h"
#import "LoadingSpinner.h"
#import "PRNetworkModel.h"
#import "CommitNetworkModel.h"

#import <Sentry/Sentry.h>

// If you have the ID of a user and an access token for them, you can impersonate them by hardcoding those here.
// Obviously you should *never* check these in!

static NSString *UserID = nil;
static NSString *UserAccessToken = nil;

static BOOL
randomBOOL(void)
{
  return rand() % 2 == 1;
}

@interface AppDelegate ()
@property (nonatomic, strong) EigenLikeNavigationController *navigationController;
@property (nonatomic, strong) LoadingSpinner *spinner;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
{
  // Sets all our default defaults
  [ARDefaults setup];

  AppSetup *setup = [AppSetup ambientSetup];
  NSString *service = setup.inStaging ? @"Emission-Staging" : @"Emission-Production";

  BOOL isImpersonating = UserID && UserAccessToken;
  AuthenticationManager *auth = isImpersonating ? nil : [[AuthenticationManager alloc] initWithService:service];
  self.spinner = [LoadingSpinner new];

  ARRootViewController *rootVC = [ARRootViewController new];
  rootVC.authenticationManager = auth;

  self.navigationController = [[EigenLikeNavigationController alloc] initWithRootViewController:rootVC];

  self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
  self.window.backgroundColor = [UIColor whiteColor];
  self.window.rootViewController = [[ARTopMenuViewController alloc] initWithNavigationController:self.navigationController];;
  [self.window makeKeyAndVisible];

  BOOL isAuthenticated = isImpersonating || auth.isAuthenticated;
  NSString *userID = isImpersonating ? UserID : auth.userID;
  NSString *accessToken = isImpersonating ? UserAccessToken : auth.token;

  if (isAuthenticated) {
    if (setup.usingPRBuild) {
      [self downloadPRBuildAndLoginWithUserID:userID accessToken:accessToken keychainService:service];
    } else if(!setup.usingRNP && setup.usingMaster) {
      [self downloadMasterAndLoginWithUserID:userID accessToken:accessToken keychainService:service];
    } else {
      [self setupEmissionWithUserID:userID accessToken:accessToken keychainService:service];
    }
  } else {
    [self.spinner presentSpinnerOnViewController:rootVC title:@"Logging in" subtitle:nil completion:^{
      [auth presentAuthenticationPromptOnViewController:rootVC.presentedViewController completion:^{
        NSLog(@"Logged in successfully :)");
        [self setupEmissionWithUserID:[auth userID] accessToken:[auth token] keychainService:service];
      }];
    }];
  }

  return YES;
}


#pragma mark - Emission

- (void)reloadEmission
{
  AppSetup *setup = [AppSetup ambientSetup];
  NSString *service = setup.inStaging ? @"Emission-Staging" : @"Emission-Production";

  BOOL isImpersonating = UserID && UserAccessToken;
  AuthenticationManager *auth = isImpersonating ? nil : [[AuthenticationManager alloc] initWithService:service];

  NSString *userID = isImpersonating ? UserID : auth.userID;
  NSString *accessToken = isImpersonating ? UserAccessToken : auth.token;
  [self setupEmissionWithUserID:userID accessToken:accessToken keychainService:service];
}

- (void)setupEmissionWithUserID:(NSString *)userID accessToken:(NSString *)accessToken keychainService:(NSString *)service;
{
  AREmission *emission = nil;

  AppSetup *setup = [AppSetup ambientSetup];

  EmissionKeys *keys = [[EmissionKeys alloc] init];

#if TARGET_IPHONE_SIMULATOR
  NSString *sentryDSN = nil;
#else
  // Only use sentry when on a phone
  NSString *sentryDSN = [keys sentryProductionDSN];
  [self setupSentry:sentryDSN userID:userID];
#endif

  AREmissionConfiguration *config = [[AREmissionConfiguration alloc] initWithUserID:userID
                                                                authenticationToken:accessToken
                                                                          sentryDSN:sentryDSN
                                                               stripePublishableKey:[keys stripePublishableKey]
                                                                   googleMapsAPIKey:nil
                                                                 mapBoxAPIClientKey:[keys mapBoxAPIClientKey]
                                                                         gravityURL:setup.gravityURL
                                                                     metaphysicsURL:setup.metaphysicsURL
                                                                      predictionURL:setup.predictionURL
                                                                          userAgent:@"Emission Example"
                                                                            options:setup.options];

  emission = [[AREmission alloc] initWithConfiguration:config packagerURL:setup.jsCodeLocation];
  [AREmission setSharedInstance:emission];
  [emission.bridge reload];

  ARRootViewController *controller = (id)self.navigationController.topViewController;
  [controller.tableView reloadData];

  emission.APIModule.artistFollowStatusProvider = ^(NSString *artistID, RCTResponseSenderBlock block) {
    NSNumber *following = @(randomBOOL());
    NSLog(@"Artist(%@).follow => %@", artistID, following);
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      block(@[[NSNull null], following]);
    });
  };
  emission.APIModule.artistFollowStatusAssigner = ^(NSString *artistID, BOOL following, RCTResponseSenderBlock block) {
    NSLog(@"Artist(%@).follow = %@", artistID, @(following));
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//      if (randomBOOL()) {
        block(@[[NSNull null], @(following)]);
//      } else {
//        NSLog(@"Simulated follow request ‘failed’.");
//        block(@[RCTJSErrorFromNSError([NSError errorWithDomain:@"Artsy" code:42 userInfo:nil]), @(!following)]);
//      }
    });
  };

  emission.APIModule.geneFollowStatusProvider = ^(NSString *geneID, RCTResponseSenderBlock block) {
    NSNumber *following = @(randomBOOL());
    NSLog(@"Gene(%@).follow => %@", geneID, following);
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      block(@[[NSNull null], following]);
    });
  };

  emission.APIModule.geneFollowStatusAssigner = ^(NSString *geneID, BOOL following, RCTResponseSenderBlock block) {
    NSLog(@"Gene(%@).follow = %@", geneID, @(following));
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      //      if (randomBOOL()) {
      block(@[[NSNull null], @(following)]);
      //      } else {
      //        NSLog(@"Simulated follow request ‘failed’.");
      //        block(@[RCTJSErrorFromNSError([NSError errorWithDomain:@"Artsy" code:42 userInfo:nil]), @(!following)]);
      //      }
    });
  };

  emission.APIModule.notificationReadStatusAssigner = ^(RCTResponseSenderBlock block) {
    NSLog(@"notificationReadStatusAssigner from APIModule called");
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      block(@[[NSNull null]]);
    });
  };

  emission.APIModule.augmentedRealityVIRPresenter = ^(NSString *imgUrl, CGFloat width, CGFloat height, NSString *artworkSlug, NSString *artworkId) {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"VR!" message:[NSString stringWithFormat:@"slug: %@, width: %f, height: %f", artworkSlug, width, height] preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *defaultAction = [UIAlertAction actionWithTitle:@"ok" style:UIAlertActionStyleDefault handler:nil];
    [alert addAction:defaultAction];
    id controller = self.navigationController;
    [controller presentViewController:alert animated:YES completion:nil];
  };

  emission.switchBoardModule.presentNavigationViewController = ^(UIViewController * _Nonnull fromViewController,
                                                                 NSString * _Nonnull route) {
    if ([fromViewController isKindOfClass:ARStorybookComponentViewController.class]) {
      NSLog(@"Route push - %@", route);
      return;
    }
    [fromViewController.navigationController pushViewController:[self viewControllerForRoute:route] animated:YES];
  };

  // Ignore the set attributes for now inside Emission, just load the artwork as a singleton
  emission.switchBoardModule.presentArtworkSet = ^(UIViewController * _Nonnull fromViewController, NSArray<NSString *> * _Nonnull artworkIDs, NSNumber * _Nonnull index) {
    NSString *artworkID = artworkIDs[index.integerValue];
    NSString *route = [NSString stringWithFormat:@"/artwork/%@", artworkID];
    [fromViewController.navigationController pushViewController:[self viewControllerForRoute:route] animated:YES];
  };

  emission.switchBoardModule.presentModalViewController = ^(UIViewController * _Nonnull fromViewController,
                                                            NSString * _Nonnull route) {
    if ([fromViewController isKindOfClass:ARStorybookComponentViewController.class]) {
      NSLog(@"Route modal - %@", route);
      return;
    }
    UIViewController *viewController = [self viewControllerForRoute:route];
    UINavigationController *navigationController = [[EigenLikeNavigationController alloc] initWithRootViewController:viewController];
    navigationController.navigationBarHidden = NO;
    viewController.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemDone
                                                                                                    target:self
                                                                                                    action:@selector(dismissModalViewController)];
    // If the source of this dismiss call is itself being dismissed, then present form our own navigation controller.
    // Otherwise, present from _its_ navigation controller.
    if (fromViewController.isBeingDismissed || fromViewController.navigationController.isBeingDismissed) {
      [self.navigationController presentViewController:navigationController animated:YES completion:nil];
    } else {
      [fromViewController.navigationController presentViewController:navigationController animated:YES completion:nil];
    }
  };

  emission.eventsModule.eventOccurred = ^(NSDictionary * _Nonnull info) {
    NSLog(@"[Event] - %@", info);
  };

  emission.refineModule.triggerRefine = ^(NSDictionary *_Nonnull initial, NSDictionary *_Nonnull current, UIViewController *_Nonnull controller, RCTPromiseResolveBlock resolve, RCTPromiseRejectBlock reject) {
    sleep(1);
    resolve(@{ @"sort": @"-year", @"medium": @"design", @"selectedPrice": @"0-50000" });
  };

  emission.worksForYouModule.setNotificationsCount = ^(NSInteger count) {
    sleep(1);
    NSLog(@"Set notifications count: %@", @(count));
  };
}

- (NSString *)valueForKey:(NSString *)key
           fromQueryItems:(NSArray *)queryItems
{
  NSPredicate *predicate = [NSPredicate predicateWithFormat:@"name=%@", key];
  NSURLQueryItem *queryItem = [[queryItems
                                filteredArrayUsingPredicate:predicate]
                               firstObject];
  return queryItem.value;
}

- (UIViewController *)viewControllerForRoute:(NSString *)route;
{
  UIViewController *viewController = nil;


  BOOL isShow = [route hasPrefix:@"/show/"] || [route hasPrefix:@"show/"];
  BOOL isCityBMWList = [route hasPrefix:@"/city-bmw-list"];
  BOOL isCityFairList = [route hasPrefix:@"/city-fair/"];
  BOOL isCitySavedList = [route hasPrefix:@"/city-save/"];
  BOOL isCityList = [route hasPrefix:@"/city/"];

  if ([route hasPrefix:@"/artist/"] && [route componentsSeparatedByString:@"/"].count == 3) {
    NSString *artistID = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARArtistComponentViewController alloc] initWithArtistID:artistID];

  } else if ([route hasPrefix:@"/artwork/"]) {
    NSString *artworkID = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARArtworkComponentViewController alloc] initWithArtworkID:artworkID];

  } else if ([route hasPrefix:@"/gene/"] || [route hasPrefix:@"gene/"]) {
    NSString *geneID = [[[[route componentsSeparatedByString:@"/"] lastObject] componentsSeparatedByString:@"?"] firstObject];
    NSURLComponents *components = [NSURLComponents componentsWithString:route];
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    for ( NSURLQueryItem *item in components.queryItems) {
      params[item.name] = item.value;
    }
    viewController = [[ARGeneComponentViewController alloc] initWithGeneID:geneID refineSettings:params];

  } else if ([route hasPrefix:@"/conversation/"] || [route hasPrefix:@"conversation/"]) {
    NSString *conversationID = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARConversationComponentViewController alloc] initWithConversationID:conversationID];

  } else if ([route isEqualToString:@"/"]) {
    viewController = [[ARHomeComponentViewController alloc] initWithSelectedArtist:nil tab:ARHomeTabArtists emission:nil];

  } else if ([route hasPrefix:@"/works-for-you/"] || [route hasPrefix:@"works-for-you"]) {
    NSURLComponents *components = [[NSURLComponents alloc] initWithString:route];
    NSString *artistID = [self valueForKey:@"artist_id" fromQueryItems:components.queryItems];
    viewController = [[ARHomeComponentViewController alloc] initWithSelectedArtist:artistID tab:ARHomeTabArtists emission:nil];

  } else if ([route hasSuffix:@"entity=gallery"]){
    return [[UnroutedViewController alloc] initWithRoute:route];

  } else if ([route hasSuffix:@"entity=fair"]) {
    NSString *fairID = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARFairComponentViewController alloc] initWithFairID:fairID];

  } else if ([route hasSuffix:@"entity=fair-booth"]) {
    NSString *fairBoothID = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARFairBoothComponentViewController alloc] initWithFairBoothID:fairBoothID];

  } else if ([route hasPrefix:@"/fair"] && [route hasSuffix:@"/artworks"]) {
    NSString *fairID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARFairArtworksComponentViewController alloc] initWithFairID:fairID];

  } else if ([route hasPrefix:@"/fair"] && [route hasSuffix:@"/artists"]) {
    NSString *fairID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARFairArtistsComponentViewController alloc] initWithFairID:fairID];

  } else if ([route hasPrefix:@"/fair"] && [route hasSuffix:@"/exhibitors"]) {
    NSString *fairID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARFairExhibitorsComponentViewController alloc] initWithFairID:fairID];

  } else if ([route hasPrefix:@"/fair"] && [route hasSuffix:@"/info"]) {
    NSString *fairID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARFairMoreInfoComponentViewController alloc] initWithFairID:fairID];

  } else if ([route hasPrefix:@"/fair"] && [route hasSuffix:@"/bmw-sponsored-content"]) {
    NSString *fairID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARFairBMWArtActivationComponentViewController alloc] initWithFairID:fairID];

  } else if ([route hasSuffix:@"entity=fair-booth"]) {
    NSString *fairBoothID = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARFairBoothComponentViewController alloc] initWithFairBoothID:fairBoothID];

  } else if (isShow && [route hasSuffix:@"/artworks"]) {
    NSString *showID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARShowArtworksComponentViewController alloc] initWithShowID:showID];

  } else if (isShow && [route hasSuffix:@"/artists"]) {
    NSString *showID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARShowArtistsComponentViewController alloc] initWithShowID:showID];

  } else if (isShow && [route hasSuffix:@"/info"]) {
    NSString *showID = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    viewController = [[ARShowMoreInfoComponentViewController alloc] initWithShowID:showID];

  } else if (isCityFairList) {
    NSString *citySlug = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARCityFairListComponentViewController alloc] initWithCitySlug:citySlug];

  } else if (isCitySavedList) {
    NSString *citySlug = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARCitySavedListComponentViewController alloc] initWithCitySlug:citySlug];

  } else if (isCityList) {
    NSString *citySlug = [[route componentsSeparatedByString:@"/"] objectAtIndex:2];
    NSString *section = [[route componentsSeparatedByString:@"/"] objectAtIndex:3];
    viewController = [[ARCitySectionListComponentViewController alloc] initWithCitySlug:citySlug section:section];

  } else if (isShow) {
    NSString *showID = [route componentsSeparatedByString:@"/"].lastObject;
    viewController = [[ARShowComponentViewController alloc] initWithShowID:showID];

  } else if (isCityBMWList) {
    NSString *citySlug = [[route componentsSeparatedByString:@"/"] lastObject];
    viewController = [[ARCityBMWListComponentViewController alloc] initWithCitySlug:citySlug];

  } else if ([route isEqualToString:@"/artwork-classifications"]) {
    viewController = [[ARArtworkAttributionClassFAQViewController alloc] init];
  } else {
    viewController = [[UnroutedViewController alloc] initWithRoute:route];
  }

  return viewController;
}

- (void)dismissModalViewController;
{
  UINavigationController *navigationController = (UINavigationController *)self.window.rootViewController;
  [navigationController dismissViewControllerAnimated:YES completion:nil];
}

- (void)downloadPRBuildAndLoginWithUserID:(NSString *)userID
                              accessToken:(NSString *)accessToken
                          keychainService:(NSString *)service
{
  PRNetworkModel *network = [PRNetworkModel new];
  NSUInteger prNumber = [[NSUserDefaults standardUserDefaults] integerForKey:ARPREmissionIDDefault];

  NSString *subtitle = [NSString stringWithFormat:@"PR: %@", @(prNumber)];
  [self.spinner presentSpinnerOnViewController:self.navigationController title:@"Downloading PR JS" subtitle:subtitle completion:^{
    [network downloadJavaScriptForPRNumber:prNumber completion:^(NSURL * _Nullable downloadedFileURL, NSError * _Nullable error) {
      [self.navigationController dismissViewControllerAnimated:YES completion:^{
        [self setupEmissionWithUserID:userID accessToken:accessToken keychainService:service];
      }];
    }];
  }];
}

- (void)downloadMasterAndLoginWithUserID:(NSString *)userID
                             accessToken:(NSString *)accessToken
                         keychainService:(NSString *)service
{
  CommitNetworkModel *network = [CommitNetworkModel new];
  [network downloadJavaScriptForMasterCommit:^(NSString * _Nullable title, NSString * _Nullable subtitle) {
    // We got metadata, show the spinner
    [self.spinner presentSpinnerOnViewController:self.navigationController title:title subtitle:subtitle completion:NULL];
  } completion:^(NSURL * _Nullable downloadedFileURL, NSError * _Nullable error) {
    // We got the JS
    if (downloadedFileURL) {
      [self.navigationController dismissViewControllerAnimated:YES completion:^{
        [self setupEmissionWithUserID:userID accessToken:accessToken keychainService:service];
      }];
    }
    NSLog(@"Error: %@", error);
  }];
}

- (void)setupSentry:(NSString *)sentryDSN userID:(NSString *)userID
{
  NSError *error = nil;
  SentryClient *client = [[SentryClient alloc] initWithDsn:sentryDSN didFailWithError:&error];
  NSAssert(error == nil, @"Unable to initialize a SentryClient SDK: %@", error);
  error = nil;
  [client startCrashHandlerWithError:&error];
  NSAssert(error == nil, @"Unable to start the Sentry crash handler: %@", error);
  [SentryClient setSharedClient:client];

  // Log you in
  SentryUser *user = [[SentryUser alloc] initWithUserId:userID];
  SentryClient.sharedClient.user = user;

}

@end

