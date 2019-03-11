#import "ARMapComponentViewController.h"

@implementation ARMapComponentViewController

- (instancetype)init
{
    return [super initWithEmission:nil moduleName:@"Map" initialProperties:@{
        @"safeAreaInsets": @{
            @"top": @(0),
            @"left": @(0),
            @"bottom": @(0),
            @"right": @(0)
        }
    }];
}

- (UIStatusBarStyle)preferredStatusBarStyle
{
    return UIStatusBarStyleDefault;
}

- (BOOL)fullBleed
{
   return YES;
}

@end
