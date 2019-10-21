#import "ARMyNewComponentViewController.h"

@interface ARMyNewComponentViewController ()
@end

@implementation ARMyNewComponentViewController

- (instancetype)initWithArtistID:(NSString *)artistID;
{
    if ((self = [super initWithEmission:nil
                             moduleName:@"MyNewComponent"
                      initialProperties:@{ @"artistID": artistID }])) {
        _artistID = artistID;
    }
    return self;
}

- (BOOL)shouldInjectSafeAreaInsets
{
    return YES;
}

@end
