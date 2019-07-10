#import "ARComponentViewController.h"
#import "AREmission.h"

#import <React/RCTRootView.h>

@interface ARComponentViewController ()
@property (nonatomic, strong, readonly) AREmission *emission;
@property (nonatomic, strong, readonly) NSString *moduleName;
@property (nonatomic, strong) NSDictionary *initialProperties;
@property (nonatomic) BOOL safeAreaInsetsWereUpdated;
@end

@implementation ARComponentViewController

- (instancetype)initWithEmission:(AREmission *)emission
                      moduleName:(NSString *)moduleName
               initialProperties:(NSDictionary *)initialProperties;
{
  if ((self = [super initWithNibName:nil bundle:nil])) {
    _emission = emission ?: [AREmission sharedInstance];
    _moduleName = moduleName;

    NSMutableDictionary *properties = [NSMutableDictionary new];
    [properties addEntriesFromDictionary:initialProperties];
    [properties addEntriesFromDictionary:@{@"isVisible": @YES}];

    if (self.shouldInjectSafeAreaInsets) {
        // set default value for pre-iphone-X values
        [properties setValue:@{ @"top": @(self.fullBleed ? 20 : 0),
                                @"bottom": @(0),
                                @"left": @(0),
                                @"right": @(0) }
                      forKey:@"safeAreaInsets"];
    }

    _initialProperties = properties;
    _rootView = nil;
  }
  return self;
}

- (void)viewDidLoad;
{
  [super viewDidLoad];
  self.automaticallyAdjustsScrollViewInsets = NO;

  self.rootView = [[RCTRootView alloc] initWithBridge:self.emission.bridge
                                           moduleName:self.moduleName
                                    initialProperties:self.initialProperties];
  [self.view addSubview:self.rootView];
  self.rootView.reactViewController = self;

  // We use AutoLayout to ensure the RCTView covers the whole view
  self.rootView.translatesAutoresizingMaskIntoConstraints = NO;

  // Most of the time we want to respect the 'safe area' positioning provided by the
  // OS, but in the cases where we have full bleed headers whiich should go behind
  // the status bar, then the top layout constrain will need to work with the main
  // view instead of the traditional topLayoutGuide
  id topConstrainedItem = self.fullBleed ? (id)self.view : self.topLayoutGuide;
  NSLayoutAttribute topConstrainedAttribute = self.fullBleed ? NSLayoutAttributeTop : NSLayoutAttributeBottom;

  [self.view addConstraints:@[
    [NSLayoutConstraint constraintWithItem:self.rootView
                                 attribute:NSLayoutAttributeTop
                                 relatedBy:NSLayoutRelationEqual
                                    toItem:topConstrainedItem
                                 attribute:topConstrainedAttribute
                                multiplier:1
                                  constant:0],
    [NSLayoutConstraint constraintWithItem:self.rootView
                                 attribute:NSLayoutAttributeLeading
                                 relatedBy:NSLayoutRelationEqual
                                    toItem:self.view
                                 attribute:NSLayoutAttributeLeading
                                multiplier:1
                                  constant:0],
    [NSLayoutConstraint constraintWithItem:self.rootView
                                 attribute:NSLayoutAttributeTrailing
                                 relatedBy:NSLayoutRelationEqual
                                    toItem:self.view
                                 attribute:NSLayoutAttributeTrailing
                                multiplier:1
                                  constant:0],
    [NSLayoutConstraint constraintWithItem:self.rootView
                                 attribute:NSLayoutAttributeBottom
                                 relatedBy:NSLayoutRelationEqual
                                    toItem:self.bottomLayoutGuide
                                 attribute:NSLayoutAttributeTop
                                multiplier:1
                                  constant:0]
  ]];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    NSMutableDictionary *appProperties = [self.rootView.appProperties mutableCopy];
    appProperties[@"isVisible"] = @YES;
    self.rootView.appProperties = appProperties;
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    NSMutableDictionary *appProperties = [self.rootView.appProperties mutableCopy];
    appProperties[@"isVisible"] = @NO;
    self.rootView.appProperties = appProperties;
}

- (BOOL)shouldAutorotate;
{
  return UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations;
{
  return self.shouldAutorotate ? UIInterfaceOrientationMaskAll : UIInterfaceOrientationMaskPortrait;
}

- (UIStatusBarStyle)preferredStatusBarStyle
{
    return UIStatusBarStyleDefault;
}

- (void)setProperty:(id)value forKey:(NSString *)key
{
    if (self.isViewLoaded) {
        NSMutableDictionary *appProperties = [self.rootView.appProperties mutableCopy];
        appProperties[key] = value;
        self.rootView.appProperties = appProperties;
    } else {
        NSMutableDictionary *appProperties = [self.initialProperties mutableCopy];
        appProperties[key] = value;
        self.initialProperties = appProperties;
    }
}


-(void)viewSafeAreaInsetsDidChange
{
    [super viewSafeAreaInsetsDidChange];
    if (self.shouldInjectSafeAreaInsets && !self.safeAreaInsetsWereUpdated) {
        if (@available(iOS 11.0, *)) {
            [self setProperty:@{ @"top": @(self.view.safeAreaInsets.top),
                                 @"bottom": @(self.view.safeAreaInsets.bottom),
                                 @"left": @(self.view.safeAreaInsets.left),
                                 @"right": @(self.view.safeAreaInsets.right) }
                       forKey:@"safeAreaInsets"];
        }
        self.safeAreaInsetsWereUpdated = true;
    }
}

@end
