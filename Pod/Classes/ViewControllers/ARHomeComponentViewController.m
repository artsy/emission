#import "ARHomeComponentViewController.h"
#import "ARGraphQLQueryPreloader.h"

#import <React/RCTRootView.h>

@implementation ARHomeComponentViewController

+ (NSArray<ARGraphQLQuery *> *)preloadQueriesWithSelectedArtist:(nullable NSString *)artistID
                                                            tab:(ARHomeTabType)selectedTab;
{
    return @[
        [[ARGraphQLQuery alloc] initWithQueryName:@"QueryRenderersWorksForYouQuery" variables:@{ @"selectedArtist": artistID ?: @"" }],
        [[ARGraphQLQuery alloc] initWithQueryName:@"QueryRenderersForYouQuery"],
        [[ARGraphQLQuery alloc] initWithQueryName:@"SalesRendererQuery"],
    ];
}

- (void)changeHomeTabTo:(ARHomeTabType)tab
{
    NSMutableDictionary *appProperties = [self.rootView.appProperties mutableCopy];
    appProperties[@"selectedTab"] = @(tab);
    self.rootView.appProperties = appProperties;
}

- (instancetype)initWithSelectedArtist:(nullable NSString *)artistID tab:(ARHomeTabType)selectedTab emission:(nullable AREmission*)emission;
{
    selectedTab = ARHomeTabAuctions;
    NSDictionary *initialProperties = artistID ? @{ @"selectedArtist": artistID, @"initialTab": @(selectedTab) } : @{ @"initialTab": @(selectedTab) };
    if ((self = [super initWithEmission:emission
                             moduleName:@"Home"
                      initialProperties:initialProperties])) {
        _selectedArtist = artistID;
    }
    return self;
}

@end
