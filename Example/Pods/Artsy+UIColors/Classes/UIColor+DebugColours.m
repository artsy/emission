#import "UIColor+DebugColours.h"

@implementation UIColor (DebugColours)

+ (UIColor *)debugColourRed
{
    return [UIColor colorWithRed:0.817 green:0.101 blue:0.267 alpha:1.000];
}

+ (UIColor *)debugColourBlue
{
    return [UIColor colorWithRed:0.083 green:0.253 blue:0.774 alpha:1.000];
}

+ (UIColor *)debugColourGreen
{
    return [UIColor colorWithRed:0.134 green:0.796 blue:0.319 alpha:1.000];
}

+ (UIColor *)debugColourPurple
{
    return [UIColor colorWithRed:0.410 green:0.000 blue:0.775 alpha:1.000];
}

+ (UIColor *)debugColourRandom
{
    uint32_t index = arc4random_uniform(360);
    return [UIColor colorWithHue:index/360.0 saturation:0.398 brightness:0.773 alpha:1.000];
}

@end
