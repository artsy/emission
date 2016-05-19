#import <UIKit/UIKit.h>

/// These are nicer shades of colours for debug work

@interface UIColor (DebugColours)

+ (UIColor *)debugColourRed;
+ (UIColor *)debugColourBlue;
+ (UIColor *)debugColourGreen;
+ (UIColor *)debugColourPurple;

/// Generates a random colour all that share the same saturation & lightness
+ (UIColor *)debugColourRandom;
@end
