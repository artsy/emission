#import <UIKit/UIKit.h>


@interface UIView (ARSpinner)

/// Keeps a view spinning for a _very_ long time.
- (void)ar_startSpinningIndefinitely;

/// Spin a view x times
- (void)ar_startSpinning:(NSInteger)times;

/// Stop a spin, with an optional finishing spin
- (void)ar_stopSpinningInstantly:(BOOL)instant;

@end
