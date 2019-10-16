#import "ARMyNewComponentViewController.h"

@interface ARMyNewComponentViewController ()
@end

@implementation ARMyNewComponentViewController

- (instancetype)init;
{
    return [super initWithEmission:nil
                        moduleName:@"MyNewComponent"
                 initialProperties:@{}];
}

- (BOOL)shouldInjectSafeAreaInsets
{
    return YES;
}

@end
